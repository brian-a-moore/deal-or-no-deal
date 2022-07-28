import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    clearRecord,
    getName,
    getRecord,
    resetEverything
} from '../../utils/api';
import { toDollar, toPct } from '../../utils/helpers';
import { Wrapper } from './style';

function History() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [playerRecord, setPlayerRecord] = useState(null);

    useEffect(() => {
        const name = getName();
        const record = getRecord();

        if (!name) {
            navigate('/');
        }

        setFirstName(name);
        setPlayerRecord(record);
        setIsLoading(false);
    }, [firstName, navigate, playerRecord]);

    const _clearRecord = () => {
        setIsLoading(true);
        clearRecord();
        setPlayerRecord(null);
    };

    if (isLoading) return <div> Loading... </div>;
    return (
        <Wrapper>
            <h1>Game History</h1>
            <p>
                Here to check out your awesome skills, {firstName}? Well...
                here's how you've been playing!
            </p>
            <h2>Player Record</h2>
            <table>
                <tbody>
                    <tr>
                        <td>Wins</td>
                        <td>{playerRecord.wins}</td>
                    </tr>
                    <tr>
                        <td>Losses</td>
                        <td>{playerRecord.losses}</td>
                    </tr>
                    <tr>
                        <td>Win %</td>
                        <td>
                            {toPct(
                                playerRecord.wins /
                                    (playerRecord.wins + playerRecord.losses)
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>Last Played</td>
                        <td>
                            {playerRecord.lastPlayed
                                ? new Date(
                                      playerRecord.lastPlayed
                                  ).toDateString()
                                : 'Never'}
                        </td>
                    </tr>
                    <tr>
                        <td>Highest Offer</td>
                        <td>{toDollar(playerRecord.highestOfferRecieved)}</td>
                    </tr>
                    <tr>
                        <td>Highest Accepted Offer</td>
                        <td>{toDollar(playerRecord.highestOfferAccepted)}</td>
                    </tr>
                    <tr>
                        <td>Highest Accepted Case</td>
                        <td>
                            {toDollar(playerRecord.highestCaseValueAccepted)}
                        </td>
                    </tr>
                </tbody>
            </table>
            <div>
                <button onClick={_clearRecord}>Clear Record</button>
                <button onClick={resetEverything}>Reset Everything</button>
                <Link to="/">Go Back</Link>
            </div>
        </Wrapper>
    );
}

export default History;
