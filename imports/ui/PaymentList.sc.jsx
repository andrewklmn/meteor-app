import styled from '@emotion/styled'
import * as LIB from './components';

export const Container = styled.div`
  margin-bottom: 30px;
  width: 100%;
`;

export const Title = styled.h3`
  margin-top: 10px;
  margin-bottom: 0;
  text-align: center;
`;

export const TableHeader = styled(LIB.FlexRow)`
    justify-content: flex-start;
    margin: 10px 5px 0 5px;
    width: 100%;
    height: 36px;
`;

export const DateHeader = styled(LIB.FlexColumn)`
  width: 100px;
  height: 100%;
  color: white;
  background-color: gray;
`;

export const MoneyHeader = styled(DateHeader)`
  width: 80px;
  text-align: right;
`;

export const CommentHeader = styled(DateHeader)`
  width: calc(100% - 350px);
`;

export const TaxHeader = styled(DateHeader)`
  width: 80px;
`;
