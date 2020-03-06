// Libraries
import Link from "next/link";
import PropTypes from "prop-types";
import formatMoney from "../../../lib/formatMoney";

// Component Imports
import Title from "../../styles/Title";
import ItemStyles from "../../styles/ItemStyles";
import PriceTag from "../../styles/PriceTag";
import DeleteItem from "./DeleteItem";

const Item = ({ item }) => {
  return (
    <ItemStyles>
      {item.image && <img src={item.image} alt={item.title} />}
      <Title>
        <Link
          href={{
            pathname: "/item",
            query: { id: item.id }
          }}
        >
          <a>{item.title}</a>
        </Link>
      </Title>
      <PriceTag>{formatMoney(item.price)}</PriceTag>
      <p>{item.description}</p>
      <div className="buttonList">
        <Link
          href={{
            pathname: "/update",
            query: { id: item.id }
          }}
        >
          <a>Edit ✏️</a>
        </Link>

        <button>Add to cart</button>
        <DeleteItem toDelete={item.id}>Delete</DeleteItem>
      </div>
    </ItemStyles>
  );
};

Item.propTypes = {
  item: PropTypes.object.isRequired
};

export default Item;
