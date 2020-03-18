// Libraries
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { randomBytes } = require("crypto");
const { promisify } = require("util"); // Lets us change callback-based functions into promise-based functions

const Mutations = {
  async createItem(parent, args, ctx, info) {
    // TODO Check if the user is logged in

    const item = await ctx.db.mutation.createItem(
      {
        data: args.data
      },
      info
    );

    return item;
  },
  updateItem(parent, args, ctx, info) {
    // Taking a copy of the updated info from the args
    const updatedArgs = { ...args };

    // Removing the id from the updated args
    delete updatedArgs.id;

    return ctx.db.mutation.updateItem(
      {
        data: updatedArgs,
        where: {
          id: args.id // Getting the id directly from the args, not our object itself
        }
      },
      info
    );
  },
  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id };

    // Getting the item from our db
    const item = await ctx.db.query.item({ where }, `{id title}`);

    // Check if the logged user owns the item / has permission to delete it
    // TODO add custom logic

    // Actually delete the item
    return ctx.db.mutation.deleteItem({ where }, info);
  },
  async signUp(parent, args, ctx, info) {
    // Transforming their passed email to lowercase
    args.email = args.email.toLowerCase();

    // Hashing the passed password with bcrypt (bcrypt is an async function)
    const password = await bcrypt.hash(args.password, 10);

    // Creating the user in our database
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password, // Overriding the password field with the hashed password
          permissions: { set: ["USER"] }
        }
      },
      info
    );

    // Creating the JWT token for the user
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    // Setting the newly generated JWT token as a cokie on the response
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // Creating a 1 year cookie
    });

    // Returing the user to the browser
    return user;
  },
  async signIn(parent, { email, password }, ctx, info) {
    // Checking if there is an existing user with the passed email
    const user = await ctx.db.query.user({
      where: {
        email
      }
    });
    // ---

    const isValid = await bcrypt.compare(password, user.password);

    // Checking if the password matches to the users password (or if the user entered does not exist)
    if (!user || !isValid) {
      throw new Error(`Incorrect password for ${email}`); // Will be caught by our query call and will be displayed to the user
    }
    // ---

    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });

    return user;
  },
  signOut(parent, args, ctx, info) {
    ctx.response.clearCookie("token"); // We are able to access this method because of our cookieParser library

    return { message: "User signout succesful" };
  },
  async requestReset(parent, { email }, ctx, info) {
    // Checking if a user with the passed email exists
    const user = await ctx.db.query.user({
      where: {
        email
      }
    });

    if (!user) {
      throw new Error(`Incorrect password for ${email}`);
    }

    // Creating a reset and expiry token for the user and actually saving them to ssaid user
    const resetToken = (await promisify(randomBytes)(20)).toString("hex");
    const resetTokenExpiry = Date.now() + 3600000;

    const res = await ctx.db.mutation.updateUser({
      where: { email },
      data: {
        resetToken,
        resetTokenExpiry
      }
    });

    console.log(res);

    return { message: "Reset token sent succesfully" };
  },
  async resetPassword(parent, args, ctx, info) {
    // TODO: Check if both passwords match on the frontend

    // Checking if the reset token exists and if it has not expired
    const [user] = await ctx.db.query.users({
      where: {
        resetToken: args.resetToken,
        resetTokenExpiry_gte: Date.now() - 3600000 // Checks if the token is still in the 1 hour timeline
      }
    });

    if (!user) {
      throw new Error(`Token is either invalid or expired`);
    }
    // ---

    const password = await bcrypt.hash(args.password, 10);

    const updatedUser = await ctx.db.mutation.updateUser({
      where: { id: user.id },
      data: {
        password,
        resetToken: null,
        resetTokenExpiry: null
      }
    });

    // Generating and setting the JWT
    const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);

    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });

    return updatedUser;
  }
};

module.exports = Mutations;
