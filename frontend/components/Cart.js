// Libraries
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

// Component Imports
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
    <CartStyles open={data.cartOpen}>
      <header>
        <CloseButton title="close" onClick={toggleCart}>
          &times;
        </CloseButton>
        <Supreme>Your Cart</Supreme>
        <p>You have ___ items in your cart</p>
      </header>

      <footer>
        <p>$10.10</p>
        <SickButton>Checkout</SickButton>
      </footer>
    </CartStyles>
  );
};

export default Cart;
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };
