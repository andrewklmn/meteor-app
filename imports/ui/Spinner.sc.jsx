import styled from '@emotion/styled';
import * as LIB from './components';

export const Container = styled(LIB.FlexColumn)`
  width: 100%;
  min-height: 200px;
  justify-content: center;
  align-items: center;
  gap: 16px;
  color: #6c757d;
  font-size: 1rem;
`;

export const SpinnerRing = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid #e9ecef;
  border-top: 4px solid #315481;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const Label = styled.span`
  font-weight: 500;
`;
