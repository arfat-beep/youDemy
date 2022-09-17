import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context";
const UserIndex = () => {
  // state
  const [hidden, setHidden] = useState(true);
  const {
    state: { user },
  } = useContext(Context);
  useEffect(() => {
    fetchUser();
  }, [user]);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/current-user");
      console.log(data);
      setHidden(false);
    } catch (err) {
      console.log("Error from User index useEffect fetchUser", err);
      setHidden(true);
    }
  };

  return (
    <>
      {!hidden && (
        <h1 className="jumbotron text-center">
          <pre>{JSON.stringify(user, null, 4)}</pre>
        </h1>
      )}
    </>
  );
};

export default UserIndex;
