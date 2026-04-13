import styled from '@emotion/styled';
import * as LIB from './components';
import { colors, shadows, borderRadius, transitions, typography } from '../constants/theme';

export const Container = styled.div`
  margin-bottom: 16px;
  width: 100%;
`;

export const Card = styled.div`
  background-color: ${colors.cardBg};
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadows.md};
  overflow: hidden;
`;

export const CardTitle = styled.h3`
  margin: 0;
  padding: 16px 20px;
  font-size: ${typography.h3};
  font-weight: 700;
  color: ${colors.textPrimary};
  background: linear-gradient(135deg, ${colors.primaryGradientStart}, ${colors.primaryGradientEnd});
  border-bottom: 1px solid ${colors.borderLight};
`;

export const Form = styled.form`
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FieldGroup = styled(LIB.FlexRow)`
  flex-wrap: wrap;
  gap: 12px;
  align-items: flex-end;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const Field = styled(LIB.FlexColumn)`
  flex: 1;
  min-width: 120px;
  align-items: stretch;
  gap: 4px;

  &.comment-field {
    flex: 2;
    min-width: 200px;
  }

  @media (max-width: 600px) {
    min-width: 100%;
  }
`;

export const Label = styled.label`
  font-size: ${typography.xsmall};
  font-weight: 600;
  color: ${colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  font-size: 0.95rem;
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.md};
  background-color: ${colors.inputBg};
  transition: ${transitions.normal};

  &:focus {
    border-color: ${colors.primary};
    background-color: ${colors.cardBg};
    box-shadow: 0 0 0 3px rgba(49, 84, 129, 0.15);
    outline: none;
  }

  &::placeholder {
    color: ${colors.textMuted};
  }
`;

export const Button = styled.button`
  align-self: flex-end;
  padding: 10px 24px;
  font-size: 0.95rem;
  font-weight: 600;
  background-color: ${colors.primary};
  transition: ${transitions.normal};

  &:hover {
    background-color: ${colors.primaryHover};
  }

  @media (max-width: 600px) {
    align-self: stretch;
  }
`;

export const Error = styled.div`
  padding: 10px 20px;
  background-color: ${colors.dangerBg};
  color: ${colors.danger};
  font-weight: 500;
  font-size: ${typography.small};
  border-top: 1px solid ${colors.borderLight};
  text-align: center;
`;
