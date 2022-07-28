import styled from 'styled-components';
import Image from '../../../img/pick-case.png';

export const Wrapper = styled.section`
    background: url(${Image}) no-repeat;
    background-size: cover;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
        grid-gap: 1rem;
        padding: 1rem;
        overflow: auto;

        .grid-item {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
`;
