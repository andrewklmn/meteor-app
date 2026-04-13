import React from "react";
import { PaymentEditForm } from "./PaymentEditForm";
import {
  getWarTaxPercent,
  taxPercent,
  warTaxPercent,
} from "../constants/taxes";
import * as SC from "./PaymentList.sc";
import { ukrMonths } from "../constants/ukrMonths";

const formatCurrency = (value) => {
  return Number(value).toLocaleString("uk-UA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

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
    0,
  );
  const expenceSum = payments.reduce(
    (prev, next) => prev + Number(next.expence),
    0,
  );

  const taxSum = payments.reduce(
    (prev, next) =>
      prev + ((Number(next.income) - Number(next.expence)) * taxPercent) / 100,
    0,
  );

  const warTaxSum = payments.reduce(
    (prev, next) =>
      prev +
      ((Number(next.income) - Number(next.expence)) *
        getWarTaxPercent(next.createdAt.substr(0, 10))) /
        100,
    0,
  );

  const year = from.substr(0, 4);
  const startMonth = Number(from.substr(5, 2));
  const stopMonth = Number(to.substr(5, 2));

  const generateMonthRange = (from, to) => {
    const months = [];
    for (let i = from; i <= to; i++) {
      months.push(i < 10 ? "0" + i : String(i));
    }
    return months;
  };

  const months = generateMonthRange(startMonth, stopMonth);

  return (
    <SC.Container>
      <SC.Title>
        {quarter}-й квартал {year}
      </SC.Title>

      {editable ? (
        <SC.TableHeader>
          <SC.HeaderCell date>Дата</SC.HeaderCell>
          <SC.HeaderCell money income>
            Дохід
          </SC.HeaderCell>
          <SC.HeaderCell money expence>
            Повернення
          </SC.HeaderCell>
          <SC.HeaderCell comment>Опис</SC.HeaderCell>
          <SC.HeaderCell money>На руки</SC.HeaderCell>
          <SC.HeaderCell tax>ЄП, {taxPercent}%</SC.HeaderCell>
          <SC.HeaderCell tax>ВЗ, {warTaxPercent}%</SC.HeaderCell>
        </SC.TableHeader>
      ) : (
        <SC.TableHeader>
          <SC.HeaderCell date>Дата</SC.HeaderCell>
          <SC.HeaderCell money>Дохід</SC.HeaderCell>
          <SC.HeaderCell money>Повернення</SC.HeaderCell>
          <SC.HeaderCell comment>Прибуток</SC.HeaderCell>
          <SC.HeaderCell tax>ЄП, {taxPercent}%</SC.HeaderCell>
          <SC.HeaderCell tax>ВЗ, {warTaxPercent}%</SC.HeaderCell>
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
                getWarTaxPercent(payment.createdAt.substr(0, 10)),
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
            <SC.FooterCell comment>
              Всього за {ukrMonths[month]} {year}:
            </SC.FooterCell>
            <SC.FooterCell money subtotal>
              {formatCurrency(
                editable
                  ? monthIncome - monthExpence - monthTax - monthWarTax
                  : monthIncome - monthExpence,
              )}
            </SC.FooterCell>
            <SC.FooterCell tax>{formatCurrency(monthTax)}</SC.FooterCell>
            <SC.FooterCell tax>{formatCurrency(monthWarTax)}</SC.FooterCell>
          </SC.TableFooter>
        );

        return [...list.reverse(), monthInfo];
      })}

      <SC.TableFooter>
        <SC.FooterCell comment>
          Разом за {quarter}-й квартал {year}:
        </SC.FooterCell>
        <SC.FooterCell money subtotal>
          {formatCurrency(
            editable
              ? incomeSum - expenceSum - taxSum - warTaxSum
              : incomeSum - expenceSum,
          )}
        </SC.FooterCell>
        <SC.FooterCell tax>{formatCurrency(taxSum)}</SC.FooterCell>
        <SC.FooterCell tax>{formatCurrency(warTaxSum)}</SC.FooterCell>
      </SC.TableFooter>

      <SC.TableFooter>
        <SC.FooterCell comment>Податків за {quarter}-й квартал:</SC.FooterCell>
        <SC.FooterCell money></SC.FooterCell>
        <SC.FooterCell tax>
          {(
            Math.round(taxSum * 100) / 100 +
            Math.round(warTaxSum * 100) / 100
          ).toFixed(2)}
        </SC.FooterCell>
        <SC.FooterCell tax></SC.FooterCell>
      </SC.TableFooter>

      {quarter === 2 && (
        <SC.TableFooter key={`${year}-${quarter}-half`}>
          <SC.FooterCell comment>Результат за півріччя, грн:</SC.FooterCell>
          <SC.FooterCell money subtotal>
            {formatCurrency(
              editable
                ? result.income - result.expence - result.tax - result.warTax
                : result.income - result.expence,
            )}
          </SC.FooterCell>
          <SC.FooterCell tax>{formatCurrency(result.tax)}</SC.FooterCell>
          <SC.FooterCell tax>{formatCurrency(result.warTax)}</SC.FooterCell>
        </SC.TableFooter>
      )}

      {quarter === 3 && (
        <SC.TableFooter key={`${year}-${quarter}-9m`}>
          <SC.FooterCell comment>Результат за 9 місяців, грн:</SC.FooterCell>
          <SC.FooterCell money subtotal>
            {formatCurrency(
              editable
                ? result.income - result.expence - result.tax - result.warTax
                : result.income - result.expence,
            )}
          </SC.FooterCell>
          <SC.FooterCell tax>{formatCurrency(result.tax)}</SC.FooterCell>
          <SC.FooterCell tax>{formatCurrency(result.warTax)}</SC.FooterCell>
        </SC.TableFooter>
      )}

      {quarter === 4 && (
        <SC.TableFooter key={`${year}-${quarter}-year`}>
          <SC.FooterCell comment>Результат за рік, грн:</SC.FooterCell>
          <SC.FooterCell money subtotal>
            {formatCurrency(
              editable
                ? result.income - result.expence - result.tax - result.warTax
                : result.income - result.expence,
            )}
          </SC.FooterCell>
          <SC.FooterCell tax>{formatCurrency(result.tax)}</SC.FooterCell>
          <SC.FooterCell tax>{formatCurrency(result.warTax)}</SC.FooterCell>
        </SC.TableFooter>
      )}
    </SC.Container>
  );
};
