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
    width: 270px;
`;

export const FieldRow = styled(LIB.FlexRow)`
    width: 100%;
    justify-content: space-between;
`;
