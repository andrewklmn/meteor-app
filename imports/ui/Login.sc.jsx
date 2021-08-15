import styled from '@emotion/styled'
import * as LIB from './components';

export const Container = styled(LIB.FlexColumn)`
    width: 100%;
    height: 100vh;
    font-size: 1.2em;
    color: white;
    
    & input {
        width: 180px;
        font-size: 1em;
    }

    & button {
        color: #555;
    }
`;

export const Form = styled.form`
    padding: 20px;
    width: 270px;
    color: black;
    background-color: white;
    border-radius: 15px;
`;

export const FieldRow = styled(LIB.FlexRow)`
    width: 100%;
    justify-content: space-between;
`;

export const Error = styled.div`
    color: red;
`;
