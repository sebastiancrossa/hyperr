// Component imports
import CreateItem from "../components/CreateItem";
import PleaseSignIn from "../components/PleaseSignIn";

const Sell = () => {
  return (
    <div>
      <PleaseSignIn>
        <CreateItem />
      </PleaseSignIn>
    </div>
  );
};

export default Sell;
