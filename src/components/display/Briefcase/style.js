import styled from 'styled-components';
import Briefcase from '../../../img/briefcase.png';

export const Wrapper = styled.button`
    background: url(${Briefcase}) no-repeat;
    background-size: 100% 100%;
    width: 6rem;
    height: 4.5rem;
    line-height: 5rem;
    margin: 1rem;
    padding: 0;
    border: none;
    cursor: pointer;
    color: black;
    font-size: 2.5rem;
    font-weight: 900;
    transition: all 0.25s ease;

    &:hover {
        transform: scale(1.2);
    }
`;
