// Libraries
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import PropTypes from "prop-types";

// Component Imports
import Error from "./ErrorMessage";

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      name
      permissions
      cart {
        id
        quantity
        item {
          title
          price
          image
        }
      }
    }
  }
`;

const User = ({ children }) => {
  const { loading, data, error } = useQuery(CURRENT_USER_QUERY);

  if (loading) return null;
  if (error) <Error error={error} />;

  return <>{children(data.me)}</>;
};

User.propTypes = {
  children: PropTypes.func.isRequired
};

export default User;
export { CURRENT_USER_QUERY };
