import { Actions } from '../../components/display';
import { Link } from '../../components/interactive';
import { Wrapper } from './style';

function NotFound() {
    return (
        <Wrapper>
            <h1>I see you're a wandering wizard! 🧙</h1>
            <p>
                But there's nothing to see here, let's get back somewhere
                safe...
            </p>
            <Actions>
                <Link to="/">Back to Safety</Link>
            </Actions>
        </Wrapper>
    );
}

export default NotFound;
