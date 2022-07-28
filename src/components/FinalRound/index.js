import { getName } from '../../utils/api';
import { getCaseDisplayNumber } from '../../utils/helpers';
import { Wrapper } from './style';

function FinalRound({ game, finalChoice }) {
    const displayNumber = getCaseDisplayNumber(game);
    const lastAvailableCase = game?.cases.find(
        c => c.isAvailable && c.caseId !== game.playerCaseId
    );

    return (
        <Wrapper>
            <p>
                It's the final round, {getName()}. There's only two cases left
                and one of them is your case #{displayNumber}. The question is,
                will you keep your case or switch?
            </p>
            <button onClick={() => finalChoice()}>
                Keep case #{displayNumber}
            </button>
            <button onClick={() => finalChoice(lastAvailableCase.caseId)}>
                Switch to case #{lastAvailableCase.displayNumber}
            </button>
        </Wrapper>
    );
}

export default FinalRound;
