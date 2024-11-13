import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { PaymentsCollection } from "/imports/api/PaymentsCollection";
import { PaymentAddForm } from "./PaymentAddForm";
import { PaymentList } from "./PaymentList";
import { getWarTaxPercent, taxPercent, taxPlan, taxYearPlan } from "../constants/taxes";
import { Spinner } from "./Spinner";

export const Payments = ({ admin, user, year }) => {
  const currentYear = new Date().toISOString().substr(0, 4);
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

  const editable = admin && admin === user.id;

  const yearSubTotal = [
    {
      income: 0,
      expence: 0,
      tax: 0,
      warTax: 0,
    },
  ];
  taxYearPlan.forEach((period) => {
    const periodPayments = getPaymentsForPeriod({
      year,
      period,
      payments,
    });
    const periodSubTotal = {
      income: periodPayments.reduce(
        (acc, next) => acc + Number(next.income),
        0
      ),
      expence: periodPayments.reduce(
        (acc, next) => acc + Number(next.expence),
        0
      ),
      tax: periodPayments.reduce(
        (acc, next) =>
          acc +
          ((Number(next.income) - Number(next.expence)) * taxPercent) / 100,
        0
      ),
      warTax: periodPayments.reduce(
        (acc, next) =>
          acc +
          ((Number(next.income) - Number(next.expence)) *
            getWarTaxPercent(`${year}-${period[0]}`)) /
            100,
        0
      ),
    };
    yearSubTotal.push(periodSubTotal);
  });

  console.log("==== yearSubTotal", yearSubTotal);

  return (
    <div className="app">
      {editable && <PaymentAddForm user={user} />}
      <div className="main">
        {payments.length === 0 && <Spinner />}
        {payments.length > 0 &&
          taxPlan.map((period, index) => {
            if (getQuarter() >= Number(index) || currentYear > year) {
              const quarterPayments = getPaymentsForPeriod({
                year,
                period,
                payments,
              });

              return (
                <PaymentList
                  key={year + JSON.stringify(period)}
                  editable={editable}
                  quarter={index + 1}
                  from={`${year}-${period[0]}`}
                  to={`${year}-${period[1]}`}
                  payments={quarterPayments}
                  result={yearSubTotal[index]}
                />
              );
            }
            return null;
          })}
      </div>
    </div>
  );
};
