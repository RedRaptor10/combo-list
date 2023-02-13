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

    // Delete Combo
    const deleteCombo = async (comboId, i) => {
        try {
            const options = {
                method: 'DELETE'
            };

            const data = await fetch(process.env.REACT_APP_SERVER + 'api/combos/' + comboId + '/delete', options);
            if (data.status < 200 || data.status > 299) {
                throw new Error('Error ' + data.status + ': ' + data.statusText);
            }

            // After deleting combo from database, also remove combo from combos array state
            let temp = combos.slice();
            temp.splice(i, 1);
            setCombos(temp);
        } catch (error) {
            throw new Error(error);
        }
    };

    return (
        <main className="character">
            <Link to={'/' + character + '/combos/create'}>Add Combo</Link>
            {combos ?
                combos.map((combo, i) => {
                    return (
                        <div key={combo._id} className="combo-wrapper">
                            <Combo combo={combo} />
                            <Link to={'/' + character + '/combos/' + combo._id + '/update'}>Update</Link>
                            <button onClick={() => { deleteCombo(combo._id, i) }}>Delete</button>
                        </div>
                    )
                })
            : null}
        </main>
    );
};

export default Character;