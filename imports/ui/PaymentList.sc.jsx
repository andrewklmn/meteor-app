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
    margin: 5px 5px 0 5px;
    width: 100%;
    height: 36px;
`;

export const DateHeader = styled(LIB.FlexColumn)`
  width: 20%;
  height: 100%;

  font-weight: 700;

  color: white;
  background-color: gray;
`;

export const MoneyHeader = styled(DateHeader)`
  width: 20%;
  align-items: flex-end;
`;

export const CommentHeader = styled(DateHeader)`
  width: 20%;
  align-items: center;
`;

export const SubtotalHeader = styled(DateHeader)`
  width: 20%;
  align-items: flex-end;
`;

export const TaxHeader = styled(DateHeader)`
  width: 20%;
  align-items: center;
`;

export const TableFooter = styled(LIB.FlexRow)`
    justify-content: flex-start;
    margin: 0 5px 0 5px;
    width: 100%;
    height: 36px;
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
  width: 20%;
  align-items: flex-end;
`;

export const SubtotalTotal = styled(DateTotal)`
  width: 20%;
  align-items: flex-end;
`;

export const TaxTotal = styled(DateTotal)`
  width: calc(20% + 10px);
  align-items: center;
`;
