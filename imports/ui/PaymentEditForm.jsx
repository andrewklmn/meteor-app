import React, { useState } from "react";
import { PaymentsCollection } from "/imports/api/PaymentsCollection";
import { getWarTaxPercent, taxPercent } from "../constants/taxes";
import { handleNumberChange } from "../helpers/handleNumberChange";
import * as SC from "./PaymentEditForm.sc";
import { PaymentMobileCard } from "./components/PaymentMobileCard";

const formatDate = (d) => {
  if (typeof d === "string") return d.substr(0, 10);
  const date = new Date(d);
  return date.toISOString().substr(0, 10);
};

export const PaymentEditForm = ({ payment, editable }) => {
  const [oldValue, setOldValue] = useState(payment);
  const [isEditor, setIsEditor] = useState(false);
  const [date, setDate] = useState(formatDate(payment.createdAt));
  const [income, setIncome] = useState(payment.income);
  const [expence, setExpence] = useState(payment.expence);
  const [comment, setComment] = useState(payment.comment);
  const [error, setError] = useState(undefined);

  const isRecordEdited = () => {
    if (
      date === formatDate(oldValue.createdAt) &&
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

  const subtotal =
    Math.round(
      (income - expence) *
        (editable ? 100 - taxPercent - getWarTaxPercent(date) : 100),
    ) / 100;
  const tax = Math.round((income - expence) * taxPercent) / 100;
  const warTax = Math.round((income - expence) * getWarTaxPercent(date)) / 100;

  const formatCurrency = (value) => {
    return Number(value).toLocaleString("uk-UA", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <>
      <SC.Form onKeyUp={cancelEditor} onSubmit={handleSubmit}>
        {editable ? (
          <>
            <SC.InputCell date>
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
                aria-label="Дата"
              />
            </SC.InputCell>
            <SC.InputCell money income>
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
                aria-label="Дохід"
              />
            </SC.InputCell>
            <SC.InputCell money expence>
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
                aria-label="Повернення"
              />
            </SC.InputCell>
            <SC.InputCell comment>
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
                aria-label="Коментар"
              />
            </SC.InputCell>
            <SC.InputCell money readonly>
              <input
                type="text"
                className="moneySubtotal disabled"
                readOnly
                value={formatCurrency(subtotal)}
                aria-label="На руки"
              />
            </SC.InputCell>
            <SC.InputCell tax readonly>
              <input
                type="text"
                className="tax disabled"
                readOnly
                value={formatCurrency(tax)}
                aria-label="ЄП"
              />
            </SC.InputCell>
            <SC.InputCell tax readonly>
              <input
                type="text"
                className="tax disabled"
                readOnly
                value={formatCurrency(warTax)}
                aria-label="ВЗ"
              />
            </SC.InputCell>
          </>
        ) : (
          <>
            <SC.ReadonlyInputCell date>
              <input
                type="text"
                className="date disabled"
                placeholder="Date of payment"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                onBlur={handleBlur}
                onFocus={handleFocus}
                onKeyUp={handleKeyUp}
                readOnly
                aria-label="Дата"
              />
            </SC.ReadonlyInputCell>
            <SC.ReadonlyInputCell money income>
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
                aria-label="Дохід"
              />
            </SC.ReadonlyInputCell>
            <SC.ReadonlyInputCell money expence>
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
                aria-label="Повернення"
              />
            </SC.ReadonlyInputCell>
            <SC.ReadonlyInputCell money readonly>
              <input
                type="text"
                className="moneySubtotal disabled"
                readOnly
                value={formatCurrency(subtotal)}
                aria-label="На руки"
              />
            </SC.ReadonlyInputCell>
            <SC.ReadonlyInputCell tax readonly>
              <input
                type="text"
                className="tax disabled"
                readOnly
                value={formatCurrency(tax)}
                aria-label="ЄП"
              />
            </SC.ReadonlyInputCell>
            <SC.ReadonlyInputCell tax readonly>
              <input
                type="text"
                className="tax disabled"
                readOnly
                value={formatCurrency(warTax)}
                aria-label="ВЗ"
              />
            </SC.ReadonlyInputCell>
          </>
        )}
      </SC.Form>
      {error && <SC.Error role="alert">{error}</SC.Error>}
      <PaymentMobileCard payment={payment} editable={editable} />
    </>
  );
};
