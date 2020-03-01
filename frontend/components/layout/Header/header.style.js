import styled from "styled-components";

export const Background = styled.div`
  .bar {
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;

    border-bottom: 10px solid black;

    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }

  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;

    border-bottom: 1px solid var(--color-gray-light);
  }
`;

export const Logo = styled.h1`
  position: relative;
  z-index: 2;

  transform: skew(-7deg);

  font-size: 4rem;
  margin-left: 2rem;

  a {
    padding: 0.6rem 1rem;

    text-transform: uppercase;
    text-decoration: none;

    color: white;
    background-color: red;
  }

  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`;
