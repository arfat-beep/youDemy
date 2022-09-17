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
        <h1 className="jumbotron text-center">
          <pre>{JSON.stringify(user, null, 4)}</pre>
        </h1>
      </UserRoutes>
    </>
  );
};

export default UserIndex;
