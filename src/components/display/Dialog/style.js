import styled, { keyframes } from 'styled-components';

const textPopIn = keyframes`
    from {
        opacity: 0;
        transform: scale(0.1);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
`;

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

    .message {
        background: #fff;
        color: black;
        max-width: 30rem;
        padding: 1rem 2rem;
        border-radius: 1rem;
        box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.3);
        opacity: 0;
        transform: scale(0.1);
        animation: ${textPopIn} 0.3s ease forwards;
        display: flex;
        flex-direction: column;
        align-items: center;

        button {
            display: inline;
            margin: 0 auto;
            outline-color: black;
            color: black;
        }

        button:hover {
            background: black;
            color: white;
        }
    }

    img {
        position: absolute;
        bottom: -100%;
        right: 0;
        z-index: -1;
        height: 60%;
        opacity: 0;
        mix-blend-mode: overlay;
        animation: ${howiePopIn} 0.3s ease forwards;
    }
`;
