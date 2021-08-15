import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { PaymentsCollection } from "/imports/api/PaymentsCollection";
import { PaymentAddForm } from "./PaymentAddForm";
import { PaymentList } from "./PaymentList";
import { taxPlan } from "../constants/taxes";
import { Spinner } from './Spinner';

export const Payments = ({ user, logout }) => {
  const [isAdderOpened, setIsAdderOpened] = useState(false);

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
    var q = [4,1,2,3];
    return q[Math.floor(d.getMonth() / 3)];
  }

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

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleAdder = () => {
    setIsAdderOpened(!isAdderOpened);
  };

  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>
              {capitalizeFirstLetter(user.login)}'s payments list {year}
            </h1>
            <span>
              <span
                onClick={handleAdder}
                className="add-sign"
                title="Add new payment"
              >
                Add
              </span>
              <span onClick={logout} className="add-sign" title="Log Out">
                Exit
              </span>
            </span>
          </div>
        </div>
      </header>

      <div className="main">
        {isAdderOpened && (
          <PaymentAddForm
            user={user}
            handleClose={() => setIsAdderOpened(false)}
          />
        )}
        {payments.length === 0 && <Spinner />}
        {payments.length > 0 && taxPlan.map((period, index) => {
          if (getQuarter() >= Number(3 - index)) {
            return (
                <PaymentList
                  quarter={4 - index}
                  from={(`${year}-${period[0]}`)}
                  to={(`${year}-${period[1]}`)}
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
            quarter={4}
            from={(`${year - 1}-${taxPlan[0][0]}`)}
            to={(`${year - 1}-${taxPlan[0][1]}`)}
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
