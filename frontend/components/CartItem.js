// Libraries
import styled from "styled-components";
import PropTypes from "prop-types";
import formatMoney from "../lib/formatMoney";

// Component Imports
import RemoveFromCart from "./RemoveFromCart";

const CartItem = ({ cartItem }) => {
  // Checking if the item exists (e.g. if an item gets deleted but a user has it on its cart)
  if (!cartItem.item) {
    return (
      <CartItemStyles>
        <p>Item removed</p>

        <RemoveFromCart id={cartItem.id} />
      </CartItemStyles>
    );
  }

  return (
    <CartItemStyles>
      <img src={cartItem.item.image} alt={cartItem.item.title} />
      <p>{cartItem.item.title}</p>
      <p>
        {formatMoney(cartItem.item.price * cartItem.quantity)} |{" "}
        {cartItem.quantity} &times; {formatMoney(cartItem.item.price)} each
      </p>

      <RemoveFromCart id={cartItem.id} />
    </CartItemStyles>
  );
};

CartItem.protoTypes = {
  cartItem: PropTypes.object.isRequired
};

// TODO: Export styles onto another file
const CartItemStyles = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 1rem;
  padding: 1rem;

  border-bottom: 1px solid var(--color-gray-light);

  img {
    width: 5rem;
    height: auto;
  }
`;

export default CartItem;
