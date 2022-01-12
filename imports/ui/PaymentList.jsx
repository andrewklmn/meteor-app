import React, { useEffect, useState } from "react";
import { PaymentEditForm } from "./PaymentEditForm";
import { taxPercent } from "../constants/taxes";
import * as SC from "./PaymentList.sc";
import { ukrMonths } from "../constants/ukrMonths";

export const PaymentList = ({
  editable,
  quarter,
  from,
  to,
  payments,
  result,
}) => {
  const incomeSum = payments.reduce(
    (prev, next) => prev + Number(next.income),
    0
  );
  const expenceSum = payments.reduce(
    (prev, next) => prev + Number(next.expence),
    0
  );
  const year = from.substr(0, 4);
  const startMonth = Number(from.substr(5, 2));
  const stopMonth = Number(to.substr(5, 2));

  const generateMothRange = (from, to) => {
    const months = [];
    for (let i = from; i <= to; i++) {
      if (i < 10) {
        months.push("0" + i);
      } else {
        months.push(String(i));
      }
    }
    return months;
  };

  const months = generateMothRange(startMonth, stopMonth);

  return (
    <SC.Container>
      <SC.Title>
        {quarter}-й квартал {year}
      </SC.Title>
      {editable ? (
        <SC.TableHeader>
          <SC.EditorDateHeader>Дата</SC.EditorDateHeader>
          <SC.EditorMoneyHeader>Дохід</SC.EditorMoneyHeader>
          <SC.EditorMoneyHeader>Повернення</SC.EditorMoneyHeader>
          <SC.EditorCommentHeader>Опис</SC.EditorCommentHeader>
          <SC.EditorSubtotalHeader>На руки</SC.EditorSubtotalHeader>
          <SC.EditorTaxHeader>Податок</SC.EditorTaxHeader>
        </SC.TableHeader>
      ) : (
        <SC.TableHeader>
          <SC.DateHeader>Дата</SC.DateHeader>
          <SC.MoneyHeader>Дохід</SC.MoneyHeader>
          <SC.MoneyHeader>Повернення</SC.MoneyHeader>
          <SC.SubtotalHeader>Прибуток</SC.SubtotalHeader>
          <SC.TaxHeader>Податок, {taxPercent}%</SC.TaxHeader>
        </SC.TableHeader>
      )}
      {months.map((month) => {
        let monthIncome = 0;
        let monthExpence = 0;
        const list = payments.map((payment) => {
          if (payment.createdAt.substr(5, 2) !== month) return null;

          monthIncome += Number(payment.income);
          monthExpence += Number(payment.expence);

          return (
            <PaymentEditForm
              key={payment._id}
              editable={editable}
              payment={payment}
            />
          );
        });
        const monthInfo = (
          <SC.TableFooter key={`${year}-${month}`}>
            <SC.monthCommentTotal>
              Всього за {ukrMonths[month]} {from.substr(0, 4)}-го:
            </SC.monthCommentTotal>
            <SC.monthSubtotalTotal>
              {Math.round(
                (monthIncome - monthExpence) *
                  (editable ? 100 - taxPercent : 100)
              ) / 100}
            </SC.monthSubtotalTotal>
            <SC.monthTaxTotal>
              {Math.round((monthIncome - monthExpence) * taxPercent) / 100}
            </SC.monthTaxTotal>
          </SC.TableFooter>
        );

        return [...list.reverse(), monthInfo];
      })}
      <SC.TableFooter>
        <SC.CommentTotal>
          Разом за {quarter}-й квартал {year}-го:
        </SC.CommentTotal>
        {editable ? (
          <SC.SubtotalTotal>
            {Math.round((incomeSum - expenceSum) * (100 - taxPercent)) / 100}
          </SC.SubtotalTotal>
        ) : (
          <SC.SubtotalTotal>
            {Math.round((incomeSum - expenceSum) * 100) / 100}
          </SC.SubtotalTotal>
        )}
        <SC.TaxTotal>
          {Math.round((incomeSum - expenceSum) * taxPercent) / 100}
        </SC.TaxTotal>
      </SC.TableFooter>
      {quarter === 2 && (
        <SC.TableFooter key={`${year}-${quarter}`}>
          <SC.monthCommentTotal>Результат за півріччя, грн:</SC.monthCommentTotal>
          {editable ? (
            <SC.monthSubtotalTotal>
              {Math.round((result.income - result.expence) * (100 - taxPercent)) / 100}
            </SC.monthSubtotalTotal>
          ) : (
            <SC.monthSubtotalTotal>
              {Math.round((result.income - result.expence) * 100) / 100}
            </SC.monthSubtotalTotal>
          )}
          <SC.monthTaxTotal>
            {Math.round(result.tax * 100) / 100}
          </SC.monthTaxTotal>
        </SC.TableFooter>
      )}
      {quarter === 3 && (
        <SC.TableFooter key={`${year}-${quarter}`}>
          <SC.monthCommentTotal>
            Результат за 9 місяців, грн:
          </SC.monthCommentTotal>
          {editable ? (
            <SC.monthSubtotalTotal>
              {Math.round((result.income - result.expence) * (100 - taxPercent)) / 100}
            </SC.monthSubtotalTotal>
          ) : (
            <SC.monthSubtotalTotal>
              {Math.round((result.income - result.expence) * 100) / 100}
            </SC.monthSubtotalTotal>
          )}
          <SC.monthTaxTotal>
            {Math.round(result.tax * 100) / 100}
          </SC.monthTaxTotal>
        </SC.TableFooter>
      )}
      {quarter === 4 && (
        <SC.TableFooter key={`${year}-${quarter}`}>
          <SC.monthCommentTotal>Результат за рік, грн:</SC.monthCommentTotal>
          {editable ? (
            <SC.monthSubtotalTotal>
              {Math.round((result.income - result.expence) * (100 - taxPercent)) / 100}
            </SC.monthSubtotalTotal>
          ) : (
            <SC.monthSubtotalTotal>
              {Math.round((result.income - result.expence) * 100) / 100}
            </SC.monthSubtotalTotal>
          )}
          <SC.monthTaxTotal>
            {Math.round(result.tax * 100) / 100}
          </SC.monthTaxTotal>
        </SC.TableFooter>
      )}
    </SC.Container>
  );
};
