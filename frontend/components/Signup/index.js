// Libraries
import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

// Component Imports
import Form from "../styles/Form";
import Error from "../ErrorMessage";

// --- GraphQL --- //
const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    signUp(name: $name, email: $email, password: $password) {
      id
      email
      name
    }
  }
`;
// --- --- //

const Signup = () => {
  const [signUp, { data, loading, error }] = useMutation(SIGNUP_MUTATION);

  const [formState, setFormState] = useState({
    name: "Sebastian Crossa",
    email: "crossasebastian@gmail.com",
    password: "1234565"
  });

  const handleChange = e => {
    const { name, value } = e.target;

    setFormState({
      ...formState,
      [name]: value
    });
  };

  return (
    <Form
      method="post"
      onSubmit={async e => {
        e.preventDefault();

        // Calling our signup mutation
        const res = await signUp({
          variables: {
            ...formState
          }
        });

        console.log(res);
      }}
    >
      {error && <Error error={error} />}
      <fieldset disabled={loading} aria-busy={loading}>
        <h1>Create an account</h1>

        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            placeholder="Name..."
            value={formState.name}
            onChange={e => handleChange(e)}
          />
        </label>

        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Email..."
            value={formState.email}
            onChange={e => handleChange(e)}
          />
        </label>

        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password..."
            value={formState.password}
            onChange={e => handleChange(e)}
          />
        </label>

        <button type="submit">Create account</button>
      </fieldset>
    </Form>
  );
};

export default Signup;
