import { useEffect, useState } from 'react';
import { STATUS, ROUNDS } from '../../utils/constants';
import {
    getRoundTone,
    markCaseUnavailable,
    toDollar
} from '../../utils/helpers';
import { Wrapper } from './style';

function Round({ game, updateStatus, updateGame }) {
    const { cases, currentRound } = game;

    const [round, setRound] = useState({
        casesRemaining: ROUNDS[currentRound][0],
        currentCase: null,
        selectedCases: [],
        isRevealing: false
    });

    useEffect(() => {
        if (round.casesRemaining === 0) {
            const nextStatus = STATUS.IN_ROUND[1];
            const roundTone = getRoundTone(round.selectedCases);

            updateGame(prevState => ({ ...prevState, roundTone }));
            updateStatus(STATUS[nextStatus]);
        }
    }, [cases, round, updateGame, updateStatus]);

    const _selectCase = c => {
        setRound(prevState => ({
            ...prevState,
            currentCase: c,
            selectedCases: [...prevState.selectedCases, c],
            isRevealing: true
        }));
        updateGame(prevState => ({
            ...prevState,
            cases: markCaseUnavailable([...prevState.cases], c.caseId)
        }));
    };

    const _clearReveal = () => {
        setRound(prevState => ({
            ...prevState,
            casesRemaining: prevState.casesRemaining - 1,
            isRevealing: false
        }));
    };

    if (round.isRevealing) {
        return (
            <Wrapper>
                <p>The value of the case is...</p>
                <h1>{toDollar(round.currentCase.dollarAmount)}</h1>
                <button onClick={_clearReveal}>Okay</button>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <p>
                {`${round.casesRemaining} ${
                    round.casesRemaining > 1 ? 'cases' : 'case'
                }`}{' '}
                left...
            </p>
            {cases.map(c => (
                <button
                    key={c.caseId}
                    style={{ border: '1px solid black' }}
                    onClick={() => _selectCase(c)}
                    disabled={!c.isAvailable || round.isRevealing}
                >
                    <p>{c.displayNumber}</p>
                </button>
            ))}
        </Wrapper>
    );
}

export default Round;
