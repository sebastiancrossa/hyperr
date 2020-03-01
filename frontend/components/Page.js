// Component imports
import Header from "../components/Header";
import Meta from "../components/Meta";

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
