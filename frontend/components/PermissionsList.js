// Libraries
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

// Component Imports
import Error from "./ErrorMessage";
import Table from "./styles/Table";
import SickButton from "./styles/SickButton";

// --- GRAPHQL --- //
const ALL_USERS_QUERY = gql`
  query {
    users {
      id
      name
      email
      permissions
    }
  }
`;
// --- --- //

// TODO: Change code so these permissions arent hard coded and actually retreived from the backend
const possiblePermissions = [
  "ADMIN",
  "USER",
  "ITEMCREATE",
  "ITEMUPDATE",
  "ITEMDELETE",
  "PERMISSIONUPDATE"
];

const PermissionsList = () => {
  const { data, loading, error } = useQuery(ALL_USERS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <Error error={error} />;

  console.log(data);

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>

            {possiblePermissions.map(permission => (
              <th>{permission}</th>
            ))}

            <th>👇</th>
          </tr>
        </thead>
        <tbody>
          {data.users.map(user => (
            <User user={user} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

// TODO: Probably refactor this part by extracting the code and making a seperate file for it, not really sure if needed though
const User = ({ user }) => {
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>

      {possiblePermissions.map(permission => (
        <td>
          <label htmlFor={`${user.id}-permission-${permission}`}>
            <input type="checkbox" />
          </label>
        </td>
      ))}

      <td>
        <SickButton>Update</SickButton>
      </td>
    </tr>
  );
};

export default PermissionsList;
