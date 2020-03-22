// Libraries
import PropTypes from "prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import styled from "styled-components";

const CartCount = ({ count }) => {
  return (
    <AnimationStyles>
      <TransitionGroup>
        <CSSTransition
          unmountOnExit
          className="count"
          classNames="count"
          key={count}
          timeout={{ enter: 400, exit: 400 }}
        >
          <Dot>{count}</Dot>
        </CSSTransition>
      </TransitionGroup>
    </AnimationStyles>
  );
};

CartCount.propTypes = {
  count: PropTypes.number.isRequired
};

// TODO: Refactor component styling onto another file
const AnimationStyles = styled.span`
  position: relative;

  .count {
    display: block;
    position: relative;
    transition: all 0.4s;
    backface-visibility: hidden;
  }

  // Initial state of the entered dot
  .count-enter {
    transform: scale(2) rotateX(0.5turn);
  }

  .count-enter-active {
    transform: rotateX(0);
  }

  .count-exit {
    position: absolute;
    top: 0;

    transform: rotateX(0);
  }

  .count-exit-active {
    transform: scale(2) rotateX(0.5turn);
  }
`;

const Dot = styled.div`
  background-color: red;
  color: white;

  font-weight: 100;
  font-feature-settings: "tnum";
  font-variant-numeric: tabular-nums;

  border-radius: 50%;

  padding: 0.5rem;
  margin-left: 1rem;
  line-height: 2rem;
  min-width: 3rem;
`;

export default CartCount;
