import { Wrapper } from './style';

function PickCase({ cases, setPlayerCaseId }) {
    return (
        <Wrapper>
            <p>Pick Case</p>
            <div className="case-grid">
                {cases.map(({ caseId, displayNumber }) => (
                    <div key={caseId} className="grid-item">
                        <p onClick={() => setPlayerCaseId(caseId)}>
                            {displayNumber}
                        </p>
                    </div>
                ))}
            </div>
        </Wrapper>
    );
}

export default PickCase;
