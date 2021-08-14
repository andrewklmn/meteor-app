/* eslint-disable react/prop-types */
import React, { useState } from "react";
import md5 from "md5";
import * as SC from "./Login.sc";
import * as UI from "./components";

export const Login = ({ user, setUser, users }) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setError("");
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    setIsLoading(true);
    setError('');
    event.preventDefault();
    let foundRole = undefined;
    let foundId = undefined;
    users.forEach(({ _id, login, passwordHash, role }) => {
      if (login === user.login && passwordHash === md5(user.pass)) {
        foundId = _id;
        foundRole = role; 
      }
    });
    setTimeout(() => {
      setIsLoading(false);
      if (foundRole) {
        const newUser = { id: foundId, login: user.login, role: foundRole, pass: md5(user.pass) };
        localStorage.setItem("u", encodeURI(JSON.stringify(newUser)));
        setUser(newUser);
      } else {
        setError("Wrong login/pass");
      }      
    }, 1000);
  };

  return (
    <SC.Container>
      <SC.Form onSubmit={handleSubmit}>
        <UI.FlexColumn>
          <h3>Please sign in:</h3>
          {error && <div>Error: {error}<br /><br /></div>}
          <SC.FieldRow>
            <label>login:</label>
            <input
              type="text"
              name="login"
              defaultValue={user.login}
              onChange={handleChange}
              disabled={isLoading}
            />
          </SC.FieldRow>
          <hr />
          <SC.FieldRow>
            <label>password:</label>
            <input
              type="password"
              name="pass"
              defaultValue={user.pass}
              onChange={handleChange}
              disabled={isLoading}
            />
          </SC.FieldRow>
          <hr />
          {!isLoading && <button type="submit">Sign in</button>}
          {isLoading && <span>Loading...</span>}
        </UI.FlexColumn>
      </SC.Form>
    </SC.Container>
  );
};
