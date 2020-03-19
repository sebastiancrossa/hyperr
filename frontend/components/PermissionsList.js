// Libraries
import { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import PropTypes from "prop-types";

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

// TODO: Change code so these permissions arent hard coded and are actually retreived from the backend
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

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>

            {possiblePermissions.map(permission => (
              <th key={permission}>{permission}</th>
            ))}

            <th>👇</th>
          </tr>
        </thead>
        <tbody>
          {data.users.map(user => (
            <UserWithPermissions user={user} key={user.id} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

// TODO: Probably refactor this part by extracting the code and making a seperate file for it, not really sure if needed though
// Component that represets the specific table row of a passed user
const UserWithPermissions = ({ user }) => {
  const [userPermissions, setUserPermissions] = useState(user.permissions); // Using props to seed the initial state of the checboxes

  const handlePermissionChange = e => {
    const checkbox = e.target;

    // Creating a copy of the current permissions of the user from the table row
    let updatedPermissions = [...userPermissions];

    if (checkbox.checked) {
      updatedPermissions.push(checkbox.value);
    } else {
      updatedPermissions = updatedPermissions.filter(
        permission => permission !== checkbox.value
      );
    }

    setUserPermissions(updatedPermissions);
  };

  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>

      {possiblePermissions.map(permission => (
        <td key={permission}>
          <label htmlFor={`${user.id}-permission-${permission}`}>
            <input
              id={`${user.id}-permission-${permission}`}
              type="checkbox"
              checked={userPermissions.includes(permission)}
              value={permission}
              onChange={e => handlePermissionChange(e)}
            />
          </label>
        </td>
      ))}

      <td>
        <SickButton>Update</SickButton>
      </td>
    </tr>
  );
};

UserWithPermissions.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.string,
    permissions: PropTypes.array
  }).isRequired
};

export default PermissionsList;
