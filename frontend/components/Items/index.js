// Libraries
import React from "react";
import { useQuery } from "@apollo/react-hooks";

import gql from "graphql-tag";

// Component Imports
import Pagination from "../Pagination";

// Style
import { Background, ItemsList } from "./items.styled";
import Item from "./Item";

// -- QUERIES -- //
const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
      id
      title
      description
      price
      image
      largeImage
    }
  }
`;

const Items = ({ page }) => {
  const { loading, data } = useQuery(ALL_ITEMS_QUERY);

  if (loading) {
    return <div>Loading items...</div>;
  } else {
    return (
      <Background>
        <Pagination page={page} />
        <ItemsList>
          {data.items.map(item => (
            <Item key={item.id} item={item} />
          ))}
        </ItemsList>
        <Pagination page={page} />
      </Background>
    );
  }
};

export default Items;
export { ALL_ITEMS_QUERY };
