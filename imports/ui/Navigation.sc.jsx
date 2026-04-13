import styled from '@emotion/styled';
import * as LIB from './components';
import { colors, shadows, borderRadius, transitions, typography } from '../constants/theme';

export const Container = styled(LIB.FlexRow)`
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 32px);
  max-width: 800px;
  background: ${colors.headerBg};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  background-image: linear-gradient(to bottom, ${colors.primaryGradientStart}, ${colors.primaryGradientEnd});
  padding: 16px 20px;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: ${shadows.md};
  border-radius: 0 0 ${borderRadius.md} ${borderRadius.md};
  margin-bottom: 16px;
`;

export const Title = styled.h3`
  margin: 0;
  font-size: ${typography.h3};
  font-weight: 700;
  color: ${colors.textPrimary};
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const UserIcon = styled.span`
  font-size: 1.3rem;
`;

export const Menu = styled(LIB.FlexRow)`
  gap: 8px;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    gap: 4px;
  }
`;

export const MenuItem = styled(LIB.FlexColumn, { shouldForwardProp: (prop) => prop !== 'active' })`
  padding: 6px 12px;
  border-radius: ${borderRadius.sm};
  background-color: ${(props) => (props.active ? 'rgba(49, 84, 129, 0.1)' : 'transparent')};
  transition: ${transitions.fast};

  & a {
    font-size: 0.95rem;
    font-weight: ${(props) => (props.active ? '700' : '500')};
    text-decoration: none;
    color: ${(props) => (props.active ? colors.primary : colors.textLink)};
    cursor: pointer;
    white-space: nowrap;
  }

  & a:hover {
    color: ${colors.textLinkHover};
    text-decoration: none;
  }

  & a.logout-link {
    color: ${colors.expense};
  }

  & a.logout-link:hover {
    color: ${colors.danger};
  }

  @media (max-width: 600px) {
    padding: 4px 8px;

    & a {
      font-size: 0.85rem;
    }
  }
`;
