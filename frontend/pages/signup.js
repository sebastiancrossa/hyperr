// Libraries
import styled from "styled-components";

// Component Imports
import SignupForm from "../components/Signup";
import SigninForm from "../components/Signin";
import RequestResetForm from "../components/RequestReset";

const Signup = () => {
  return (
    <Columns>
      <SignupForm />
      <SigninForm />
      <RequestResetForm />
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
