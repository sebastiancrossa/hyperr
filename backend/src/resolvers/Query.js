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
  }
};

module.exports = Query;
