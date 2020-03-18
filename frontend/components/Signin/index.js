// Libraries
import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

// Component Imports
import Form from "../styles/Form";
import Error from "../ErrorMessage";

import { CURRENT_USER_QUERY } from "../User";

// --- GraphQL --- //
const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
      email
    }
  }
`;
// --- --- //

const Signin = () => {
  const [signIn, { data, loading, error }] = useMutation(SIGNIN_MUTATION, {
    refetchQueries: [
      {
        query: CURRENT_USER_QUERY
      }
    ]
  });

  const [formState, setFormState] = useState({
    email: "",
    password: ""
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

        // Calling our sign in mutation
        const res = await signIn({
          variables: {
            ...formState
          }
        });
      }}
    >
      {error && <Error error={error} />}
      <fieldset disabled={loading} aria-busy={loading}>
        <h1>Sign In</h1>

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

        <button type="submit">Sign In</button>
      </fieldset>
    </Form>
  );
};

export default Signin;
