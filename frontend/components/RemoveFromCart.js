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
