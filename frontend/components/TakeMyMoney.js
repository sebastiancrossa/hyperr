// Libraries
import Router from "next/router";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import User, { CURRENT_USER_QUERY } from "./User";

import StripeCheckout from "react-stripe-checkout";
import NProgress from "nprogress";
import calcTotalPrice from "../lib/calcTotalPrice";

const totalItems = cart => {
  return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);
};

// --- GRAPHQL --- //
const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    createOrder(token: $token) {
      id
      charge
      total
      items {
        id
        title
      }
    }
  }
`;
// --- --- //

const TakeMyMoney = ({ children }) => {
  const [createOrder, { data, loading, error }] = useMutation(
    CREATE_ORDER_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }]
    }
  );

  const onToken = async res => {
    NProgress.start();

    const order = await createOrder({
      variables: {
        token: res.id
      }
    }).catch(err => {
      alert(err.message);
    });

    console.log(order);

    Router.push({
      pathname: "/order",
      query: {
        id: order.data.createOrder.id
      }
    });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <User>
      {data => (
        <StripeCheckout
          image={
            data.cart.length && data.cart[0].item && data.cart[0].item.image
          }
          amount={calcTotalPrice(data.cart) * 100}
          name="Hyperrr"
          description={`Order of ${totalItems(data.cart)} items`}
          stripeKey="pk_test_nuqymWOqAztz7717YCGttwnn00aMUxEF1w"
          currency="USD"
          email={data.email}
          token={res => onToken(res)}
        >
          {children}
        </StripeCheckout>
      )}
    </User>
  );
};

export default TakeMyMoney;
