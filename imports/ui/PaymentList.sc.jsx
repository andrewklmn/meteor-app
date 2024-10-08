import styled from '@emotion/styled'
import * as LIB from './components';

export const Container = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

export const Title = styled.h3`
  margin-top: 15px;
  margin-bottom: 0;
  text-align: center;
`;

export const TableHeader = styled(LIB.FlexRow)`
    justify-content: flex-start;
    margin: 0;
    width: 100%;
    height: 36px;
`;

export const DateHeader = styled(LIB.FlexColumn)`
  width: 20%;
  height: 100%;

  font-weight: 700;
  color: white;
  background-color: gray;
  overflow-wrap: anywhere;
`;

export const MoneyHeader = styled(DateHeader)`
  width: 20%;
  align-items: center;
`;

export const CommentHeader = styled(DateHeader)`
  width: 15%;
  align-items: center;
`;

export const SubtotalHeader = styled(DateHeader)`
  width: 15%;
  align-items: flex-end;
`;

export const TaxHeader = styled(DateHeader)`
  width: 12.5%;
  align-items: center;
`;

export const EditorDateHeader = styled(LIB.FlexColumn)`
  width: 20%;
  height: 100%;

  font-weight: 700;
  color: white;
  background-color: gray;
  overflow-wrap: anywhere;
`;

export const EditorMoneyHeader = styled(EditorDateHeader)`
  width: 15%;
  align-items: center;
`;

export const EditorCommentHeader = styled(EditorDateHeader)`
  width: 12.5%;
  align-items: center;
`;

export const EditorSubtotalHeader = styled(EditorDateHeader)`
  width: 12.5%;
  align-items: center;
`;

export const EditorTaxHeader = styled(EditorDateHeader)`
  max-width: 12.5%;
  align-items: center;
`;


export const TableFooter = styled(LIB.FlexRow)`
    justify-content: flex-start;
    margin: 0;
    height: 36px;
    border-top: 1px solid #aaa;
`;

export const DateTotal = styled(DateHeader)`
  color: black;
  background-color: white;
`;

export const MoneyTotal = styled(DateTotal)`
  width: 20%;
  align-items: flex-end;
`;

export const CommentTotal = styled(DateTotal)`
  padding-left: 20px;
  width: 60%;
  align-items: flex-start;
`;

export const SubtotalTotal = styled(DateTotal)`
  width: 15%;
  align-items: flex-end;
`;

export const TaxTotal = styled(DateTotal)`
  width: 12.5%;
  align-items: center;
`;

export const monthCommentTotal = styled(DateTotal)`
  padding-left: 20px;
  width: calc(60% - 20px);
  align-items: flex-start;
  font-weight: normal;
`;

export const monthSubtotalTotal = styled(DateTotal)`
  width: 15%;
  align-items: flex-end;
  font-weight: normal;
`;

export const monthTaxTotal = styled(DateTotal)`
  width: 12.5%;
  align-items: center;
  font-weight: normal;
`;