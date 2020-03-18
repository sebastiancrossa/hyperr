// Libraries
import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

// Component Imports
import Form from "../styles/Form";
import Error from "../ErrorMessage";

// --- GraphQL --- //
const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;
// --- --- //

const RequestReset = () => {
  const [requestReset, { data, loading, error, called }] = useMutation(
    REQUEST_RESET_MUTATION
  );

  const [formState, setFormState] = useState({
    email: ""
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
        const res = await requestReset({
          variables: {
            ...formState
          }
        });
      }}
    >
      {error && <Error error={error} />}
      <fieldset disabled={loading} aria-busy={loading}>
        <h1>Reset your password</h1>

        {!error && !loading && called && (
          <p>Success! Check your email for a reset link</p>
        )}

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

        <button type="submit">Request reset</button>
      </fieldset>
    </Form>
  );
};

export default RequestReset;
