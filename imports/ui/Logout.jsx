/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as SC from "./Login.sc";
import * as UI from "./components";

export const Logout = ({ logout }) => {
  let history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      logout();
      history.push("/");
    }, 1000);
  }, []);

  return (
    <SC.Container>
      <h3>Bye-bye!</h3>
    </SC.Container>
  );
};
