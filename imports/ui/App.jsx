import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { UsersCollection } from "/imports/api/UsersCollection";
import { Payments } from "./Payments";
import { Login } from "./Login";

export const App = () => {

  const users = useTracker(() => UsersCollection.find().fetch());
  const undefinedUser = {
    id: undefined,
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
      setUser(user);
    }
  }, []);
  
  if (!user.role) {
    return <Login user={user} users={users} setUser={setUser}/>;
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Payments user={user} logout={logout}/>
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
      </Switch>
    </Router>
  );
};

function Users() {
  return (
    <div>
      <h2>users</h2>
    </div>
  );
}

function Profile() {
  return (
    <div>
      <h2>Profile</h2>
    </div>
  );
}
