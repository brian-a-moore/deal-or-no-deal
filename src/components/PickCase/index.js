import { Wrapper } from './style';

function PickCase({ cases, setPlayerCaseId }) {
    return (
        <Wrapper>
            <p>Pick Case</p>
            {cases.map(({ caseId, displayNumber }) => (
                <button
                    key={caseId}
                    style={{ border: '1px solid black' }}
                    onClick={() => setPlayerCaseId(caseId)}
                >
                    <p>{displayNumber}</p>
                </button>
            ))}
        </Wrapper>
    );
}

export default PickCase;
