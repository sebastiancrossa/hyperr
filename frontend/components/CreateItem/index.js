// Libraries
import { useState } from "react";

import { useMutation } from "@apollo/react-hooks";
import gql from "react-apollo";
import Form from "../styles/Form";
import formatMoney from "../../lib/formatMoney";

const CreateItem = () => {
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    image: "",
    largeImage: "",
    price: 0
  });

  const handleChange = e => {
    const { name, type, value } = e.target;

    const val = type === "number" ? parseFloat(value) : value;

    setFormState({
      ...formState,
      [name]: val
    });
  };

  return (
    <Form>
      <fieldset>
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
