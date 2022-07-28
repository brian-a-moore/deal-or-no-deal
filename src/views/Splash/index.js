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
            {firstName && (
                <div className="player">
                    <h1>Player Name</h1>
                    <p>{firstName}</p>
                </div>
            )}
            <img src={require('../../img/logo.png')} alt="Deal or No Deal" />
            {firstName ? (
                <Actions>
                    <Link to="/game">New Game</Link>
                    <Link to="/history">History</Link>
                </Actions>
            ) : (
                <>
                    <TextInput
                        name="inputName"
                        placeholder="Enter your first name..."
                        onChange={onChange}
                        value={inputName}
                        style={{ marginBottom: '2rem' }}
                    />
                    <Actions>
                        <Button onClick={updateName} disabled={!inputName}>
                            Add Name
                        </Button>
                    </Actions>
                </>
            )}
        </Wrapper>
    );
}

export default Splash;
