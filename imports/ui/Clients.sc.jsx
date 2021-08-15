import styled from '@emotion/styled'
import * as LIB from './components';

export const Container = styled(LIB.FlexColumn)`
  justify-content: flex-start;
  align-items: center; 
  width: 100%;
  height: 100%;
  background-color: white;

  & button {
    min-width: 120px;
    height: 100%;
    background-color: #315481;
  }
`;

export const Select = styled.select`
  margin-top: 0;
  padding-left: 15px;
  width: calc(100% - 150px);
  height: 42px;
  font-size: 1.2em;
  border: none;
  border-left: solid 1px gray;
  border-right: solid 1px gray;
  border-bottom: solid 1px gray;
`;

export const ClientSelector = styled(LIB.FlexRow)`
  justify-content: space-between;
  width: 100%;
  & button {
    width: 150px;
    height: 100%;
    background-color: gray;
  }
`;

export const Label = styled(LIB.FlexColumn)`
  width: 150px;
  height: 100%;
  color: white;
  font-weight: bold;
  background-color: gray;
`;
