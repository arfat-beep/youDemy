import axios from "axios";
import Router, { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../context";
import { SyncOutlined } from "@ant-design/icons";

const ForgotPassword = () => {
  // state
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
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
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/forgot-password", { email });
      setLoading(false);
      data.ok && toast("Check your email for the secret code");
    } catch (e) {
      console.log("Error from forget password handleSubmit", e);
      setLoading(false);
      toast(e.response.data);
    }
  };

  return (
    <>
      <h1 className="jumbotron text-center bg-primary">Forgot password</h1>
      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control mb-4 p-4"
            placeholder="Enter email"
            required
          />
          <br />
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
