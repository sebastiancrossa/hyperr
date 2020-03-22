// Libraries
import Head from "next/head";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import { format } from "date-fns";
import formatMoney from "../lib/formatMoney";

// Component Imports
import Error from "./ErrorMessage";

// Styles
import OrderStyles from "./styles/OrderStyles";

// --- GRAPHQL --- //
const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order(id: $id) {
      id
      charge
      total
      user {
        id
      }
      items {
        id
        title
        description
        price
        image
        quantity
      }
    }
  }
`;
// --- --- //

const Order = ({ id }) => {
  const { data, loading, error } = useQuery(SINGLE_ORDER_QUERY, {
    variables: {
      id
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <Error error={error} />;

  const order = data.order;

  return (
    <OrderStyles>
      <Head>
        <title>Hyperrr - Order {order.id}</title>
      </Head>

      <p>
        <span>Order ID:</span>
        <span>{order.id}</span>
      </p>

      <p>
        <span>Charge:</span>
        <span>{order.charge}</span>
      </p>

      <p>
        <span>Total:</span>
        <span>{formatMoney(order.total)}</span>
      </p>

      <p>
        <span>Number of items:</span>
        <span>{order.items.length}</span>
      </p>

      <div className="items">
        {order.items.map(item => (
          <div className="order-item" key={item.id}>
            <img src={item.image} alt={item.title} />

            <div className="item-details">
              <h2>{item.title}</h2>
              <p>Qty: {item.quantity}</p>
              <p>Each: {formatMoney(item.price)}</p>
              <p>Subtotal: {formatMoney(item.price * item.quantity)}</p>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </OrderStyles>
  );
};

Order.propTypes = {
  id: PropTypes.string.isRequired
};

export default Order;
