import React, { useState, useEffect } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { UsersCollection } from "../api/UsersCollection";
import * as SC from "./Report.sc";
import { capitalizeFirstLetter } from "../helpers/capitalizeFirstLetter";
import { Payments } from "./Payments";

export const Report = ({ user, year, client, setClient }) => {
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

  const selectedUser = users.find((u) => u._id === client);

  return (
    <SC.Container>
      <SC.ClientSelector className="hideOnPrint">
        <SC.SelectHeader>
          <SC.Label htmlFor="client-select">📋 Звіт для:</SC.Label>
          <SC.Select
            id="client-select"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            aria-label="Оберіть клієнта"
          >
            <option value="">Віберіть ФОП</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {capitalizeFirstLetter(u.login)}
              </option>
            ))}
          </SC.Select>
        </SC.SelectHeader>
      </SC.ClientSelector>

      {selectedUser && (
        <SC.SelectedClient className="showOnPrint">
          <SC.ClientBadge>
            <SC.ClientIcon>👤</SC.ClientIcon>
            <span>ФОП: {capitalizeFirstLetter(selectedUser.login)}</span>
          </SC.ClientBadge>
        </SC.SelectedClient>
      )}

      {client && <Payments user={{ id: client }} year={year} admin={user} />}
    </SC.Container>
  );
};
