import React, { useState, useEffect } from "react";
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
  };
  const [ user, setUser ] = useState(undefinedUser);

  const logout = () => {
    localStorage.removeItem('u');
    setUser({ ...undefinedUser });
  };

  useEffect(() => {
    const user = localStorage.getItem('u') ? JSON.parse(decodeURI(localStorage.getItem('u'))) : undefined;
    if (user && user.role) {
      console.log('=== user has role ===');
      setUser(user);
    }
  }, []);
  
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
          <li>
            <button onClick={logout}>Logout</button>
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
