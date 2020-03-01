// Component imports
import Header from "../../../components/layout/Header";
import Meta from "../../misc/Meta";

const Page = ({ children }) => {
  return (
    <div>
      <Meta />
      <Header />

      {children}
    </div>
  );
};

export default Page;
