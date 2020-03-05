// Libraries
const { Prisma } = require("prisma-binding");

// Connecting to our remote prisma DB so we query it through JS
const db = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  debug: false
});

module.exports = db;
