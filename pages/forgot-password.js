import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../context";
import { SyncOutlined } from "@ant-design/icons";

const ForgotPassword = () => {
  // state
  const [email, setEmail] = useState("arfatrahman08@gmail.com");
  const [success, setSuccess] = useState(false);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("arfaturRahman");
  const [loading, setLoading] = useState(false);

  //   router
  const router = useRouter();

  //   context
  const {
    state: { user },
  } = useContext(Context);

  //   redirect if user is logged in
  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  // a function to send email and receive temp pass to that mail
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/forgot-password", { email });
      setLoading(false);
      data.ok && setSuccess(true);
      data.ok && toast("Check your email for the secret code");
    } catch (e) {
      console.log("Error from forget password handleSubmit", e);
      setLoading(false);
      toast(e.response.data);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data } = await axios.post("/api/reset-password", {
      email,
      code,
      newPassword,
    });
    setEmail("");
    setCode("");
    setNewPassword("");
    setLoading(false);
    data.ok && toast("Great! Now you can login with your new password");
    router.push("/login");

    try {
    } catch (err) {
      setLoading(false);
      toast(err.response.data);
      console.log(
        "Error from fontend handleResetPassword function try catch",
        err
      );
    }
  };

  return (
    <>
      <h1 className="jumbotron text-center bg-primary">Forgot password</h1>
      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={success ? handleResetPassword : handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control mb-4 p-4"
            placeholder="Enter email"
            required
          />
          {success && (
            <>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="form-control mb-4 p-4"
                placeholder="Enter secret code"
                required
              />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="form-control mb-4 p-4"
                placeholder="Enter new password"
                required
              />
            </>
          )}
          <div class="d-grid gap-2">
            <button
              className="btn btn-primary btn-block p-2"
              disabled={loading || !email}
            >
              {loading ? <SyncOutlined spin /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
