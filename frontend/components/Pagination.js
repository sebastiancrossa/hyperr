// Libraries
import Head from "next/head";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { perPage } from "../config";

// Component Imports
import PaginationStyles from "./styles/PaginationStyles";

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = ({ page }) => {
  const { data, loading, error } = useQuery(PAGINATION_QUERY);

  if (loading) return <div>Loading...</div>;

  const count = data.itemsConnection.aggregate.count;
  const pages = Math.ceil(count / perPage);

  return (
    <PaginationStyles>
      <Head>
        <title>
          Hyperrr | Page {page} of {pages}
        </title>
      </Head>

      <p>
        {page} of {pages}
      </p>
    </PaginationStyles>
  );
};

export default Pagination;
