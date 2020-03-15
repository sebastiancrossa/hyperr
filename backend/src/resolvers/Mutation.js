const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
  }
};

module.exports = Mutations;
