import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Character from './Character';
import ComboForm from './ComboForm';

const App = () => {
    return (
        <HashRouter>
            <Header />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/:characterSlug" element={<Character />} />
                <Route exact path="/:characterSlug/combos/create" element={<ComboForm />} />
                <Route path="/:characterSlug/combos/:comboId/update" element={<ComboForm />} />
            </Routes>
        </HashRouter>
    );
};

export default App;