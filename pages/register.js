import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
const register = () => {
  const [name, setName] = useState("arfat");
  const [email, setEmail] = useState("rahmnaasdfasdf@gmail.com");
  const [password, setPassword] = useState("asdfasd");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`http://localhost:8000/api/register`, {
        name,
        email,
        password,
      });
      console.log(data);
      toast.success("Registration successfull. Please login");
      setLoading(false);
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };
  return (
    <>
      <h1 className="jumbotron bg-primary text-center">Register</h1>
      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name=""
            className="form-control mb-4 p-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id=""
            required
            placeholder="Enter name"
          />
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
              disabled={!name || !email || !password || loading}
            >
              {loading ? <SyncOutlined spin /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default register;
