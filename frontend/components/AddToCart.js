// Libraries
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { CURRENT_USER_QUERY } from "./User";

// --- GRAPHQL --- //
const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`;
// --- --- //

const AddToCart = ({ id }) => {
  const [addToCart, { data, loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: {
      id
    },
    refetchQueries: [
      {
        query: CURRENT_USER_QUERY
      }
    ]
  });

  return (
    <button onClick={() => addToCart()} disabled={loading} aria-busy={loading}>
      Add{loading ? "ing" : ""} to cart 🛒
    </button>
  );
};

export default AddToCart;
