import React, { useState } from "react";
import { PaymentsCollection } from "/imports/api/PaymentsCollection";
import { handleNumberChange } from "../helpers/handleNumberChange";
import * as SC from "./PaymentAddForm.sc";

export const PaymentAddForm = ({ user }) => {
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10));
  const [income, setIncome] = useState(0);
  const [expence, setExpence] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState(undefined);

  const handleSubmit = (e) => {
    setError("");
    e.preventDefault();

    if (
      !date ||
      !(!isNaN(Number(income)) && Number(income) >= 0 && income !== "") ||
      !(!isNaN(Number(expence)) && Number(expence) >= 0 && expence !== "") ||
      !comment
    ) {
      setError("Заповніть поля дата, дохід, повернення, коментар");
      return;
    }

    if (Number(income) === 0 && Number(expence) === 0) {
      setError("Заповніть поля дохід/повернення");
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
    setComment("");
  };

  return (
    <SC.Container className="hideOnPrint">
      <SC.Card>
        <SC.CardTitle>➕ Додати платіж</SC.CardTitle>
        <SC.Form onSubmit={handleSubmit}>
          <SC.FieldGroup>
            <SC.Field>
              <SC.Label htmlFor="payment-date">Дата</SC.Label>
              <SC.Input
                id="payment-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                aria-label="Дата платежу"
              />
            </SC.Field>

            <SC.Field>
              <SC.Label htmlFor="payment-income">Дохід</SC.Label>
              <SC.MoneyInput
                id="payment-income"
                type="text"
                inputMode="decimal"
                placeholder="0.00"
                value={income}
                onChange={(e) => setIncome(handleNumberChange(e))}
                aria-label="Сума доходу"
              />
            </SC.Field>

            <SC.Field>
              <SC.Label htmlFor="payment-expence">Повернення</SC.Label>
              <SC.MoneyInput
                id="payment-expence"
                type="text"
                inputMode="decimal"
                placeholder="0.00"
                value={expence}
                onChange={(e) => setExpence(handleNumberChange(e))}
                aria-label="Сума повернення"
              />
            </SC.Field>

            <SC.Field className="comment-field">
              <SC.Label htmlFor="payment-comment">Коментар</SC.Label>
              <SC.Input
                id="payment-comment"
                type="text"
                placeholder="Опис платежу"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                aria-label="Коментар"
              />
            </SC.Field>
          </SC.FieldGroup>

          <SC.Button type="submit">Додати платіж</SC.Button>
        </SC.Form>

        {error && <SC.Error role="alert">{error}</SC.Error>}
      </SC.Card>
    </SC.Container>
  );
};
