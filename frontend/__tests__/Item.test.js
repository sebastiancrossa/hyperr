import { shallow } from "enzyme";
import ItemComponent from "../components/Items/Item";

// Creating fake iitem to pass to our tests
const fakeItem = {
  id: "ABC123",
  title: "Sample item",
  description: "Sample description",
  price: 1200,
  image: "sample.jpg",
  largeImage: "sample-large.jpg"
};

describe("<Item /> ", () => {
  it("renders and displays properly", () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    const priceTag = wrapper.find("PriceTag");
    console.log(wrapper.debug());
  });
});
