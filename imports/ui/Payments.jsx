import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { PaymentsCollection } from "/imports/api/PaymentsCollection";
import { PaymentAddForm } from './PaymentAddForm';
import { PaymentEditForm } from './PaymentEditForm';

 
export const  Payments = ({ user }) => {

  const payments = useTracker(() =>
    PaymentsCollection.find({}, {
      sort: { createdAt: -1 },
    }).fetch()
  );
 
  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
          <h1>Payments list</h1>
          </div>
        </div>
      </header>

      <div className="main">
        <PaymentAddForm user={user} />
        <div style={{ borderBottom: 'solid 3px lightgray' }}></div>
        {[...payments].map((payment) => <PaymentEditForm key={payment._id} payment={payment} />)}
      </div>
    </div>
  );
};