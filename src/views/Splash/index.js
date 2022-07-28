import { useEffect, useState } from 'react';
import { Actions } from '../../components/display';
import { TextInput } from '../../components/form';
import { Button, Link } from '../../components/interactive';
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
                    <Actions>
                        <Link to="/game">New Game</Link>
                        <Link to="/history">History</Link>
                    </Actions>
                </>
            ) : (
                <>
                    <p className="dialog">
                        Before we get started, what's your first name?
                    </p>
                    <TextInput
                        name="inputName"
                        placeholder="Enter your first name..."
                        onChange={onChange}
                        value={inputName}
                    />
                    <Actions>
                        <Button onClick={updateName}>Add Name</Button>
                    </Actions>
                </>
            )}
        </Wrapper>
    );
}

export default Splash;
