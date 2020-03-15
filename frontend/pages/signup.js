// Component Imports
import SignupForm from "../components/Signup";
import styled from "styled-components";

const Signup = () => {
  return (
    <Columns>
      <SignupForm />
      <SignupForm />
      <SignupForm />
    </Columns>
  );
};

// --- TEMPORARY --- //
const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;
// --- --- //

export default Signup;
