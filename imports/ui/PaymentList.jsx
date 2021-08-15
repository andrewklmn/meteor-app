import React, { useState } from "react";
import { PaymentEditForm } from "./PaymentEditForm";
import { taxPercent } from "../constants/taxes";
import * as SC from "./PaymentList.sc";

export const PaymentList = ({ editable, quarter, from, to, payments }) => {
  const incomeSum = payments.reduce(
    (prev, next) => prev + Number(next.income),
    0
  );
  const expenceSum = payments.reduce(
    (prev, next) => prev + Number(next.expence),
    0
  );

  return (
    <SC.Container>
      <SC.Title>
        Quarter #{quarter}: {from} &mdash; {to}
      </SC.Title>
      <SC.TableHeader>
        <SC.DateHeader>Date</SC.DateHeader>
        <SC.MoneyHeader>Income</SC.MoneyHeader>
        <SC.MoneyHeader>Expence</SC.MoneyHeader>
        {editable ? (
          <SC.CommentHeader>Comment</SC.CommentHeader>
        ) : (
          <SC.SubtotalHeader>Subtotal</SC.SubtotalHeader>
        )}
        <SC.TaxHeader>Tax, {taxPercent}%</SC.TaxHeader>
      </SC.TableHeader>
      {[...payments].map((payment) => (
        <PaymentEditForm
          key={payment._id}
          editable={editable}
          payment={payment}
        />
      ))}
      <SC.TableFooter>
        <SC.DateTotal>Quarter #{quarter}:</SC.DateTotal>
        <SC.MoneyTotal>{incomeSum}</SC.MoneyTotal>
        <SC.MoneyTotal>{expenceSum}</SC.MoneyTotal>
        {editable ? (
          <SC.CommentTotal>Total:</SC.CommentTotal>
        ) : (
          <SC.SubtotalTotal>{Math.round((incomeSum - expenceSum) * 100) / 100}</SC.SubtotalTotal>
        )}
        <SC.TaxTotal>
          {Math.round((incomeSum - expenceSum) * taxPercent) / 100}
        </SC.TaxTotal>
      </SC.TableFooter>
    </SC.Container>
  );
};
