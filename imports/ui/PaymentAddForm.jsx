import React, { useState } from "react";
import { PaymentsCollection } from "/imports/api/PaymentsCollection";
import * as SC from "./PaymentAddForm.sc"; 

export const PaymentAddForm = ({ user }) => {
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10));
  const [income, setIncome] = useState(0);
  const [expence, setExpence] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState(undefined);

  const handleSubmit = (e) => {
    setError('');
    e.preventDefault();

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

    setDate(new Date().toISOString().substr(0, 10));
    setIncome(0);
    setExpence(0);
    setComment('');
  };

  return (
    <SC.Container className="hideOnPrint">
      <SC.Form onSubmit={handleSubmit}>
        <input
          type="text"
          className="date"
          placeholder="Дата"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="text"
          className="money income"
          placeholder="Дохід"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
        />
        <input
          type="text"
          className="money expence"
          placeholder="Повернення"
          value={expence}
          onChange={(e) => setExpence(e.target.value)}
        />
        <input
          type="text"
          className="comment"
          placeholder="Коментарій"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <SC.Button type="submit">Додати платіж</SC.Button>
      </SC.Form>
      {error && <div className="error">{error}</div>}
    </SC.Container>
  );
};
