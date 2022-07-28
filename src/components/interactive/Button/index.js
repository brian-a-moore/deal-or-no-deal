import { Wrapper } from './style';

function Button({ children, ...rest }) {
    return <Wrapper {...rest}>{children}</Wrapper>;
}

export default Button;
