import styled from 'styled-components';

export const Wrapper = styled.button`
    float: left;
    background: transparent;
    color: ${({ alt }) => (alt ? 'black' : 'var(--theme)')};
    border: none;
    outline: 1px solid ${({ alt }) => (alt ? 'black' : 'var(--theme)')};
    height: 2rem;
    line-height: 2rem;
    margin: 0;
    padding: 0 2rem;
    font-size: inherit;
    font-family: 'Barlow';
    font-weight: 600;
    text-transform: uppercase;
    transition: all 0.25s ease;
    user-select: none;

    &:enabled {
        cursor: pointer;
    }

    &:disabled {
        opacity: 0.5;
    }

    &:enabled:hover {
        background: ${({ alt }) => (alt ? 'black' : 'var(--theme)')};
        color: ${({ alt }) => (alt ? 'white' : 'black')};
        outline-offset: 4px;
    }

    &:enabled:active {
        outline-color: ${({ alt }) => (alt ? 'rgba(0,0,0,0.3)' : '#ffd70050')};
        outline-offset: 8px;
    }
`;
