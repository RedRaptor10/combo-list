import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Combo from './Combo';

const Character = () => {
    const { character } = useParams();
    const [combos, setCombos] = useState();

    // Get Combos
    useEffect(() => {
        const fetchCombos = async () => {
            try {
                const options = {
                    method: 'GET'
                };

                const data = await fetch(process.env.REACT_APP_SERVER + 'api/characters/' + character + '/combos', options);
                if (data.status < 200 || data.status > 299) {
                    throw new Error('Error ' + data.status + ': ' + data.statusText);
                }
                return data.json();
            } catch (error) {
                throw new Error(error);
            }
        };

        fetchCombos()
        .then(res => {
            setCombos(res);
        });
    }, [character]);

    return (
        <main className="character">
            <Link to={'/' + character + '/create'}>Add Combo</Link>
            {combos ?
                combos.map(combo => {
                    return (
                        <Combo key={combo._id} combo={combo} />
                    )
                })
            : null}
        </main>
    );
};

export default Character;