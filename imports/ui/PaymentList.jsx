import React, { useEffect, useState } from "react";
import { PaymentEditForm } from "./PaymentEditForm";
import {
  getWarTaxPercent,
  taxPercent,
  warTaxPercent,
} from "../constants/taxes";
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

  const taxSum = payments.reduce(
    (prev, next) =>
      prev + ((Number(next.income) - Number(next.expence)) * taxPercent) / 100,
    0
  );

  const warTaxSum = payments.reduce(
    (prev, next) =>
      prev +
      ((Number(next.income) - Number(next.expence)) *
        getWarTaxPercent(next.createdAt.substr(0, 10))) /
        100,
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
          <SC.EditorTaxHeader>ЄП, {taxPercent}%</SC.EditorTaxHeader>
          <SC.EditorTaxHeader>ВЗ, {warTaxPercent}%</SC.EditorTaxHeader>
        </SC.TableHeader>
      ) : (
        <SC.TableHeader>
          <SC.DateHeader>Дата</SC.DateHeader>
          <SC.MoneyHeader>Дохід</SC.MoneyHeader>
          <SC.MoneyHeader>Повернення</SC.MoneyHeader>
          <SC.SubtotalHeader>Прибуток</SC.SubtotalHeader>
          <SC.TaxHeader>ЄП, {taxPercent}%</SC.TaxHeader>
          <SC.EditorTaxHeader>ВЗ, {warTaxPercent}%</SC.EditorTaxHeader>
        </SC.TableHeader>
      )}
      {months.map((month) => {
        let monthIncome = 0;
        let monthExpence = 0;
        let monthTax = 0;
        let monthWarTax = 0;
        const list = payments.map((payment) => {
          if (payment.createdAt.substr(5, 2) !== month) return null;

          const income = Number(payment.income);
          const expence = Number(payment.expence);

          monthIncome += income;
          monthExpence += expence;
          monthTax += Math.round((income - expence) * taxPercent) / 100;
          monthWarTax +=
            Math.round(
              (income - expence) *
                getWarTaxPercent(payment.createdAt.substr(0, 10))
            ) / 100;

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
                (editable
                  ? monthIncome - monthExpence - monthTax - monthWarTax
                  : monthIncome - monthExpence) * 100
              ) / 100}
            </SC.monthSubtotalTotal>
            <SC.monthTaxTotal>
              {Math.round(monthTax * 100) / 100}
            </SC.monthTaxTotal>
            <SC.monthTaxTotal>
              {Math.round(monthWarTax * 100) / 100}
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
            {Math.round((incomeSum - expenceSum - taxSum - warTaxSum) * 100) /
              100}
          </SC.SubtotalTotal>
        ) : (
          <SC.SubtotalTotal>
            {Math.round((incomeSum - expenceSum) * 100) / 100}
          </SC.SubtotalTotal>
        )}
        <SC.TaxTotal>{Math.round(taxSum * 100) / 100}</SC.TaxTotal>
        <SC.TaxTotal>{Math.round(warTaxSum * 100) / 100}</SC.TaxTotal>
      </SC.TableFooter>
      {quarter === 2 && (
        <SC.TableFooter key={`${year}-${quarter}`}>
          <SC.monthCommentTotal>
            Результат за півріччя, грн:
          </SC.monthCommentTotal>
          {editable ? (
            <SC.monthSubtotalTotal>
              {Math.round(
                (result.income - result.expence - result.tax - result.warTax) * 100
              ) / 100}
            </SC.monthSubtotalTotal>
          ) : (
            <SC.monthSubtotalTotal>
              {Math.round((result.income - result.expence) * 100) / 100}
            </SC.monthSubtotalTotal>
          )}
          <SC.monthTaxTotal>
            {Math.round(result.tax * 100) / 100}
          </SC.monthTaxTotal>
          <SC.monthTaxTotal>
            {Math.round(result.warTax * 100) / 100}
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
              {Math.round(
                (result.income - result.expence - result.tax - result.warTax) * 100
              ) / 100}
            </SC.monthSubtotalTotal>
          ) : (
            <SC.monthSubtotalTotal>
              {Math.round((result.income - result.expence) * 100) / 100}
            </SC.monthSubtotalTotal>
          )}
          <SC.monthTaxTotal>
            {Math.round(result.tax * 100) / 100}
          </SC.monthTaxTotal>
          <SC.monthTaxTotal>
            {Math.round(result.warTax * 100) / 100}
          </SC.monthTaxTotal>
        </SC.TableFooter>
      )}
      {quarter === 4 && (
        <SC.TableFooter key={`${year}-${quarter}`}>
          <SC.monthCommentTotal>Результат за рік, грн:</SC.monthCommentTotal>
          {editable ? (
            <SC.monthSubtotalTotal>
              {Math.round(
                (result.income - result.expence - result.tax - result.warTax) * 100
              ) / 100}
            </SC.monthSubtotalTotal>
          ) : (
            <SC.monthSubtotalTotal>
              {Math.round((result.income - result.expence) * 100) / 100}
            </SC.monthSubtotalTotal>
          )}
          <SC.monthTaxTotal>
            {Math.round(result.tax * 100) / 100}
          </SC.monthTaxTotal>
          <SC.monthTaxTotal>
            {Math.round(result.warTax * 100) / 100}
          </SC.monthTaxTotal>
        </SC.TableFooter>
      )}
    </SC.Container>
  );
};
