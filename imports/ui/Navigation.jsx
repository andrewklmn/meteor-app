import React from "react";
import { Link, useLocation } from "react-router-dom";
import { capitalizeFirstLetter } from "../helpers/capitalizeFirstLetter";
import * as SC from "./Navigation.sc";

export const Navigation = ({ user }) => {
  const year = new Date().toISOString().substr(0, 4);
  const prevYear = year - 1;
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/" && (location.pathname === "/" || location.pathname === "")) {
      return true;
    }
    if (path === "/previous_year" && location.pathname === "/previous_year") {
      return true;
    }
    if (path === "/payments" && location.pathname === "/payments") {
      return true;
    }
    return false;
  };

  return (
    <SC.Container className="header hideOnPrint">
      <SC.Title>
        <SC.UserIcon>👤</SC.UserIcon>
        {capitalizeFirstLetter(user.login)}
      </SC.Title>
      <SC.Menu>
        <SC.MenuItem active={isActive("/")}>
          <Link to="/">{year}</Link>
        </SC.MenuItem>
        <SC.MenuItem active={isActive("/previous_year")}>
          <Link to="/previous_year">{prevYear}</Link>
        </SC.MenuItem>
        {user.role === "accountant" && (
          <SC.MenuItem active={isActive("/payments")}>
            <Link to="/payments">💰 Мої платежі</Link>
          </SC.MenuItem>
        )}
        <SC.MenuItem>
          <Link to="/logout" className="logout-link">🚪 Вийти</Link>
        </SC.MenuItem>
      </SC.Menu>
    </SC.Container>
  );
};
