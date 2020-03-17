const { forwardTo } = require("prisma-binding");

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
  }
};

module.exports = Query;
