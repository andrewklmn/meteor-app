// Design tokens for the application

export const colors = {
  // Primary
  primary: '#315481',
  primaryHover: '#3d6a9e',
  primaryLight: '#d2edf4',
  primaryGradientStart: '#d0edf5',
  primaryGradientEnd: '#e1e5f0',

  // Background
  bgGradientStart: '#315481',
  bgGradientEnd: '#918e82',
  cardBg: '#ffffff',
  cardBgHover: '#f8f9fa',

  // Text
  textPrimary: '#1a1a2e',
  textSecondary: '#4a4a68',
  textMuted: '#6c757d',
  textLink: '#000044',
  textLinkHover: '#0000bb',
  textOnPrimary: '#ffffff',

  // Semantic
  income: '#28a745',
  incomeBg: '#d4edda',
  incomeLight: '#e8f5e9',
  expense: '#dc3545',
  expenseBg: '#f8d7da',
  expenseLight: '#ffebee',
  warning: '#ffc107',
  warningBg: '#fff3cd',
  danger: '#dc3545',
  dangerBg: '#f8d7da',
  success: '#28a745',
  successBg: '#d4edda',

  // UI Elements
  border: '#dee2e6',
  borderLight: '#e9ecef',
  inputBg: '#f8f9fa',
  inputFocused: '#e8f0fe',
  headerBg: 'rgba(210, 237, 244, 0.95)',
  tableHeaderBg: '#6c757d',
  tableRowAlt: '#f8f9fa',
  tableRowHover: '#e8f0fe',
  dateBg: '#fff9c4',
  commentBg: '#c5cae9',

  // Shadow
  shadowColor: 'rgba(34, 25, 25, 0.15)',
  shadowStrong: 'rgba(34, 25, 25, 0.3)',
};

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
};

export const typography = {
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  h1: '1.75rem',
  h2: '1.5rem',
  h3: '1.25rem',
  body: '1rem',
  small: '0.875rem',
  xsmall: '0.75rem',
};

export const shadows = {
  sm: `0 1px 3px ${colors.shadowColor}`,
  md: `0 3px 6px ${colors.shadowColor}`,
  lg: `0 6px 12px ${colors.shadowStrong}`,
};

export const borderRadius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
};

export const transitions = {
  fast: '150ms ease',
  normal: '200ms ease',
  slow: '300ms ease',
};

export const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
};

export const maxWidth = '800px';
