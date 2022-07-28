import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Game, History, NotFound, Splash } from '../views';
import { Wrapper } from './style';

function App() {
    return (
        <Wrapper>
            <Router>
                <Routes>
                    <Route index element={<Splash />} />
                    <Route path="/game" element={<Game />} />
                    <Route path="/history" element={<History />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </Wrapper>
    );
}

export default App;
