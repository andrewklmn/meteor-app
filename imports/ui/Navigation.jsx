import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { capitalizeFirstLetter } from "../helpers/capitalizeFirstLetter";
import * as SC from "./Navigation.sc";

export const Navigation = ({ user }) => {

  const year = new Date().toISOString().substr(0, 4);
  const prevYear = year - 1;

  return (
    <SC.Container className="header hideOnPrint">
      <SC.Title>{capitalizeFirstLetter(user.login)}'s workspace</SC.Title>
      <SC.Menu>
        {user.role === "accountant" && (
          <SC.MenuItem>
            <Link to="/">{year}</Link>
          </SC.MenuItem>
        )}
        {user.role === "accountant" && (
          <SC.MenuItem>
            <Link to="/previous_year">{prevYear}</Link>
          </SC.MenuItem>
        )}
        {user.role === "accountant" && (
          <SC.MenuItem>
            <Link to="/payments">Мої платежі</Link>
          </SC.MenuItem>
        )}
        <SC.MenuItem>
          <Link to="/logout">Вийти</Link>
        </SC.MenuItem>
      </SC.Menu>
    </SC.Container>
  );
};
