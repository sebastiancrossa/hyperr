// Libraries
import Router from "next/router";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import User, { CURRENT_USER_QUERY } from "./User";

import StripeCheckout from "react-stripe-checkout";
import NProgress from "nprogress";
import calcTotalPrice from "../lib/calcTotalPrice";

// Component Imports
import Error from "./ErrorMessage";

const totalItems = cart => {
  return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);
};

const TakeMyMoney = ({ children }) => {
  const onToken = res => {
    console.log(res);
  };

  return (
    <User>
      {data => (
        <StripeCheckout
          image={data.cart[0].item && data.cart[0].item.image}
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
