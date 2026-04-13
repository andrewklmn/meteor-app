import styled from "@emotion/styled";
import * as LIB from "./components";
import {
  colors,
  shadows,
  borderRadius,
  transitions,
  typography,
} from "../constants/theme";

// Grid template for editable mode: date(16%) income(14%) expence(14%) comment(20%) subtotal(14%) tax(11%) tax(11%)
const editableGrid = "16% 14% 14% 20% 14% 11% 11%";
// Grid template for read-only mode: date(20%) income(20%) expence(20%) comment(15%) tax(12.5%) tax(12.5%)
const readOnlyGrid = "20% 20% 20% 15% 12.5% 12.5%";

export const Container = styled.div`
  margin-bottom: 20px;
  width: 100%;
  overflow-x: auto;
`;

export const Title = styled.h3`
  margin: 16px 0 0;
  padding: 12px 16px;
  text-align: center;
  font-size: ${typography.h3};
  font-weight: 700;
  color: ${colors.textPrimary};
  background-color: ${colors.cardBg};
  border-bottom: 2px solid ${colors.borderLight};
`;

export const TableHeader = styled(LIB.FlexRow)`
  position: sticky;
  top: 0;
  z-index: 10;
  justify-content: flex-start;
  margin: 0;
  width: 100%;
  min-height: 40px;
  box-shadow: ${shadows.sm};
`;

const baseHeaderCell = `
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 4px;
  font-weight: 700;
  font-size: ${typography.xsmall};
  color: ${colors.textOnPrimary};
  background-color: ${colors.tableHeaderBg};
  text-transform: uppercase;
  letter-spacing: 0.3px;
  min-height: 40px;
  overflow: hidden;
`;

export const HeaderCell = styled.div`
  ${baseHeaderCell}

  ${(props) => {
    if (props.date) return `width: 16%; justify-content: center;`;
    if (props.money && props.income)
      return `width: 14%; justify-content: flex-end;`;
    if (props.money && props.expence)
      return `width: 14%; justify-content: flex-end;`;
    if (props.money) return `width: 12%; justify-content: flex-end;`;
    if (props.comment) return `width: 18%; justify-content: center;`;
    if (props.tax) return `width: 13%; justify-content: flex-end;`;
    return `flex: 1;`;
  }}
`;

export const DateHeader = styled(HeaderCell)`
  width: 20%;
  justify-content: center;
`;

export const MoneyHeader = styled(DateHeader)`
  width: 20%;
`;

export const CommentHeader = styled(DateHeader)`
  width: 15%;
`;

export const SubtotalHeader = styled(DateHeader)`
  width: 15%;
  justify-content: flex-end;
`;

export const TaxHeader = styled(DateHeader)`
  width: 12.5%;
`;

export const EditorDateHeader = styled(HeaderCell)`
  width: 20%;
  justify-content: center;
`;

export const EditorMoneyHeader = styled(EditorDateHeader)`
  width: 15%;
`;

export const EditorCommentHeader = styled(EditorDateHeader)`
  width: 12.5%;
`;

export const EditorSubtotalHeader = styled(EditorDateHeader)`
  width: 12.5%;
`;

export const EditorTaxHeader = styled(EditorDateHeader)`
  max-width: 12.5%;
`;

export const TableFooter = styled(LIB.FlexRow)`
  justify-content: flex-start;
  margin: 0;
  min-height: 36px;
  border-top: 1px solid ${colors.borderLight};
  background-color: ${colors.tableRowAlt};

  &:nth-of-type(even) {
    background-color: ${colors.cardBg};
  }
`;

const baseFooterCell = `
  display: flex;
  align-items: center;
  padding: 8px 4px;
  font-size: ${typography.small};
  color: ${colors.textPrimary};
  background-color: transparent;
  min-height: 36px;
  overflow: hidden;
`;

export const FooterCell = styled.div`
  ${baseFooterCell}

  ${(props) => {
    if (props.comment)
      return `width: 68%; padding-left: 8px; font-weight: 500; justify-content: flex-start;`;
    if (props.money && props.subtotal)
      return `width: 12%; justify-content: flex-end; font-weight: 700;`;
    if (props.money) return `width: 12%; justify-content: flex-end;`;
    if (props.tax)
      return `width: 13%; justify-content: flex-end; font-weight: 600;`;
    return `flex: 1;`;
  }}
`;

export const DateTotal = styled.div`
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  font-size: ${typography.small};
  color: ${colors.textPrimary};
  background-color: transparent;
`;

export const MoneyTotal = styled(DateTotal)`
  width: 20%;
  justify-content: flex-end;
`;

export const CommentTotal = styled(DateTotal)`
  width: 60%;
  padding-left: 20px;
  justify-content: flex-start;
  font-weight: 500;
`;

export const SubtotalTotal = styled(DateTotal)`
  width: 15%;
  justify-content: flex-end;
  font-weight: 700;
`;

export const TaxTotal = styled(DateTotal)`
  width: 12.5%;
  justify-content: center;
  font-weight: 600;
`;

export const monthCommentTotal = styled(CommentTotal)`
  width: calc(64% - 16px);
  font-weight: normal;
`;

export const monthSubtotalTotal = styled(SubtotalTotal)`
  width: 14%;
  font-weight: normal;
`;

export const monthTaxTotal = styled(TaxTotal)`
  width: 11%;
  font-weight: normal;
`;
