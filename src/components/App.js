import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Character from './Character';

const App = () => {
    return (
        <HashRouter>
            <Header />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/:character" element={<Character />} />
            </Routes>
        </HashRouter>
    );
};

export default App;