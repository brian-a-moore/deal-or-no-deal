import { Wrapper } from './style';

function Button({ children, onClick }) {
    return <Wrapper onClick={onClick}>{children}</Wrapper>;
}

export default Button;
