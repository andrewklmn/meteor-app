import styled from '@emotion/styled'
import * as LIB from './components';

export const Form = styled.form`
  display: flex;
  flex-direction: row;
  margin: 0;
  width: 100%;
  height: 32px;
  overflow-x: hidden;

  & > input {
    box-sizing: border-box;
    padding: 5px 10px;
    border: none;
    border-top: 1px solid #aaa;
    border-right: 1px solid #aaa;
    font-size: 1em;
  }

  & > input.tax {
    border-right: none;
  }

  & > button {
    min-width: 120px;
    height: 100%;
    background-color: #315481;
  }
`;
