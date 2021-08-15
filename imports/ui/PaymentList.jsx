import React, { useState } from "react";
import { PaymentEditForm } from "./PaymentEditForm";
import { taxPercent } from "../constants/taxes";
import * as SC from "./PaymentList.sc";

export const PaymentList = ({ quarter, from, to, payments }) => {
  const incomeSum = payments.reduce(
    (prev, next) => prev + Number(next.income),
    0
  );
  const expenceSum = payments.reduce(
    (prev, next) => prev + Number(next.expence),
    0
  );

  console.log(payments);

  return (
    <SC.Container>
      <SC.Title>{quarter}-th quarter, from {from} to {to}</SC.Title>
      <SC.TableHeader>
        <SC.DateHeader>Date</SC.DateHeader>
        <SC.MoneyHeader>Income</SC.MoneyHeader>
        <SC.MoneyHeader>Expence</SC.MoneyHeader>
        <SC.CommentHeader>Comment</SC.CommentHeader>
        <SC.TaxHeader>Tax, {taxPercent}%</SC.TaxHeader>
      </SC.TableHeader>
      {[...payments].map((payment) => (
        <PaymentEditForm key={payment._id} payment={payment} />
      ))}
      <SC.TableHeader>
        <SC.DateHeader>Total:</SC.DateHeader>
        <SC.MoneyHeader>{incomeSum}</SC.MoneyHeader>
        <SC.MoneyHeader>{expenceSum}</SC.MoneyHeader>
        <SC.CommentHeader>{quarter}-th quarter, {from} - {to}</SC.CommentHeader>
        <SC.TaxHeader>
          {Math.round((incomeSum - expenceSum) * taxPercent) / 100}
        </SC.TaxHeader>
      </SC.TableHeader>
    </SC.Container>
  );
};
