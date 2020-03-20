// Libraries
import Link from "next/link";
import PropTypes from "prop-types";
import formatMoney from "../../../lib/formatMoney";

// Component Imports
import AddToCart from "../../AddToCart";
import Title from "../../styles/Title";
import ItemStyles from "../../styles/ItemStyles";
import PriceTag from "../../styles/PriceTag";
import DeleteItem from "./DeleteItem";
import User from "../../User";

const Item = ({ item }) => {
  return (
    <User>
      {data => (
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
            {data && (
              <>
                {(item.user.id === data.id ||
                  data.permissions.includes("ADMIN") ||
                  data.permissions.includes("ITEMUPDATE")) && (
                  <Link
                    href={{
                      pathname: "/update",
                      query: { id: item.id }
                    }}
                  >
                    <a>Edit ✏️</a>
                  </Link>
                )}

                <AddToCart id={item.id} />

                {(item.user.id === data.id ||
                  data.permissions.includes("ADMIN") ||
                  data.permissions.includes("ITEMDELETE")) && (
                  <DeleteItem toDelete={item.id}>Delete</DeleteItem>
                )}
              </>
            )}
          </div>
        </ItemStyles>
      )}
    </User>
  );
};

Item.propTypes = {
  item: PropTypes.object.isRequired
};

export default Item;
