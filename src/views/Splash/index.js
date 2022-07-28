import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getName, setName } from '../../utils/api';
import { Wrapper } from './style';

function Splash() {
    const [firstName, setFirstName] = useState(null);
    const [inputName, setInputName] = useState('');

    useEffect(() => {
        const name = getName();
        setFirstName(name);
    }, []);

    const onChange = e => {
        setInputName(e.target.value);
    };

    const updateName = () => {
        setName(inputName);
        setFirstName(inputName);
        setInputName('');
    };

    return (
        <Wrapper>
            <h1>Deal or No Deal</h1>
            {firstName ? (
                <>
                    <p className="dialog">Welcome back, {firstName}!</p>
                    <div className="actions">
                        <Link to="/game">New Game</Link>
                        <Link to="/history">History</Link>
                    </div>
                </>
            ) : (
                <>
                    <p className="dialog">
                        Before we get started, what's your first name?
                    </p>
                    <input
                        name="inputName"
                        placeholder="Enter your first name..."
                        onChange={onChange}
                        value={inputName}
                    />
                    <div className="actions">
                        <button onClick={updateName}>Add Name</button>
                    </div>
                </>
            )}
        </Wrapper>
    );
}

export default Splash;
