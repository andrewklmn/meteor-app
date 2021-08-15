import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { PaymentsCollection } from "/imports/api/PaymentsCollection";
import { PaymentAddForm } from "./PaymentAddForm";
import { PaymentList } from "./PaymentList";
import { taxPlan } from "../constants/taxes";
import { Spinner } from "./Spinner";

export const Payments = ({ admin, user }) => {
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
            if (getQuarter() >= Number(3 - index)) {
              return (
                <PaymentList
                  key={year + JSON.stringify(period)}
                  editable={editable}
                  quarter={4 - index}
                  from={`${year}-${period[0]}`}
                  to={`${year}-${period[1]}`}
                  payments={getPaymentsForPeriod({
                    year,
                    period,
                    payments,
                  })}
                />
              );
            }
            return null;
          })}
        {payments.length > 0 && (
          <PaymentList
            editable={editable}
            quarter={4}
            from={`${year - 1}-${taxPlan[0][0]}`}
            to={`${year - 1}-${taxPlan[0][1]}`}
            payments={getPaymentsForPeriod({
              year: year - 1,
              period: taxPlan[0],
              payments,
            })}
          />
        )}
      </div>
    </div>
  );
};
