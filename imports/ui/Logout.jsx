/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as SC from "./Logout.sc";
import { Spinner } from "./Spinner";

export const Logout = ({ logout }) => {
  let history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      logout();
      history.push("/");
    }, 1500);
  }, []);

  return (
    <SC.Container>
      <SC.Card>
        <SC.Icon>👋</SC.Icon>
        <SC.Title>До побачення!</SC.Title>
        <SC.Subtitle>Ви успішно вийшли з системи</SC.Subtitle>
        <SC.SpinnerWrapper>
          <Spinner message="Перенаправлення..." />
        </SC.SpinnerWrapper>
      </SC.Card>
    </SC.Container>
  );
};
