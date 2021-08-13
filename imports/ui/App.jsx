import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { UsersCollection } from "/imports/api/UsersCollection";
import { Todos } from "./Todos";
import { Login } from "./Login";

export const App = () => {

  const users = useTracker(() => UsersCollection.find().fetch());
  const undefinedUser = {
    login: undefined,
    pass: undefined,
    role: undefined,
    error: undefined,
  };
  const [ user, setUser ] = useState(undefinedUser);

  if (!user.role) {
    return <Login user={user} users={users} setUser={setUser}/>;
  }

  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
        <hr />
        <Switch>
          <Route exact path="/">
            <Todos />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}
