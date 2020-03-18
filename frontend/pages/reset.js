// Component Imports
import ResetPasswordForm from "../components/Reset";

const ResetPassword = ({ query }) => {
  return (
    <div>
      <ResetPasswordForm token={query.resetToken} />
    </div>
  );
};

export default ResetPassword;
