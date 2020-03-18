// Libraries
import Link from "next/link";

// Styles
import NavStyles from "../../styles/NavStyles";

// Component Imports
import User from "../../User";
import SignoutButton from "../../Signout";

const Nav = () => {
  return (
    <User>
      {data => (
        <NavStyles>
          <Link href="/items">
            <a>Shop</a>
          </Link>

          {data ? (
            <>
              <Link href="/sell">
                <a>Sell</a>
              </Link>

              <Link href="/orders">
                <a>Orders</a>
              </Link>

              <Link href="/me">
                <a>{data.name}</a>
              </Link>

              <SignoutButton />
            </>
          ) : (
            <>
              <Link href="/signup">
                <a>Sign In</a>
              </Link>
            </>
          )}
        </NavStyles>
      )}
    </User>
  );
};

export default Nav;
