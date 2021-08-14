import React, { useState } from "react";
import { PaymentsCollection } from "/imports/api/PaymentsCollection";

export const PaymentEditForm = ({ payment }) => {
  const [oldValue, setOldValue] = useState(payment);
  const [isEditor, setIsEditor] = useState(false);
  const [date, setDate] = useState(payment.createdAt.substr(0, 10));
  const [income, setIncome] = useState(payment.income);
  const [expence, setExpence] = useState(payment.expence);
  const [comment, setComment] = useState(payment.comment);
  const [error, setError] = useState(undefined);

  const isRecordEdited = () => {
    if (
      date === oldValue.createdAt.substr(0, 10) &&
      income === oldValue.income &&
      expence === oldValue.expence &&
      comment === oldValue.comment
    )
      return false;
    return true;
  };

  const cancelEditor = (e) => {
    if(e.keyCode === 13) {
      handleSubmit(e);
    }
    if(e.keyCode === 27) {
      const { createdAt, income, expence, comment } = oldValue;
      setDate(createdAt);
      setIncome(income);
      setExpence(expence);
      setComment(comment);
      setError('');
      setIsEditor(false);
    }
  }

  const handleSubmit = (e) => {
    setError("");
    e.preventDefault();
    

    if(!isRecordEdited()) {
      setIsEditor(false);
      return;
    }

    if (
      !date ||
      !(income && Number(income) >= 0) ||
      !(expence && Number(expence) >= 0) ||
      !comment
    ) {
      setError("Please fill in date, income, expence and comment");
      return;
    }

    const newValue = {
      _id: payment._id,      
      createdAt: date,
      userId: payment.userId,
      income,
      expence,
      comment,
    };

    PaymentsCollection.update({ _id: payment._id }, { $set: newValue });
    setOldValue(newValue);
    setIsEditor(false);
  };

  const handleFocus = (e) => {
    e.target.classList.remove('disabled')
    e.target.select();
  };

  const handleBlur = (e) => {
    e.target.classList.add('disabled')
    handleSubmit(e);
  };

  return (
    <>
      <form
        onKeyUp={cancelEditor}
        className="task-form"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="date disabled"
          placeholder="Date of payment"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        <input
          type="text"
          className="money income disabled"
          placeholder="Add income"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        <input
          type="text"
          className="money expence disabled"
          placeholder="Add expence"
          value={expence}
          onChange={(e) => setExpence(e.target.value)}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        <input
          type="text"
          className="comment disabled"
          placeholder="Add your comment here"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        {/* isRecordEdited() ? <button type="submit">Save</button> : "" */}
      </form>
      {error && <div className="error">{error}</div>}
    </>
  );
};
