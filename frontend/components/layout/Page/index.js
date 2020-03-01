// Component imports
import Header from "../../../components/layout/Header";
import Meta from "../../misc/Meta";

// Styles
import { Background, Container } from "./page.style";

const Page = ({ children }) => {
  return (
    <Background>
      <Meta />
      <Header />

      <Container>{children}</Container>
    </Background>
  );
};

export default Page;
