// Libraries
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

require("dotenv").config({ path: "variables.env" });
const createServer = require("./createServer");
const db = require("./db");

const server = createServer();

// Using express middleware to handle cookies (JWT)
server.express.use(cookieParser()); // Lets us inject any middleware to our express server

// Decoding the JWT so we can get the user id from each request
server.express.use((req, res, next) => {
  const { token } = req.cookies; // Extracting the token from our cookies

  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);

    // Adding the user id to the req for future requests to access
    req.userId = userId;
  }

  next();
});

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  deets => {
    console.log(`Server is now running on port http://localhost:${deets.port}`);
  }
);
