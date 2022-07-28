import styled from 'styled-components';

export const Wrapper = styled.input`
    background: transparent;
    float: left;
    height: 2rem;
    line-height: 2rem;
    padding: 0 1rem;
    color: white;
    font-size: inherit;
    border: none;
    outline: 1px solid rgba(255, 255, 255, 0.5);
    transition: all 0.25s ease;

    &:focus {
        background: var(--focus);
        outline-color: var(--theme);
        outline-offset: 4px;
    }
`;
