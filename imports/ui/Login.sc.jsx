import styled from '@emotion/styled';
import * as LIB from './components';
import { colors, shadows, borderRadius, transitions, typography } from '../constants/theme';

export const Container = styled(LIB.FlexColumn)`
  width: 100%;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  padding: 24px 16px;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 400px;
  background-color: ${colors.cardBg};
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadows.lg};
  overflow: hidden;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const Header = styled(LIB.FlexColumn)`
  padding: 32px 24px 24px;
  background: linear-gradient(135deg, ${colors.primaryGradientStart}, ${colors.primaryGradientEnd});
  border-bottom: 1px solid ${colors.borderLight};
`;

export const Logo = styled.span`
  font-size: 3rem;
  margin-bottom: 8px;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: ${typography.h3};
  font-weight: 700;
  color: ${colors.textPrimary};
  text-align: center;
`;

export const Subtitle = styled.p`
  margin: 8px 0 0;
  font-size: ${typography.small};
  color: ${colors.textSecondary};
  text-align: center;
`;

export const Form = styled.form`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Field = styled(LIB.FlexColumn)`
  align-items: stretch;
  gap: 6px;
`;

export const Label = styled.label`
  font-size: ${typography.small};
  font-weight: 600;
  color: ${colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 1rem;
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

  &:disabled {
    background-color: ${colors.borderLight};
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${colors.textMuted};
  }
`;

export const PasswordWrapper = styled(LIB.FlexRow)`
  position: relative;
  align-items: stretch;
`;

export const ToggleButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  box-shadow: none;
  padding: 4px 8px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: ${transitions.fast};
  opacity: 0.7;

  &:hover {
    background: none;
    box-shadow: none;
    opacity: 1;
    transform: translateY(-50%) scale(1.1);
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
    box-shadow: none;
  }
`;

export const Alert = styled.div`
  padding: 12px 16px;
  background-color: ${colors.dangerBg};
  color: ${colors.danger};
  border-radius: ${borderRadius.md};
  font-weight: 500;
  font-size: ${typography.small};
  border-left: 4px solid ${colors.danger};
  animation: shake 0.4s ease;

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 14px;
  font-size: 1.05rem;
  font-weight: 600;
  background-color: ${colors.primary};
  margin-top: 8px;
  transition: ${transitions.normal};

  &:hover {
    background-color: ${colors.primaryHover};
  }
`;
