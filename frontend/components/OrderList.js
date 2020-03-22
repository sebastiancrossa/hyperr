// Libraries
import Link from "next/link";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import styled from "styled-components";
import formatMoney from "../lib/formatMoney";

// Component imports
import Error from "./ErrorMessage";

// Styles
import OrderItemStyles from "./styles/OrderItemStyles";

// --- GRAPHQL --- //
const USER_ORDERS_QUERY = gql`
  query {
    orders {
      id
      total
      items {
        id
        title
        price
        description
        quantity
        image
      }
    }
  }
`;
// --- --- //

const OrderList = () => {
  const { data, loading, error } = useQuery(USER_ORDERS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <Error error={error} />;

  const orders = data.orders;

  return (
    <div>
      <p>You have {orders.length} orders</p>

      <OrderUl>
        {orders.map(order => (
          <Link
            href={{
              pathname: "/order",
              query: {
                id: order.id
              }
            }}
          >
            <a>
              <OrderItemStyles key={order.id}>
                <div className="order-meta">
                  <p>
                    {order.items.reduce(
                      (tally, item) => tally + item.quantity,
                      0
                    )}{" "}
                    item in cart
                  </p>

                  <p>{order.items.length} products</p>
                  <p>{formatMoney(order.total)}</p>
                </div>
                <div className="images">
                  {order.items.map(item => (
                    <img key={item.id} src={item.image} alt={item.title} />
                  ))}
                </div>
              </OrderItemStyles>
            </a>
          </Link>
        ))}
      </OrderUl>
    </div>
  );
};

// TODO: Export to external file
const OrderUl = styled.ul`
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
`;

export default OrderList;
