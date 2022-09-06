import React, { useState } from "react";

const register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.table({ name, email, password });
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
