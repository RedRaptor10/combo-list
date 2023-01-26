import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Combo from './Combo';

const App = () => {
    return (
        <HashRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/combos/:comboId" element={<Combo />} />
            </Routes>
        </HashRouter>
    );
};

export default App;