// Libraries
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import calcTotalPrice from "../lib/calcTotalPrice";
import formatMoney from "../lib/formatMoney";

// Component Imports
import User from "./User";
import CartItem from "./CartItem";
import TakeMyMoney from "./TakeMyMoney";

import CartStyles from "./styles/CartStyles";
import Supreme from "./styles/Supreme";
import CloseButton from "./styles/CloseButton";
import SickButton from "./styles/SickButton";

// --- GRAPHQL --- //
const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client
  }
`;

const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`;
// --- --- //

const Cart = () => {
  const { data, loading, error } = useQuery(LOCAL_STATE_QUERY);
  const [
    toggleCart,
    { data: mutationData, loading: mutationLoading }
  ] = useMutation(TOGGLE_CART_MUTATION);

  if (loading || mutationLoading) return null;

  return (
    <User>
      {userData =>
        userData && (
          <CartStyles open={data.cartOpen}>
            <header>
              <CloseButton title="close" onClick={toggleCart}>
                &times;
              </CloseButton>
              <Supreme>Your Cart</Supreme>
              <p>
                You have {userData.cart.length} item
                {userData.cart.length === 1 ? "" : "s"} in your cart
              </p>
            </header>

            <ul>
              {userData.cart.map(cartItem => (
                <CartItem id={cartItem.id} cartItem={cartItem} />
              ))}
            </ul>

            <footer>
              <p>{formatMoney(calcTotalPrice(userData.cart))}</p>

              {userData.cart.length && (
                <TakeMyMoney>
                  <SickButton>Checkout</SickButton>
                </TakeMyMoney>
              )}
            </footer>
          </CartStyles>
        )
      }
    </User>
  );
};

export default Cart;
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };
