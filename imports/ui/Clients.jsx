import React, { useState, useEffect } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { UsersCollection } from "../api/UsersCollection";
import * as SC from "./Clients.sc";
import { capitalizeFirstLetter } from "../helpers/capitalizeFirstLetter";
import { Payments } from "./Payments";

export const Clients = ({ user, client, setClient }) => {
  const users = useTracker(() =>
    UsersCollection.find(
      { 
        role: 'user' 
      },
      {
        sort: { createdAt: -1 },
      }
    ).fetch()
  );

  return (
    <div className="app">
      <SC.Container>
        <SC.ClientSelector>
          <SC.Label>Client:</SC.Label>
          <SC.Select value={client} onChange={(e) => setClient(e.target.value)}>
            <option value="">Select user</option>
            {users.map(user => <option key={user._id} value={user._id}>{capitalizeFirstLetter(user.login)}</option>)}
          </SC.Select>
          <button type="button">Add New Client</button>
        </SC.ClientSelector>
        {client && <Payments user={{ id: client }} admin={user}/>}
      </SC.Container>
    </div>
  );
};
