import React, { useState } from "react";
import { PaymentsCollection } from "/imports/api/PaymentsCollection";
import { getWarTaxPercent, taxPercent } from "../constants/taxes";
import { handleNumberChange } from "../helpers/handleNumberChange";
import * as SC from "./PaymentEditForm.sc";

export const PaymentEditForm = ({ payment, editable }) => {
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
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
    if (e.keyCode === 27) {
      const { createdAt, income, expence, comment } = oldValue;
      setDate(createdAt);
      setIncome(income);
      setExpence(expence);
      setComment(comment);
      setError("");
      setIsEditor(false);
    }
  };

  const handleSubmit = (e) => {
    setError("");
    e.preventDefault();

    if (!isRecordEdited()) {
      setIsEditor(false);
      return;
    }

    if (
      !date ||
      !(Number(income) >= 0 && income !== "") ||
      !(Number(expence) >= 0 && expence !== "") ||
      !comment
    ) {
      setError("Заповніть поля дата, дохід, повернення, коментар");
      return;
    }

    if (Number(income) === 0 && Number(expence) === 0) {
      setError("Заповніть поля дохід/повернення");
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
    e.target.classList.remove("disabled");
    e.target.select();
  };

  const handleBlur = (e) => {
    e.target.classList.add("disabled");
    handleSubmit(e);
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      e.target.blur();
    }
  };

  return (
    <>
      <SC.Form onKeyUp={cancelEditor} onSubmit={handleSubmit}>
        <input
          type="text"
          className="date disabled"
          placeholder="Date of payment"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onKeyUp={handleKeyUp}
          readOnly={!editable}
        />
        <input
          type="text"
          className="money income disabled"
          placeholder="Додай суму"
          value={income}
          onChange={(e) => setIncome(handleNumberChange(e))}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onKeyUp={handleKeyUp}
          readOnly={!editable}
        />
        <input
          type="text"
          className="money expence disabled"
          placeholder="Додай суму"
          value={expence}
          onChange={(e) => setExpence(handleNumberChange(e))}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onKeyUp={handleKeyUp}
          readOnly={!editable}
        />
        {editable && (
          <input
            type="text"
            className="comment disabled"
            placeholder="Add your comment here"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onKeyUp={handleKeyUp}
            readOnly={!editable}
          />
        )}
        <input
          type="text"
          className="moneySubtotal disabled"
          readOnly
          value={
            Math.round(
              (income - expence) * (editable ? 100 - taxPercent - getWarTaxPercent(date) : 100)
            ) / 100
          }
        />
        <input
          type="text"
          className="tax disabled"
          readOnly
          value={Math.round((income - expence) * taxPercent) / 100}
        />
        <input
          type="text"
          className="tax disabled"
          readOnly
          value={Math.round((income - expence) * getWarTaxPercent(date)) / 100}
        />
      </SC.Form>
      {error && <div className="error">{error}</div>}
    </>
  );
};
