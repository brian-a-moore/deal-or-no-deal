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

    const onClear = () => {
        setInputName('');
    };

    const updateName = () => {
        setName(inputName);
        setFirstName(inputName);
        setInputName('');
    };

    return (
        <Wrapper>
            <h1>Deal or No Deal</h1>
            <p> Created By: Brian Moore</p>
            {firstName ? (
                <>
                    <p>Welcome back, {firstName}!</p>
                    <Link to="/game">Start Game</Link>
                    <Link to="/history">Game History</Link>
                </>
            ) : (
                <>
                    <p>Before we get started, what's your first name?</p>
                    <input
                        name="inputName"
                        placeholder="Enter your first name..."
                        onChange={onChange}
                        value={inputName}
                    />
                    <button onClick={updateName}>Add Name</button>
                    <button onClick={onClear}>Clear</button>
                </>
            )}
        </Wrapper>
    );
}

export default Splash;
