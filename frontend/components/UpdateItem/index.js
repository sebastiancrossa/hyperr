// Libraries
import { useState } from "react";
import Router from "next/router";

import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Form from "../styles/Form";
import formatMoney from "../../lib/formatMoney";

// Component Imports
import Error from "../ErrorMessage";

// --- GRAPHQL --- //
const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    updateItem(
      data: {
        title: $title
        description: $description
        price: $price
        image: $image
        largeImage: $largeImage
      }
    ) {
      id
      title
      description
      price
    }
  }
`;

const UpdateItem = props => {
  const [formState, setFormState] = useState({});

  // --- GRAPHQL --- //
  const [
    updateItem,
    { data: mutationData, loading: mutationLoading, error: mutationError }
  ] = useMutation(UPDATE_ITEM_MUTATION);

  const {
    data: queryData,
    loading: queryLoading,
    error: queryError
  } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id: props.id
    }
  });
  // --- --- //

  const handleChange = e => {
    const { name, type, value } = e.target;

    const val = type === "number" ? parseFloat(value) : value;

    setFormState({
      ...formState,
      [name]: val
    });
  };

  if (queryLoading) {
    return <div>Loading item...</div>;
  } else {
    return (
      <Form
        onSubmit={async e => {
          e.preventDefault();
        }}
      >
        {(mutationError || queryError) && (
          <Error error={mutationError || queryError} />
        )}
        <fieldset
          disabled={mutationLoading || queryLoading}
          aria-busy={mutationLoading || queryLoading}
        >
          <label htmlFor="title">
            Title
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Product title..."
              defaultValue={queryData.item.title}
              onChange={e => handleChange(e)}
              required
            />
          </label>

          <label htmlFor="description">
            Description
            <textarea
              id="description"
              name="description"
              placeholder="Product description..."
              defaultValue={queryData.item.description}
              onChange={e => handleChange(e)}
              required
            />
          </label>

          <label htmlFor="price">
            Price
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Product price..."
              defaultValue={queryData.item.price}
              onChange={e => handleChange(e)}
              required
            />
          </label>

          <button type="submit">Submit</button>
        </fieldset>
      </Form>
    );
  }
};

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };
export { SINGLE_ITEM_QUERY };
