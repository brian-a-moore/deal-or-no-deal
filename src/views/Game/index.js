import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Dialog,
    Board,
    FinalRound,
    Offer,
    PickCase,
    Result,
    Round
} from '../../components';
import { CASES, STATUS } from '../../utils/constants';
import { GAME_FIXTURE } from '../../utils/fixtures';
// import { EXAMPLE_STATE } from '../../utils/exmaple';
import {
    getCaseDisplayNumber,
    makeOffer,
    randomizeCaseValues,
    toDollar
} from '../../utils/helpers';
import { Wrapper } from './style';

function Game() {
    const [[status, nextStatus], setStatus] = useState(STATUS.GAME_START);
    const [game, setGame] = useState(GAME_FIXTURE);

    useEffect(() => {
        if (status === STATUS.GAME_START[0]) {
            const cases = randomizeCaseValues(CASES);
            setGame(prevState => ({
                ...prevState,
                cases
            }));
        }
    }, [status]);

    useEffect(() => {
        if (status === STATUS.CALCULATE_OFFER[0]) {
            setGame(prevState => ({
                ...prevState,
                offer: makeOffer(game.cases, game.playerCaseId)
            }));
            setStatus(STATUS.OFFER_PENDING);
        }
    }, [game.cases, game.playerCaseId, status]);

    const _setPlayerCaseId = caseId => {
        setGame(prevState => ({
            ...prevState,
            currentRound: 0,
            playerCaseId: caseId,
            cases: prevState.cases.map(c => {
                if (c.caseId === caseId) {
                    c.isAvailable = false;
                }
                return c;
            })
        }));

        setStatus(STATUS[nextStatus]);
    };

    const _deal = () => {
        setStatus(STATUS.DEAL);
    };

    const _noDeal = () => {
        setGame(prevState => ({
            ...prevState,
            previousOffers: [...prevState.previousOffers, prevState.offer],
            offer: null,
            currentRound: prevState.currentRound + 1
        }));

        setStatus(STATUS.NO_DEAL);
    };

    const _finalChoice = (caseId = null) => {
        setGame(prevState => {
            if (caseId) {
                return {
                    ...prevState,
                    playerCaseId: caseId,
                    switchedCase: true,
                    cases: prevState.cases.map(c => {
                        if (c.caseId === prevState.playerCaseId) {
                            c.isAvailable = true;
                        }
                        return c;
                    })
                };
            }
            return prevState;
        });
        setStatus(STATUS.FINAL_CHOICE);
    };

    if (status === STATUS.RESULT[0]) {
        return (
            <Wrapper>
                <Result game={game} />
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <Dialog
                status={status}
                nextStatus={nextStatus}
                game={game}
                updateStatus={setStatus}
            />
            {status === STATUS.PLAYER_CASE_SELECT[0] && (
                <PickCase
                    cases={game.cases}
                    setPlayerCaseId={_setPlayerCaseId}
                />
            )}
            {status === STATUS.IN_ROUND[0] && (
                <Round
                    game={game}
                    updateStatus={setStatus}
                    updateGame={setGame}
                />
            )}
            {status === STATUS.FINAL_ROUND[0] && (
                <FinalRound game={game} finalChoice={_finalChoice} />
            )}
            {status === STATUS.OFFER_PENDING[0] && (
                <Offer offer={game.offer} deal={_deal} noDeal={_noDeal} />
            )}
            <hr />
            <Board cases={game.cases} playerCaseId={game.playerCaseId} />
            {game.playerCaseId && (
                <>
                    <h3>My Case: </h3>
                    <p>{getCaseDisplayNumber(game)}</p>
                </>
            )}
            {game.previousOffers && (
                <>
                    <h3>Previous Offers:</h3>
                    <div
                        style={{
                            padding: '1rem',
                            border: '1px solid black'
                        }}
                    >
                        {game.previousOffers.map((offer, index) => (
                            <p key={index}>{toDollar(offer)}</p>
                        ))}
                    </div>
                </>
            )}
            <footer>
                <Link to="/">Quit Game</Link>
            </footer>
        </Wrapper>
    );
}

export default Game;
