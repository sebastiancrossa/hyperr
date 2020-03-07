// Libraries
import Head from "next/head";
import Link from "next/link";
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

      <Link
        prefetch
        href={{
          pathname: "items",
          query: { page: page - 1 }
        }}
      >
        <a className="prev" aria-disabled={page <= 1}>
          Prev
        </a>
      </Link>
      <p>
        {page} of {pages}
      </p>
      <p>{count} items total</p>
      <Link
        prefetch
        href={{
          pathname: "items",
          query: { page: page + 1 }
        }}
      >
        <a className="next" aria-disabled={page >= pages}>
          Next
        </a>
      </Link>
    </PaginationStyles>
  );
};

export default Pagination;
