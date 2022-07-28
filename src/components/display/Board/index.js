import { toDollar } from '../../../utils/helpers';
import { Wrapper } from './style';

function Board({ cases, playerCaseId }) {
    if (!cases || !playerCaseId) return null;

    const sortedCases = [...cases].sort((a, b) =>
        a.dollarAmount > b.dollarAmount ? 1 : -1
    );

    return (
        <Wrapper>
            <h3>Money Board</h3>
            <div className="board">
                {sortedCases.map(c => (
                    <div
                        key={c.caseId}
                        style={{
                            height: '2rem',
                            margin: '1rem',
                            padding: '0 1rem',
                            border: '1px solid black',
                            backgroundColor:
                                c.isAvailable || c.caseId === playerCaseId
                                    ? 'transparent'
                                    : 'lightgoldenrodyellow'
                        }}
                    >
                        {toDollar(c.dollarAmount)}
                    </div>
                ))}
            </div>
        </Wrapper>
    );
}

export default Board;
