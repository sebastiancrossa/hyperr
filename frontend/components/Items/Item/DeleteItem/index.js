// Libraries
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

// --- GRAPHQL --- //
const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;
// --- --- //

const DeleteItem = ({ toDelete, children }) => {
  const [deleteItem, { data, loading }] = useMutation(DELETE_ITEM_MUTATION);

  return (
    <button
      onClick={async () => {
        if (confirm("Are you sure you want to delete this item?")) {
          const res = await deleteItem({
            variables: {
              id: toDelete
            }
          });
        }
      }}
    >
      {children}
    </button>
  );
};

export default DeleteItem;
