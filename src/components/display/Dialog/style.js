import styled, { keyframes } from 'styled-components';

const howiePopIn = keyframes`
    from {
        bottom: -100%;
        opacity: 0;
        transform-origin: 0%;
        transform: scale(0.1);
    }
    to {
        bottom: 0%;
        opacity: 0.9;
        transform: scale(1);
    }
`;

export const Wrapper = styled.section`
    background: rgba(100, 100, 100, 0.3);
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(0.125rem);
    z-index: 10;
    isolation: isolate;

    img {
        position: absolute;
        bottom: -100%;
        right: 2rem;
        z-index: -1;
        height: 70%;
        opacity: 0;
        mix-blend-mode: overlay;
        animation: ${howiePopIn} 0.3s ease forwards;
        filter: drop-shadow(0 0 1rem rgba(255, 255, 255, 0.5));
    }
`;
