import styled from 'styled-components';

export const Wrapper = styled.section`
    position: relative;
    float: left;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
        height: 50%;
        max-height: 20rem;
    }

    .player {
        background: var(--theme);
        position: absolute;
        top: 1rem;
        right: 1rem;
        padding: 1rem;
        border-radius: 1rem;

        h1 {
            margin: 0 0 1rem 0;
            color: black;
            text-transform: uppercase;
            font-size: 0.75rem;
            text-align: center;
        }

        p {
            background: black;
            color: white;
            margin: 0;
            padding: 0.5rem 1rem;
            border-radius: 1rem;
            text-align: center;
        }
    }
`;
