// Libraries
import { useQuery } from "@apollo/react-hooks";
import { CURRENT_USER_QUERY } from "./User";
import SigninForm from "./Signin";

const PleaseSignIn = ({ children }) => {
  const { data, loading, error } = useQuery(CURRENT_USER_QUERY);

  if (loading) return <p>Loading...</p>;

  if (!data.me) {
    return (
      <div>
        <p>Please sign in to view this page</p>
        <SigninForm />
      </div>
    );
  }

  return children;
};

export default PleaseSignIn;
