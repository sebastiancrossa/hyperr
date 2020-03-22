// Libraries
import withApollo from "next-with-apollo";
import ApolloClient from "apollo-boost";
import { endpoint } from "../config";

import { LOCAL_STATE_QUERY } from "../components/Cart";

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === "development" ? endpoint : endpoint,

    // Every time a request is made, the headers are passed
    // Acts similar to an express middleware
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: "include"
        },
        headers
      });
    },
    // Local data
    clientState: {
      resolvers: {
        Mutation: {
          toggleCart(_, variables, { cache }) {
            // Read the current cart open value from the cache
            const { cartOpen } = cache.readQuery({
              query: LOCAL_STATE_QUERY
            });

            // Overriding the cart open variable to the opposite value
            const data = {
              data: { cartOpen: !cartOpen }
            };

            cache.writeData(data);
            return data;
          }
        }
      },
      defaults: {
        cartOpen: false
      }
    }
  });
}

export default withApollo(createClient);
