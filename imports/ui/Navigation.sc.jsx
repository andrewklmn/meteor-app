import styled from '@emotion/styled'
import * as LIB from './components';

export const Container = styled(LIB.FlexRow)`
  justify-content: space-between;
  align-items: center; 
  width: calc(100% - 30px);
  max-width: 770px;
  background: #d2edf4;
  background-image: linear-gradient(to bottom, #d0edf5, #e1e5f0 100%);
  padding: 20px 15px 15px 15px;
  position: relative;
  box-shadow: 0 3px 3px rgba(34, 25, 25, 0.4);
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 1.5em;
  color: #000044;
`;

export const Menu = styled(LIB.FlexRow)`

`;

export const MenuItem = styled(LIB.FlexColumn)`
  margin-left: 30px;
  & a {
    font-size: 1.2em;
    text-decoration: none;
    color: #000044;
    cursor: pointer;
  }
  & a:hover {
    color: #0000BB;
    text-decoration: underline;
  }
`;