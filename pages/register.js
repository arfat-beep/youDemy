import React, { useState } from "react";
import axios from "axios";
const register = () => {
  const [name, setName] = useState("arfat");
  const [email, setEmail] = useState("rahmnaasdfasdf@gmail.com");
  const [password, setPassword] = useState("asdfasd");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(`http://localhost:8000/api/register`, {
      name,
      email,
      password,
    });
    console.log("register response", data);
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
          <div class="d-grid gap-2">
            <button class="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default register;
