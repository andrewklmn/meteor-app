import React, { useState } from "react";
import { PaymentsCollection } from "/imports/api/PaymentsCollection";

export const PaymentAddForm = ({ user, handleClose }) => {
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10));
  const [income, setIncome] = useState(0);
  const [expence, setExpence] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState(undefined);

  const handleSubmit = (e) => {
    setError('');
    e.preventDefault();

    console.log(date);
    console.log(income);
    console.log(expence);
    console.log(comment);

    if (!date ||
      !(Number(income) >= 0) ||
      !(Number(expence) >= 0) ||
      !comment) {
      setError("Please fill in date, income, expence and comment");
      return;
    }

    PaymentsCollection.insert({
      createdAt: date,
      userId: user.id,
      income,
      expence,
      comment,
    });

    handleClose();
  };

  return (
    <>
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
      {error && <div className="error">{error}</div>}
    </>
  );
};