// Libraries
import { useState } from "react";
import Router from "next/router";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Form from "../styles/Form";
import formatMoney from "../../lib/formatMoney";

// Component Imports
import Error from "../ErrorMessage";

// --- GRAPHQL --- //
const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
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

const CreateItem = () => {
  const [createItem, { data, loading, error }] = useMutation(
    CREATE_ITEM_MUTATION
  );

  const [formState, setFormState] = useState({
    title: "Sample ",
    description: "Sample item",
    image: "",
    largeImage: "",
    price: 100
  });

  const handleChange = e => {
    const { name, type, value } = e.target;

    const val = type === "number" ? parseFloat(value) : value;

    setFormState({
      ...formState,
      [name]: val
    });
  };

  const uploadFile = async e => {
    const files = e.target.files;

    // Getting the uploaded file
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "hyperrr");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/kisana/image/upload",
      {
        method: "POST",
        body: data
      }
    );

    // Parsing the response we get into JSON
    const file = await res.json();

    console.log(file);

    // Setting our new images to our local state
    setFormState({
      ...formState,
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    });
  };

  return (
    <Form
      onSubmit={async e => {
        e.preventDefault();

        // Calls the mutation and passes our form state as the variables
        const res = await createItem({
          variables: {
            ...formState
          }
        });

        // Sends the user to page of the newly created item
        Router.push({
          pathname: "/item",
          query: { id: res.data.createItem.id }
        });
      }}
    >
      {error && <Error error={error} />}
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="file">
          Image
          <input
            type="file"
            id="file"
            name="file"
            placeholder="Upload an image"
            onChange={e => uploadFile(e)}
            required
          />
          {formState.image && (
            <img width="200" src={formState.image} alt="Image preview" />
          )}
        </label>

        <label htmlFor="title">
          Title
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Product title..."
            value={formState.title}
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
            value={formState.description}
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
            value={formState.price}
            onChange={e => handleChange(e)}
            required
          />
        </label>

        <button type="submit">Submit</button>
      </fieldset>
    </Form>
  );
};

export default CreateItem;
export { CREATE_ITEM_MUTATION };
