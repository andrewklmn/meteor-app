import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { capitalizeFirstLetter } from "../helpers/capitalizeFirstLetter";
import * as SC from "./Navigation.sc";

export const Navigation = ({ user }) => {
  return (
    <SC.Container className="header">
      <SC.Title>{capitalizeFirstLetter(user.login)}'s workspace</SC.Title>
      <SC.Menu>
        {user.role === "accountant" && (
          <SC.MenuItem>
            <Link to="/">Clients</Link>
          </SC.MenuItem>
        )}
        {user.role === "accountant" && (
          <SC.MenuItem>
            <Link to="/payments">My payments</Link>
          </SC.MenuItem>
        )}
        <SC.MenuItem>
          <Link to="/logout">Exit</Link>
        </SC.MenuItem>
      </SC.Menu>
    </SC.Container>
  );
};
