import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { PaymentsCollection } from "/imports/api/PaymentsCollection";
import { PaymentAddForm } from "./PaymentAddForm";
import { PaymentList } from "./PaymentList";
import { taxPlan } from "../constants/taxes";
import { Spinner } from "./Spinner";

export const Payments = ({ admin, user }) => {
  const [ result, setResult ] = useState({ income: 0, expence: 0, tax: 0 });
  const year = new Date().toISOString().substr(0, 4);
  const payments = useTracker(() =>
    PaymentsCollection.find(
      { userId: user.id },
      {
        sort: { createdAt: -1 },
      }
    ).fetch()
  );

  const getQuarter = (d) => {
    d = d || new Date();
    var q = [4, 1, 2, 3];
    return q[Math.floor(d.getMonth() / 3)];
  };

  const getPaymentsForPeriod = ({ year, period, payments }) => {
    return payments.filter((payment) => {
      if (
        payment.createdAt >= `${year}-${period[0]}` &&
        payment.createdAt <= `${year}-${period[1]}`
      ) {
        return true;
      }
      return false;
    });
  };

  const editable = admin && (admin === user.id );

  return (
    <div className="app">
      <div className="main">
        {editable && <PaymentAddForm user={user} />}
        {payments.length === 0 && <Spinner />}
        {payments.length > 0 &&
          taxPlan.map((period, index) => {
            console.log(getQuarter());
            if (getQuarter() >= Number(index)) {

              return (
                <PaymentList
                  key={year + JSON.stringify(period)}
                  editable={editable}
                  quarter={index + 1}
                  from={`${year}-${period[0]}`}
                  to={`${year}-${period[1]}`}
                  payments={getPaymentsForPeriod({
                    year,
                    period,
                    payments,
                  })}
                  result={result}
                  setResult={setResult}
                />
              );
            }
            return null;
          })}
      </div>
    </div>
  );
};
