import { useEffect, useState } from 'react';
import { DIALOGS, STATUS, ROUNDS } from '../../utils/constants';
import { getName } from '../../utils/api';
import { convertToNth } from '../../utils/helpers';
import { Wrapper } from './style';

function Dialog({ status, nextStatus, game, updateStatus }) {
    const { cases, playerCaseId, currentRound, roundTone } = game;

    const [message, setMessage] = useState(null);

    useEffect(() => {
        let m;

        switch (status) {
            case STATUS.GAME_START[0]:
                m = DIALOGS[status](getName());
                break;
            case STATUS.PLAYER_CASE_SELECTED[0]:
                m = DIALOGS[status](
                    cases.find(c => c.caseId === playerCaseId)?.displayNumber
                );
                break;
            case STATUS.ROUND_START[0]:
                m = DIALOGS[status](
                    convertToNth(currentRound + 1),
                    ROUNDS[currentRound][1]
                );
                break;
            case STATUS.ROUND_END[0]:
                m = DIALOGS.ROUND_RESPONSE[roundTone];
                break;
            case STATUS.DEAL[0]:
                m = DIALOGS.DEAL(game.offer);
                break;
            case STATUS.NO_DEAL[0]:
                m = DIALOGS.NO_DEAL(getName());
                break;
            case STATUS.FINAL_CHOICE[0]:
                m = DIALOGS.FINAL_CHOICE(game.switchedCase);
                break;
            default:
                return;
        }

        if (m) setMessage(m);
    }, [
        status,
        cases,
        playerCaseId,
        currentRound,
        roundTone,
        game.offer,
        game.switchedCase
    ]);

    const onContinue = () => {
        setMessage(null);

        if (status === STATUS.NO_DEAL[0]) {
            updateStatus(
                game.currentRound === 9
                    ? STATUS.FINAL_ROUND
                    : STATUS.ROUND_START
            );
        } else {
            updateStatus(STATUS[nextStatus]);
        }
    };

    if (!message) return;
    return (
        <Wrapper>
            <p>{message}</p>
            <button onClick={onContinue}>Continue</button>
        </Wrapper>
    );
}

export default Dialog;
