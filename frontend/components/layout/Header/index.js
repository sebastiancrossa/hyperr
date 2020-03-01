// Libraries
import Link from "next/link";

// Component Imports
import Nav from "../Nav";

// Styles
import { Background, Logo } from "./header.style";

export const Header = () => {
  return (
    <Background>
      <div className="bar">
        <Logo>
          <Link href="/">
            <a>Hyperr</a>
          </Link>
        </Logo>

        <Nav />
      </div>

      <div className="sub-bar">
        <p>Search</p>
      </div>

      <p>Cart</p>
    </Background>
  );
};

export default Header;
