// Libraries
import { useState } from "react";
import Router from "next/router";

import { useMutation } from "@apollo/react-hooks";
import PropTypes from "prop-types";
import gql from "graphql-tag";

// Component Imports
import Form from "../styles/Form";
import Error from "../ErrorMessage";

import { CURRENT_USER_QUERY } from "../User";

// --- GraphQL --- //
const RESET_PASSWORD_MUTATION = gql`
  mutation RESET_PASSWORD_MUTATION($resetToken: String!, $password: String!) {
    resetPassword(resetToken: $resetToken, password: $password) {
      id
      name
      email
    }
  }
`;
// --- --- //

const RequestReset = ({ token }) => {
  const [resetPassword, { data, loading, error, called }] = useMutation(
    RESET_PASSWORD_MUTATION,
    {
      refetchQueries: [
        {
          query: CURRENT_USER_QUERY
        }
      ]
    }
  );

  const [formState, setFormState] = useState({
    password: "",
    confirmPassword: ""
  });

  const handleChange = e => {
    const { name, value } = e.target;

    setFormState({
      ...formState,
      [name]: value
    });
  };

  const notValid =
    formState.password !== formState.confirmPassword ||
    formState.password == "" ||
    formState.confirmPassword == "";

  return (
    <Form
      method="post"
      onSubmit={async e => {
        e.preventDefault();

        // Calling our sign in mutation
        const res = await resetPassword({
          variables: {
            resetToken: token,
            password: formState.password
          }
        });

        // Sending the user back to the home page
        Router.push({
          pathname: "/"
        });
      }}
    >
      {error && <Error error={error} />}
      <fieldset disabled={loading} aria-busy={loading}>
        <h1>Reset your password</h1>

        <label htmlFor="password">
          New password
          <input
            type="password"
            name="password"
            placeholder="New password..."
            value={formState.password}
            onChange={e => handleChange(e)}
          />
        </label>

        <label htmlFor="confirmPassword">
          Confirm password
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password..."
            value={formState.confirmPassword}
            onChange={e => handleChange(e)}
          />
        </label>

        <button type="submit" disabled={notValid}>
          Reset password
        </button>
      </fieldset>
    </Form>
  );
};

RequestReset.PropTypes = {
  resetToken: PropTypes.string.isRequired
};

export default RequestReset;
