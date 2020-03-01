// Libraries
import Link from "next/link";

// Styles
import NavStyles from "../../styles/NavStyles";

const Nav = () => {
  return (
    <NavStyles>
      <Link href="/shop">
        <a>Shop</a>
      </Link>

      <Link href="/sell">
        <a>Sell</a>
      </Link>
    </NavStyles>
  );
};

export default Nav;
