import { Link } from 'react-router-dom';
import { Wrapper } from './style';

function NotFound() {
    return (
        <Wrapper>
            <h1>I see you're a wandering wizard! 🧙</h1>
            <p>
                But there's nothing to see here, let's get back somewhere
                safe...
            </p>
            <Link to="/">Back to Safety</Link>
        </Wrapper>
    );
}

export default NotFound;
