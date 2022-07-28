import { Wrapper } from './style';

function Link({ children, ...rest }) {
    return <Wrapper {...rest}>{children}</Wrapper>;
}

export default Link;
