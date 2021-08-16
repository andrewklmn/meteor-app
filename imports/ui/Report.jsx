import React, { useState, useEffect } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { UsersCollection } from "../api/UsersCollection";
import * as SC from "./Report.sc";
import { capitalizeFirstLetter } from "../helpers/capitalizeFirstLetter";
import { Payments } from "./Payments";

export const Report = ({ user, client, setClient }) => {
  const users = useTracker(() =>
    UsersCollection.find(
      { 
        // role: 'user' 
      },
      {
        sort: { createdAt: -1 },
      }
    ).fetch()
  );

  return (
    <div className="app">
      <SC.Container>
        <SC.ClientSelector className="hideOnPrint" >
          <SC.Label>Звіт для:</SC.Label>
          <SC.Select value={client} onChange={(e) => setClient(e.target.value)}>
            <option value="">Віберіть ФОП</option>
            {users.map(user => <option key={user._id} value={user._id}>{capitalizeFirstLetter(user.login)}</option>)}
          </SC.Select>
          <SC.Button type="button">Додати нового</SC.Button>
        </SC.ClientSelector>
        <SC.Requisits className="showOnPrint">
          Шапка отчёта для ФОП в налоговую
        </SC.Requisits>
        {client && <Payments user={{ id: client }} admin={user}/>}
      </SC.Container>
    </div>
  );
};
