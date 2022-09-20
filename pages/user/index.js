import { useContext } from "react";
import UserRoutes from "../../components/routes/UserRoutes";
import { Context } from "../../context";
const UserIndex = () => {
  // context api
  const {
    state: { user },
  } = useContext(Context);

  return (
    <>
      <UserRoutes>
        {user && (
          <h1 className="jumbotron text-center">
            {user.name.toUpperCase()}'S DASHBOARD
          </h1>
        )}
      </UserRoutes>
    </>
  );
};

export default UserIndex;
