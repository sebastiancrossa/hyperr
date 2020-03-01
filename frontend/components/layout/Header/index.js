// Libraries
import Link from "next/link";
import Router from "next/router";
import NProgress from "nprogress";

// Component Imports
import Nav from "../Nav";

// Styles
import { Background, Logo } from "./header.style";

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();

  console.error("Routing error!");
};

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
