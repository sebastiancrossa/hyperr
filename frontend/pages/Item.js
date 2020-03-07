// Component Imports
import SingleItem from "../components/SingleItem";

const Item = ({ query }) => {
  return (
    <div>
      <SingleItem itemId={query.id} />
    </div>
  );
};

export default Item;
