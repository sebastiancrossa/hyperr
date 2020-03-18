// Libraries
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { CURRENT_USER_QUERY } from "../User";

// --- GRAPHQL --- //
const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATIO {
    signOut {
      message
    }
  }
`;
// --- --- //

const Signout = () => {
  const [signOut, { data, loading }] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [
      {
        query: CURRENT_USER_QUERY
      }
    ]
  });

  return <button onClick={() => signOut()}>Sign Out</button>;
};

export default Signout;
