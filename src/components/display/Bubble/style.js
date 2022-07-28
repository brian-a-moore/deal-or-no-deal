import styled, { keyframes } from 'styled-components';

const popIn = keyframes`
    from {
        opacity: 0;
        transform: scale(0.1);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
`;

export const Wrapper = styled.div`
    background: white;
    max-width: 30rem;
    padding: 1rem 2rem;
    border-radius: 1rem;
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.3);
    opacity: 0;
    transform: scale(0.1);
    animation: ${popIn} 0.3s ease forwards;
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
        color: black;
        font-size: 1.5rem;
        font-family: 'Edu SA Beginner', Arial, Helvetica, sans-serif;
        margin: 0 0 2rem 0;
        padding: 0;
    }
`;
