// Component imports
import PleaseSignIn from "../components/PleaseSignIn";
import PermissionsList from "../components/PermissionsList";

const Permissions = () => {
  return (
    <div>
      <PleaseSignIn>
        <p>User List</p>
        <PermissionsList />
      </PleaseSignIn>
    </div>
  );
};

export default Permissions;
