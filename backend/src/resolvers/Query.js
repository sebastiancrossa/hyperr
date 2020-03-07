const { forwardTo } = require("prisma-binding");

const Query = {
  // Use forwarding when the query is exactly the same as the prisma query (no custom logic, authentication, etc)
  item: forwardTo("db"),
  items: forwardTo("db"),
  itemsConnection: forwardTo("db")
};

module.exports = Query;
