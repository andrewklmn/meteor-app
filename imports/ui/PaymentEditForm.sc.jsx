import styled from '@emotion/styled';
import * as LIB from './components';
import { colors, transitions, typography } from '../constants/theme';

export const Form = styled.form`
  display: flex;
  flex-direction: row;
  margin: 0;
  width: 100%;
  min-height: 36px;
  border-top: 1px solid ${colors.borderLight};
  transition: background-color ${transitions.fast};

  &:hover {
    background-color: ${colors.tableRowHover};
  }

  &:last-child {
    border-bottom: 1px solid ${colors.borderLight};
  }
`;

export const InputCell = styled.div`
  display: flex;
  align-items: stretch;
  box-sizing: border-box;

  ${(props) => {
    if (props.date) return 'width: 16%;';
    if (props.money && props.income) return 'width: 14%;';
    if (props.money && props.expence) return 'width: 14%;';
    if (props.money) return 'width: 14%;';
    if (props.comment) return 'width: 20%;';
    if (props.tax) return 'width: 11%;';
    if (props.readonly) return 'flex: 1;';
    return 'flex: 1;';
  }}

  & > input {
    box-sizing: border-box;
    width: 100%;
    padding: 6px 4px;
    border: none;
    border-right: 1px solid ${colors.borderLight};
    font-size: ${typography.small};
    text-align: ${(props) => (props.money ? 'right' : 'center')};
    background-color: transparent;
    transition: background-color ${transitions.fast};

    &:focus {
      background-color: ${colors.inputFocused};
      outline: none;
      border: 1px solid ${colors.primary};
    }

    &.disabled {
      border: none;
      background-color: transparent;
    }
  }
`;

export const Error = styled.div`
  padding: 6px 12px;
  background-color: ${colors.dangerBg};
  color: ${colors.danger};
  font-weight: 500;
  font-size: ${typography.xsmall};
  border-top: 1px solid ${colors.borderLight};
  text-align: center;
`;
