import styled from 'styled-components';

export const Wrapper = styled.section`
    float: left;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    table {
        margin: 0 0 2rem 0;
    }

    table,
    td {
        border: 1px solid gold;
        border-collapse: collapse;
    }

    td {
        height: 2rem;
        line-height: 2rem;
        padding: 0 1rem;
    }
`;
