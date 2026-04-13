import styled from '@emotion/styled';
import * as LIB from './components';
import { colors, shadows, borderRadius, typography } from '../constants/theme';

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
  text-align: center;
  padding: 40px 24px;
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

export const Icon = styled.span`
  font-size: 4rem;
  display: block;
  margin-bottom: 16px;
  animation: wave 1s ease-in-out infinite;

  @keyframes wave {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(-10deg); }
    75% { transform: rotate(10deg); }
  }
`;

export const Title = styled.h2`
  margin: 0 0 8px;
  font-size: ${typography.h3};
  font-weight: 700;
  color: ${colors.textPrimary};
`;

export const Subtitle = styled.p`
  margin: 0 0 24px;
  font-size: ${typography.small};
  color: ${colors.textSecondary};
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
