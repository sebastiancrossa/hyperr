// Libraries
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import styled from "styled-components";
import PropTypes from "prop-types";

import { CURRENT_USER_QUERY } from "./User";

// --- GRAPHQL --- //
const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`;
// --- --- //

const RemoveFromCart = ({ id }) => {
  const [removeCartItem, { data, loading, error }] = useMutation(
    REMOVE_FROM_CART_MUTATION,
    {
      variables: {
        id
      },
      optimisticResponse: {
        __typename: "Mutation",
        removeFromCart: {
          __typename: "CartItem",
          id
        }
      },
      // Gets called as soon as we get a response back from the server after a mutation has been performed
      // cache - apollo cache, payload - dump of information we get back from the server
      update: (cache, payload) => {
        console.log("Running remove from cart update function");

        // Reading the cache
        const data = cache.readQuery({
          query: CURRENT_USER_QUERY
        });

        // Removing the item from the cart
        const cartItemId = payload.data.removeFromCart.id; // Getting the id of the item we are trying to delete
        const updatedData = data.me.cart.filter(
          cartItem => cartItem.id !== cartItemId
        );

        console.log(data);

        // Writing back to the cache with the updated cart
        cache.writeQuery({
          query: CURRENT_USER_QUERY,
          data: updatedData
        });
      }
    }
  );

  return (
    <DeleteButton
      title="Delete item"
      onClick={removeCartItem}
      disabled={loading}
    >
      &times;
    </DeleteButton>
  );
};

RemoveFromCart.propTypes = {
  id: PropTypes.string.isRequired
};

const DeleteButton = styled.button`
  font-size: 3rem;
  background: none;
  border: none;

  &:hover {
    color: red;
    cursor: pointer;
  }
`;

export default RemoveFromCart;
