/* eslint-disable react/prop-types */
import React, { useState } from "react";
import md5 from "md5";
import * as SC from "./Login.sc";
import * as UI from "./components";

export const Login = ({ user, setUser, users }) => {
  const [error, setError] = useState("");

  const handleChange = ({ target: { name, value } }) => {
    setError("");
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    users.forEach(({ login, passwordHash, role }) => {
      let error = "Wrong login/pass";
      if (login === user.login && passwordHash === md5(user.pass)) {
        const newUser = { ...user, role, pass: md5(user.pass) };
        localStorage.setItem('user', JSON.stringify(newUser));
        setUser(newUser);
        error = "";
      }
      setError(error);
    });
  };

  return (
    <SC.Container>
      <form onSubmit={handleSubmit}>
        <UI.FlexColumn>
          <h3>Enter your:</h3>
          <label>
            login:
            <input
              type="text"
              name="login"
              defaultValue={user.login}
              onChange={handleChange}
            />
          </label>
          <label>
            password:
            <input
              type="password"
              name="pass"
              defaultValue={user.pass}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Sign in</button>
          {error && <div>Error: {error}</div>}
        </UI.FlexColumn>
      </form>
    </SC.Container>
  );
};
