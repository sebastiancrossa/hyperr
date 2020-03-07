import styled from "styled-components";

export const Background = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;

  max-width: 1200px;
  min-height: 800px;
  margin: 2rem auto;

  box-shadow: var(--shadow);

  img {
    width: 100%;
    height: 100%;

    object-fit: contain;
  }

  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`;
