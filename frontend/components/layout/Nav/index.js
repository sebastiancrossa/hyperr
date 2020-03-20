// Libraries
import Link from "next/link";
import { useMutation } from "@apollo/react-hooks";
import { TOGGLE_CART_MUTATION } from "../../Cart";

// Styles
import NavStyles from "../../styles/NavStyles";

// Component Imports
import User from "../../User";
import SignoutButton from "../../Signout";

const Nav = () => {
  const [toggleCart, { data, loading }] = useMutation(TOGGLE_CART_MUTATION);

  if (loading) return null;

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

              <button onClick={toggleCart}>My Cart</button>
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
