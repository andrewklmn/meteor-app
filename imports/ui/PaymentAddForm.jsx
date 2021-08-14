import React, { useState } from "react";
import { PaymentsCollection } from "/imports/api/PaymentsCollection";

export const PaymentAddForm = ({ user }) => {
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10));
  const [income, setIncome] = useState(0);
  const [expence, setExpence] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState(undefined);

  const handleSubmit = (e) => {
    setError('');
    e.preventDefault();

    if (!date || !income || !expence || !comment) {
      setError("Please fill in date, income and expence");
      return;
    }

    console.log({
      createdAt: date,
      userId: user.id,
      income,
      expence,
      comment,
    });

    PaymentsCollection.insert({
      createdAt: date,
      userId: user.id,
      income,
      expence,
      comment,
    });

    setDate(new Date().toISOString().substr(0, 10));
    setIncome(0);
    setExpence(0);
    setComment('');
  };

  return (
    <>
      {error && <div className="error">{error}</div>}
      <form className="task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="date"
          placeholder="Date of payment"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="text"
          className="money income"
          placeholder="Income"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
        />
        <input
          type="text"
          className="money expence"
          placeholder="Expence"
          value={expence}
          onChange={(e) => setExpence(e.target.value)}
        />
        <input
          type="text"
          placeholder="Add your comment here"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit">Add Payment</button>
      </form>
    </>
  );
};
