import { useEffect, useState } from 'react';
import { createRange, getRandomIndex, toDollar } from '../../../utils/helpers';
import { Wrapper } from './style';

const TIMES = createRange(1000, 5000, 500);

function Offer({ offer, deal, noDeal }) {
    const [isThinking, setIsThinking] = useState(true);

    useEffect(() => {
        const randomIndex = getRandomIndex(TIMES.length);
        const waitTime = TIMES[randomIndex];
        setTimeout(() => {
            setIsThinking(false);
        }, waitTime);
    }, []);

    return (
        <Wrapper>
            {isThinking ? (
                <p>The dealer is thinking...</p>
            ) : (
                <>
                    <p>Your offer is...</p>
                    <h1>{toDollar(offer)}</h1>
                    <p>Deal, or no deal?</p>
                    <button onClick={deal}>Deal</button>
                    <button onClick={noDeal}>No Deal</button>
                </>
            )}
        </Wrapper>
    );
}

export default Offer;
