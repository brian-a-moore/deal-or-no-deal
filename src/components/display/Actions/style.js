import styled from 'styled-components';

export const Wrapper = styled.div`
    & button + button,
    & a + a,
    & a + button,
    & button + a {
        margin-left: 2rem;
    }
`;
