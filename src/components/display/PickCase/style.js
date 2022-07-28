import styled from 'styled-components';

export const Wrapper = styled.section`
    background-color: black;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;

    .case-grid {
        display: flex;
        flex-wrap: wrap;
    }

    .case-grid .grid-item {
        width: calc(100% / 6);
        padding: 1rem;
        aspect-ratio: 16/9;
    }

    .case-grid .grid-item p {
        background: gray;
        float: left;
        width: 100%;
        height: 100%;
        margin: 0;
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: black;
        font-size: 3rem;
        font-weight: bold;
        cursor: pointer;
    }
`;
