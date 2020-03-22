// Libraries
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const stripe = require("../stripe");
const { randomBytes } = require("crypto");
const { promisify } = require("util"); // Lets us change callback-based functions into promise-based functions

const { transport, createEmail } = require("../mail");
const { hasPermission } = require("../utils");

const Mutations = {
  async createItem(parent, args, ctx, info) {
    // Checking if there is a user logged in
    if (!ctx.request.userId)
      throw new Error("You need to be logged in to add an item");

    const item = await ctx.db.mutation.createItem(
      {
        // Creating a relationship between the newly created item with the user
        data: {
          user: {
            connect: {
              id: ctx.request.userId
            }
          },
          ...args.data
        }
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

    // Sending the actual email to the user
    const mailRes = await transport.sendMail({
      from: "crossasebastian@gmail.com",
      to: user.email,
      subject: "Your Password Reset Token",
      html: createEmail(
        `<a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">Click here to reset your password</a>`
      )
    });

    return { message: "Reset token sent succesfully" };
  },
  async resetPassword(parent, args, ctx, info) {
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
  },
  async updatePermissions(parent, args, ctx, info) {
    if (!ctx.request.userId) throw new Error("You must be logged in");

    const currentUser = await ctx.db.query.user(
      {
        where: {
          id: ctx.request.userId
        }
      },
      info
    );

    // Check if the user has the correct permissions
    // Will throw an error if the user doesnt have the permissions
    hasPermission(currentUser, ["ADMIN", "PERMISSIONUPDATE"]);

    // Updating the permissions
    return ctx.db.mutation.updateUser(
      {
        where: {
          id: args.userId
        },
        data: {
          permissions: {
            set: args.permissions // using set since the permissions are enums
          }
        }
      },
      info
    );
  },
  async addToCart(parent, args, ctx, info) {
    const { userId } = ctx.request;
    const itemId = args.id;

    if (!userId)
      throw new Error("You must be logged in to add this item to your cart");

    // Query the current users cart with items
    /* 
      We are sure that there will only be 1 item in https://helpwithcovid.com/projects/13the returned array since there won't be an item
      that has the exact same id and the exact same user
    */
    const [existingCartItem] = await ctx.db.query.cartItems({
      where: {
        user: { id: userId },
        item: { id: itemId }
      }
    });

    console.log(existingCartItem);

    // Check if the item they are trying to add is already in their cart
    if (existingCartItem) {
      // Incrementing the item quantity by 1
      return ctx.db.mutation.updateCartItem(
        {
          where: { id: existingCartItem.id },
          data: { quantity: existingCartItem.quantity + 1 }
        },
        info
      );
    }

    // If it isn't, create a new cart item
    return await ctx.db.mutation.createCartItem(
      {
        data: {
          user: {
            connect: { id: userId }
          },
          item: {
            connect: { id: itemId }
          }
        }
      },
      info
    );
  },
  async removeFromCart(parent, args, ctx, info) {
    // Get the specific cart item the user wants to delete
    const cartItem = await ctx.db.query.cartItem(
      {
        where: {
          id: args.id
        }
      },
      `{id, user { id }}`
    );

    if (!cartItem)
      throw new Error(
        "No cart item found. The item you are trying to delete has probably been deleted"
      );

    // Check if the current signed in user owns the cart item
    if (ctx.request.userId !== cartItem.user.id)
      throw new Error("The item you are trying to delete is not yours");

    // Actually delete the item from the cart
    return await ctx.db.mutation.deleteCartItem(
      {
        where: { id: args.id }
      },
      info
    );
  },
  async createOrder(parent, { token }, ctx, info) {
    const { userId } = ctx.request;

    if (!userId) throw new Error("You need to be logged in");

    // Querying the current logged in user
    const user = await ctx.db.query.user(
      {
        where: {
          id: userId
        }
      },
      `{ id name email cart { id quantity item { title price id description image largeImage } } }`
    );

    // Recalculating the total price on the server side - this is to prevent any type ofclient manipulation on the client side
    const amount = user.cart.reduce(
      (tally, cartItem) => tally + cartItem.item.price * cartItem.quantity,
      0
    );

    console.log(`Charging for a total of ${amount}`);

    // Creating an actual stripe charge
    const charge = await stripe.charges.create({
      amount,
      currency: "USD",
      source: token
    });

    // CartItem -> OrderItem conversion
    const orderItems = user.cart.map(cartItem => {
      const orderItem = {
        ...cartItem.item, // Creating a copy of every cartItem field
        quantity: cartItem.quantity, // Adding a quantity and user, since all of the other fields are already presentend to us from the Cart Item
        user: {
          connect: {
            id: userId
          }
        }
      };

      delete orderItem.id; // Getting rid of the Cart Item id, since we don't want to have it on or Order Item
      return orderItem;
    });

    // Creating the order item with our array of Order Item
    const order = await ctx.db.mutation.createOrder({
      data: {
        total: charge.amount,
        charge: charge.id, // transaction id, just in case we need a reference to it in the future
        items: {
          create: orderItems
        },
        user: {
          connect: {
            id: userId
          }
        }
      }
    });

    // Clear the users cart and delete the CartItems from said user object
    const cartItemIds = user.cart.map(cartItem => cartItem.id); // Gives us an array of ids of all the items in a users cart

    await ctx.db.mutation.deleteManyCartItems({
      where: {
        id_in: cartItemIds
      }
    }); // native prisma mutation - lets us perform the deletion

    return order;
  }
};

module.exports = Mutations;
