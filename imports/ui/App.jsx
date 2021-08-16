import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { UsersCollection } from "/imports/api/UsersCollection";
import { Payments } from "./Payments";
import { Login } from "./Login";
import { Logout } from "./Logout";
import { Navigation } from "./Navigation";
import { Report } from "./Report";

export const App = () => {
  const [client, setClient] = useState("");
  const users = useTracker(() => UsersCollection.find({},{ sort: { createdAt: -1 }}).fetch());
  const undefinedUser = {
    id: undefined,
    login: undefined,
    pass: undefined,
    role: undefined,
  };
  const [user, setUser] = useState(undefinedUser);

  const logout = () => {
    localStorage.removeItem("u");
    setUser({ ...undefinedUser });
  };

  useEffect(() => {
    const user = localStorage.getItem("u")
      ? JSON.parse(decodeURI(localStorage.getItem("u")))
      : undefined;
    if (user && user.role) {
      setUser(user);
    }
  }, []);

  if (!user.role) {
    return (
      <Router>
        <Switch>
          <Route exact path="/logout">
            <Logout logout={logout} />
          </Route>
          <Route exact path="/">
            <Login user={user} users={users} setUser={setUser} />
          </Route>
        </Switch>
      </Router>
    );
  }
  
  if (user && user.role === "user") {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Navigation user={user} />
            <Payments user={user} admin={user.id} />
          </Route>
          <Route path="/logout">
            <Logout logout={logout} />;
          </Route>
        </Switch>
      </Router>
    );
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Navigation user={user} />
          <Report user={user} client={client} setClient={setClient} />
        </Route>
        <Route path="/payments">
          <Navigation user={user} />
          <Payments user={user} admin={user.id} />
        </Route>
        <Route path="/logout">
          <Logout logout={logout} />;
        </Route>
      </Switch>
    </Router>
  );
};
