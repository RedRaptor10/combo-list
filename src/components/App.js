import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Combo from './Combo';

const App = () => {
    return (
        <HashRouter>
            <Header />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/combos/:comboId" element={<Combo />} />
            </Routes>
        </HashRouter>
    );
};

export default App;