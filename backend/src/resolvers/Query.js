const { forwardTo } = require("prisma-binding");

const Query = {
  // Use forwarding when the query is exactly the same as the prisma query (no custom logic, authentication, etc)
  items: forwardTo("db")
};

module.exports = Query;
