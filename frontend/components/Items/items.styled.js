import styled from "styled-components";

export const Background = styled.div`
  text-align: center;
`;

export const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;

  max-width: var(--config-width);
  margin: 0 auto;
`;
