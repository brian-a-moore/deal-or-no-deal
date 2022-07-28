import { Wrapper } from './style';

function Briefcase({ children, ...rest }) {
    return <Wrapper {...rest}>{children}</Wrapper>;
}

export default Briefcase;
