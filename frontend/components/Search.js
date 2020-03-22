// Libraries
import { useState } from "react";
import Downshift from "downshift";
import Router from "next/router";
import { ApolloConsumer } from "@apollo/react-common";
import gql from "graphql-tag";
import debounce from "lodash.debounce";

// Styles
import { DropDown, DropDownItem, SearchStyles } from "./styles/DropDown";

// --- GRAPHQL --- //
const SEARCH_ITEMS_QUERY = gql`
  query SEARCH_ITEMS_QUERY($searchTerm: String!) {
    items(
      where: {
        OR: [
          { title_contains: $searchTerm }
          { description_contains: $searchTerm }
        ]
      }
    ) {
      id
      image
      title
    }
  }
`;
// --- --- //

const Search = () => {
  const [itemState, setItemState] = useState({
    items: [],
    loading: false
  });

  const onInputChange = debounce(async (e, client) => {
    setItemState({
      loading: true
    });

    // Making a query directly to the apollo client
    const res = await client.query({
      query: SEARCH_ITEMS_QUERY,
      variables: {
        searchTerm: e.target.value
      }
    });

    setItemState({
      items: res.data.items,
      loading: false
    });
  }, 350); // The search query will be called after 350ms, this is to avoid any unecesarry query calls after every keyup

  return (
    <SearchStyles>
      <div>
        <ApolloConsumer>
          {client => (
            <input
              type="search"
              onChange={e => {
                e.persist();

                // Passing the event and apollo client to our external onChange function
                onInputChange(e, client);
              }}
            />
          )}
        </ApolloConsumer>

        <DropDown>
          {itemState.items &&
            itemState.items.map(item => (
              <DropDownItem key={item.id}>
                <img width="50" src={item.image} alt={item.title} />
                {item.title}
              </DropDownItem>
            ))}
        </DropDown>
      </div>
    </SearchStyles>
  );
};

export default Search;
