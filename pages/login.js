import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import { Context } from "../context";
const login = () => {
  // useState hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // state
  const {
    state: { user },
    dispatch,
  } = useContext(Context);
  // const { user } = state;

  // router
  const router = useRouter();

  // useEffect redirect if there is user logged in
  useEffect(() => {
    if (user !== null) {
      router.push("/");
      toast.success("You are logged in");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/login`, {
        name,
        email,
        password,
      });
      // console.log("login response", data);
      dispatch({
        type: "LOGIN",
        payload: data,
      });

      // save login data to local storage
      window.localStorage.setItem("user", JSON.stringify(data));
      // after login redirect to home page using router from nextjs
      router.push("/user");

      setLoading(false);
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };
  return (
    <>
      <h1 className="jumbotron bg-primary text-center">Login</h1>
      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name=""
            className="form-control mb-4 p-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id=""
            required
            placeholder="Enter email"
          />
          <input
            type="password"
            name=""
            className="form-control mb-4 p-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id=""
            required
            placeholder="Enter password"
          />
          <div className="d-grid gap-2">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={!email || !password || loading}
            >
              {loading ? <SyncOutlined spin /> : "Login"}
            </button>
          </div>
        </form>
        <p className="text-center p-3">
          Not yet registered?{" "}
          <Link href={"/register"}>
            <a>Register</a>
          </Link>
        </p>
        <p className="text-center ">
          {" "}
          <Link href={"/forgot-password"}>
            <a className="text-danger">Forget password</a>
          </Link>
        </p>
      </div>
    </>
  );
};

export default login;
