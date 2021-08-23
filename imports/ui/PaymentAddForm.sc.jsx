import styled from '@emotion/styled'
import * as LIB from './components';

export const Container = styled.div`
  margin-bottom: 10px;
  width: 100%;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: row;
  margin: 0;
  width: 100%;
  height: 42px;

  & > input {
    box-sizing: border-box;
    padding: 5px 10px;
    border: none;
    border-bottom: 1px solid #aaa;
    font-size: 1em;
  }

  & > button {
    min-width: 120px;
    height: 100%;
    background-color: #315481;
  }

`;

export const Button = styled.button`
  width: 20% !important;
`;
