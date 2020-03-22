// Component Imports
import PleaseSignIn from "../components/PleaseSignIn";
import Order from "../components/Order";

const OrderPage = ({ query }) => {
  return (
    <div>
      <PleaseSignIn>
        <Order id={query.id} />
      </PleaseSignIn>
    </div>
  );
};

export default OrderPage;
