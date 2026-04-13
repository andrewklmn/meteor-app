import React from "react";
import styled from '@emotion/styled';
import { colors, borderRadius, shadows, typography } from '../../constants/theme';

const MobileCard = styled.div`
  display: none;
  padding: 12px 16px;
  border-top: 1px solid ${colors.borderLight};
  background-color: ${(props) => (props.alternate ? colors.tableRowAlt : colors.cardBg)};

  &:hover {
    background-color: ${colors.tableRowHover};
  }

  @media (max-width: 600px) {
    display: block;
  }
`;

const MobileRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
  font-size: ${typography.small};

  & + & {
    border-top: 1px dashed ${colors.borderLight};
  }
`;

const MobileLabel = styled.span`
  font-weight: 600;
  color: #6c757d;
  text-transform: uppercase;
  font-size: ${typography.xsmall};
  letter-spacing: 0.3px;
`;

const MobileValue = styled.span`
  font-weight: ${(props) => (props.bold ? '700' : '400')};
  color: ${(props) => {
    if (props.income) return colors.income;
    if (props.expense) return colors.expense;
    return colors.textPrimary;
  }};
  text-align: right;
`;

export const PaymentMobileCard = ({ payment, editable }) => {
  const formatCurrency = (value) => {
    return Number(value).toLocaleString("uk-UA", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const subtotal = editable
    ? (Number(payment.income) - Number(payment.expence)) * (100 - 3) / 100
    : Number(payment.income) - Number(payment.expence);

  return (
    <MobileCard>
      <MobileRow>
        <MobileLabel>Дата</MobileLabel>
        <MobileValue>{payment.createdAt}</MobileValue>
      </MobileRow>
      <MobileRow>
        <MobileLabel>Дохід</MobileLabel>
        <MobileValue income>{formatCurrency(payment.income)}</MobileValue>
      </MobileRow>
      <MobileRow>
        <MobileLabel>Повернення</MobileLabel>
        <MobileValue expense>{formatCurrency(payment.expence)}</MobileValue>
      </MobileRow>
      {editable && (
        <MobileRow>
          <MobileLabel>Опис</MobileLabel>
          <MobileValue>{payment.comment}</MobileValue>
        </MobileRow>
      )}
      <MobileRow>
        <MobileLabel>На руки</MobileLabel>
        <MobileValue bold>{formatCurrency(subtotal)}</MobileValue>
      </MobileRow>
    </MobileCard>
  );
};

export const MobileTableHeader = styled.div`
  display: none;

  @media (max-width: 600px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background-color: ${colors.tableHeaderBg};
    color: white;
    font-weight: 700;
    font-size: ${typography.xsmall};
    text-transform: uppercase;
  }
`;

export const TableWrapper = styled.div`
  /* Desktop: show table, hide cards */
  @media (max-width: 600px) {
    display: none;
  }
`;

export const MobileTableWrapper = styled.div`
  /* Mobile: show cards, hide table */
  display: none;

  @media (max-width: 600px) {
    display: block;
  }
`;
