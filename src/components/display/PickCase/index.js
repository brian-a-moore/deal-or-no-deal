import { Wrapper } from './style';
import Briefcase from '../Briefcase';
import Bubble from '../Bubble';

function PickCase({ cases, setPlayerCaseId }) {
    return (
        <Wrapper>
            <Bubble>
                <p style={{ margin: 0 }}>Select your case...</p>
            </Bubble>
            <div className="grid">
                {cases.map(({ caseId, displayNumber }) => (
                    <div className="grid-item">
                        <Briefcase
                            key={caseId}
                            onClick={() => setPlayerCaseId(caseId)}
                        >
                            {displayNumber}
                        </Briefcase>
                    </div>
                ))}
            </div>
        </Wrapper>
    );
}

export default PickCase;
