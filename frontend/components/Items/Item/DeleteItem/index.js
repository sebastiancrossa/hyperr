// Libraries
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { ALL_ITEMS_QUERY } from "../../index";

// --- GRAPHQL --- //
const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;
// --- --- //

const DeleteItem = ({ toDelete, client, children }) => {
  const [deleteItem] = useMutation(DELETE_ITEM_MUTATION, {
    variables: {
      id: toDelete
    },
    update(cache, { data }) {
      // Manually update our cache on the client side so the website doesnt have to be reloaded
      // for the effect to be seen

      // Using our exported query to get the item we want
      // This returns all of the contents of  the cache (including the item we are wanting to delete)
      const cachedData = cache.readQuery({ query: ALL_ITEMS_QUERY });

      // Filtering the item the users deletes
      cachedData.items = cachedData.items.filter(
        item => item.id !== data.deleteItem.id
      );

      // Putting the items back to the cache
      cache.writeQuery({
        query: ALL_ITEMS_QUERY,
        data: {
          ...cachedData
        }
      });
    }
  });

  return (
    <button
      onClick={() => {
        if (confirm("Are you sure you want to delete this item?")) {
          deleteItem();
        }
      }}
    >
      {children}
    </button>
  );
};

export default DeleteItem;
