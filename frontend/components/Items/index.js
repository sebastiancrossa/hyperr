// Libraries
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { perPage } from "../../config";

// Component Imports
import Pagination from "../Pagination";

// Style
import { Background, ItemsList } from "./items.styled";
import Item from "./Item";

// -- QUERIES -- //
const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY ($skip: Int = 0, $first: Int = ${perPage}) {
    items(first: $first, skip: $skip, orderBy: createdAt_DESC) {
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
  const { loading, data } = useQuery(ALL_ITEMS_QUERY, {
    variables: {
      skip: page * perPage - perPage
    }
  });

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
