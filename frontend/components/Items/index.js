// Libraries
import React from "react";
import { useQuery } from "@apollo/react-hooks";

import gql from "graphql-tag";

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

const Items = () => {
  const { loading, data } = useQuery(ALL_ITEMS_QUERY);

  if (loading) {
    return <div>Loading items...</div>;
  } else {
    return (
      <div>
        <p>These are the item names:</p>

        {data.items.map(item => (
          <p key={item.id}>{item.title}</p>
        ))}
      </div>
    );
  }
};

export default Items;
