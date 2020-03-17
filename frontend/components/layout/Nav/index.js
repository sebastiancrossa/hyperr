// Libraries
import Link from "next/link";

// Styles
import NavStyles from "../../styles/NavStyles";

// Component Imports
import User from "../../User";

const Nav = () => {
  return (
    <NavStyles>
      <User>
        {data => {
          if (data) {
            return <p>{data.name}</p>;
          } else {
            return null;
          }
        }}
      </User>

      <Link href="/items">
        <a>Shop</a>
      </Link>

      <Link href="/sell">
        <a>Sell</a>
      </Link>

      <Link href="/orders">
        <a>Orders</a>
      </Link>

      <Link href="/signup">
        <a>Signup</a>
      </Link>

      <Link href="/me">
        <a>Account</a>
      </Link>
    </NavStyles>
  );
};

export default Nav;
