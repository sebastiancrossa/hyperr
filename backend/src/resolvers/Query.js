const { forwardTo } = require("prisma-binding");
const { hasPermission } = require("../utils");

const Query = {
  // Use forwarding when the query is exactly the same as the prisma query (no custom logic, authentication, etc)
  item: forwardTo("db"),
  items: forwardTo("db"),
  itemsConnection: forwardTo("db"),
  me(parent, args, ctx, info) {
    // Check if there is a user id in the request
    if (!ctx.request.userId) {
      return null;
    }

    return ctx.db.query.user(
      {
        where: {
          id: ctx.request.userId
        }
      },
      info
    );
  },
  async users(parent, args, ctx, info) {
    // Checking if there is a logged in user
    if (!ctx.request.userId) throw new Error("You must be logged in do that");

    // Checking if the user has permission to fetch all of the users
    hasPermission(ctx.request.user, ["ADMIN", "PERMISSIONUPDATE"]);

    // Return all of the users
    return await ctx.db.query.users({}, info);
  },
  async order(parent, args, ctx, info) {
    if (!ctx.request.userId)
      throw new Error("You must be logged in to do that");

    // Querying the order
    const order = await ctx.db.query.order(
      {
        where: {
          id: args.id
        }
      },
      info
    );

    // Check if the user has the necessary permissions to view the item
    const ownsOrder = order.user.id === ctx.request.userId;
    const hasPermissionToSeeOrder = ctx.request.user.permissions.includes(
      "ADMIN"
    );

    if (!ownsOrder && !hasPermissionToSeeOrder)
      throw new Error("You don't have access to the order");

    return order;
  },
  async orders(parent, args, ctx, info) {
    const { userId } = ctx.request;

    if (!userId) throw new Error("You must be logged in to do that");

    return await ctx.db.query.orders(
      {
        where: {
          user: {
            id: userId
          }
        }
      },
      info
    );
  }
};

module.exports = Query;
