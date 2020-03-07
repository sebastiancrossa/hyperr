// Libraries
import Head from "next/head";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

// Component Imports
import ErrorMessage from "../ErrorMessage";

// Styles
import { Background } from "./singleItem.style";

// --- GRAPHQL -- //
const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      largeImage
    }
  }
`;
// --- --- //

const SingleItem = ({ itemId }) => {
  const { loading, error, data } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id: itemId
    }
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <ErrorMessage error={error} />;
  if (!data.item) return <p>No item found for {itemId}</p>;

  console.log(data);

  return (
    <Background>
      <Head>
        <title>Hyperrr | {data.item.title}</title>
      </Head>
      <img src={data.item.largeImage} alt={data.item.title} />

      <div className="details">
        <h2>{data.item.title}</h2>
        <p>{data.item.description}</p>
      </div>
    </Background>
  );
};

export default SingleItem;
