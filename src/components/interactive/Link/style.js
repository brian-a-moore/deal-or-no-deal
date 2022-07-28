import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper = styled(Link)`
    float: left;
    background: transparent;
    color: var(--theme);
    border: none;
    outline: 1px solid var(--theme);
    height: 2rem;
    line-height: 2rem;
    margin: 0;
    padding: 0 2rem;
    text-decoration: none;
    font-size: inherit;
    font-family: 'Barlow';
    font-weight: 600;
    text-transform: uppercase;
    transition: all 0.25s ease;
    user-select: none;
    cursor: pointer;

    &:hover {
        background: var(--theme);
        color: black;
        outline-offset: 4px;
    }

    &:active {
        outline-color: #ffd70050;
        outline-offset: 8px;
    }
`;
