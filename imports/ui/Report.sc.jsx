import styled from '@emotion/styled';
import * as LIB from './components';
import { colors, shadows, borderRadius, transitions, typography } from '../constants/theme';

export const Container = styled(LIB.FlexColumn)`
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
  background-color: white;
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadows.md};
  overflow: visible;
`;

export const ClientSelector = styled.div`
  width: 100%;
`;

export const SelectHeader = styled(LIB.FlexRow)`
  padding: 16px 20px;
  background: linear-gradient(135deg, ${colors.primaryGradientStart}, ${colors.primaryGradientEnd});
  border-bottom: 1px solid ${colors.borderLight};
  gap: 12px;
  align-items: center;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
`;

export const Label = styled.label`
  font-size: ${typography.small};
  font-weight: 700;
  color: ${colors.textPrimary};
  white-space: nowrap;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const Select = styled.select`
  flex: 1;
  padding: 10px 12px;
  font-size: ${typography.body};
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.md};
  background-color: ${colors.cardBg};
  color: ${colors.textPrimary};
  transition: ${transitions.normal};
  cursor: pointer;
  min-width: 0;

  &:focus {
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px rgba(49, 84, 129, 0.15);
    outline: none;
  }

  &:hover {
    border-color: ${colors.primary};
  }
`;

export const SelectedClient = styled.div`
  padding: 12px 20px;
  background-color: ${colors.cardBg};
  border-bottom: 1px solid ${colors.borderLight};
`;

export const ClientBadge = styled(LIB.FlexRow)`
  padding: 8px 16px;
  background-color: ${colors.incomeBg};
  border-radius: ${borderRadius.md};
  gap: 8px;
  align-items: center;
  font-weight: 600;
  color: ${colors.textPrimary};
  font-size: ${typography.small};
`;

export const ClientIcon = styled.span`
  font-size: 1.2rem;
`;

export const Requisits = styled(LIB.FlexColumn)`
  width: 100%;
  padding: 16px 20px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  font-size: ${typography.small};
  font-weight: 600;
  background-color: ${colors.primary};
  transition: ${transitions.normal};
  white-space: nowrap;

  &:hover {
    background-color: ${colors.primaryHover};
  }
`;
