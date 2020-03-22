// Libraries
import { useState } from "react";
import Downshift, { resetIdCounter } from "downshift";
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

// Function that routes the user to the searched item
const routeToItem = item => {
  Router.push({
    pathname: "/item",
    query: {
      id: item.id
    }
  });
};

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

  // Gets rid of a weird error with the server side rendering wiith downshift
  resetIdCounter();

  return (
    <SearchStyles>
      <Downshift
        onChange={routeToItem}
        itemToString={item => (item !== null ? item.title : "")}
      >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue,
          highlightedIndex
        }) => (
          <div>
            <ApolloConsumer>
              {client => (
                <input
                  {...getInputProps({
                    type: "search",
                    placeholder: "Search for an item",
                    className: itemState.loading ? "loading" : "",
                    onChange: e => {
                      e.persist();

                      // Passing the event and apollo client to our external onChange function
                      onInputChange(e, client);
                    }
                  })}
                />
              )}
            </ApolloConsumer>

            {isOpen && (
              <DropDown>
                {itemState.items &&
                  itemState.items.map((item, index) => (
                    <DropDownItem
                      {...getItemProps({ item })}
                      key={item.id}
                      highlighted={index === highlightedIndex}
                    >
                      <img width="50" src={item.image} alt={item.title} />
                      {item.title}
                    </DropDownItem>
                  ))}

                {itemState.items &&
                  !itemState.items.length &&
                  !itemState.loading && (
                    <DropDownItem>Nothing found for {inputValue}</DropDownItem>
                  )}
              </DropDown>
            )}
          </div>
        )}
      </Downshift>
    </SearchStyles>
  );
};

export default Search;
