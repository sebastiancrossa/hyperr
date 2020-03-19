import styled from "styled-components";

const Table = styled.table`
  border-spacing: 0;
  width: 100%;
  border: 1px solid var(--color-white-off);
  thead {
    font-size: 10px;
  }
  td,
  th {
    border-bottom: 1px solid var(--color-white-off);
    border-right: 1px solid var(--color-white-off);
    position: relative;
    &:last-child {
      border-right: none;
      width: 150px;
      button {
        width: 100%;
      }
    }
    label {
      display: block;
      padding: 10px 5px;
    }
  }
  tr {
    &:hover {
      background: var(--color-white-off);
    }
  }
`;

export default Table;
