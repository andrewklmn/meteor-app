/* eslint-disable react/prop-types */
import React, { useState } from "react";
import md5 from "md5";
import * as SC from "./Login.sc";
import { Spinner } from "./Spinner";

export const Login = ({ user, setUser, users }) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

    if (foundRole) {
      const newUser = { id: foundId, login: user.login, role: foundRole, pass: md5(user.pass) };
      localStorage.setItem("u", encodeURI(JSON.stringify(newUser)));
      setUser(newUser);
    } else {
      setTimeout(() => {
        setError("Wrong login/pass");
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <SC.Container>
      <SC.Card>
        <SC.Header>
          <SC.Logo>📊</SC.Logo>
          <SC.Title>Увійти в систему</SC.Title>
          <SC.Subtitle>Введіть свої дані для входу</SC.Subtitle>
        </SC.Header>

        <SC.Form onSubmit={handleSubmit}>
          {error && <SC.Alert role="alert">{error}</SC.Alert>}

          <SC.Field>
            <SC.Label htmlFor="login">Логін</SC.Label>
            <SC.Input
              id="login"
              type="text"
              name="login"
              placeholder="Введіть логін"
              defaultValue={user.login}
              onChange={handleChange}
              disabled={isLoading}
              autoComplete="username"
              aria-label="Login"
            />
          </SC.Field>

          <SC.Field>
            <SC.Label htmlFor="pass">Пароль</SC.Label>
            <SC.PasswordWrapper>
              <SC.Input
                id="pass"
                type={showPassword ? "text" : "password"}
                name="pass"
                placeholder="Введіть пароль"
                defaultValue={user.pass}
                onChange={handleChange}
                disabled={isLoading}
                autoComplete="current-password"
                aria-label="Password"
              />
              <SC.ToggleButton
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                disabled={isLoading}
              >
                {showPassword ? "🙈" : "👁️"}
              </SC.ToggleButton>
            </SC.PasswordWrapper>
          </SC.Field>

          {!isLoading && <SC.Button type="submit">Увійти</SC.Button>}
          {isLoading && <Spinner message="Вхід..." />}
        </SC.Form>
      </SC.Card>
    </SC.Container>
  );
};
