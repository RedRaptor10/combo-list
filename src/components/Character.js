import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Combo from './Combo';

const Character = () => {
    const { characterSlug } = useParams();
    const [character, setCharacter] = useState();
    const [type, setType] = useState('midscreen');
    const [combos, setCombos] = useState();

    // Get Character
    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const options = {
                    method: 'GET'
                };

                const data = await fetch(process.env.REACT_APP_SERVER + 'api/characters/' + characterSlug, options);
                if (data.status < 200 || data.status > 299) {
                    throw new Error('Error ' + data.status + ': ' + data.statusText);
                }
                return data.json();
            } catch (error) {
                throw new Error(error);
            }
        };

        fetchCharacter()
        .then(res => {
            setCharacter(res);
        });
    }, [characterSlug]);

    // Get Combos
    useEffect(() => {
        const fetchCombos = async () => {
            try {
                const options = {
                    method: 'GET'
                };

                const data = await fetch(process.env.REACT_APP_SERVER + 'api/characters/' + characterSlug + '/combos?type=' + type, options);
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
    }, [characterSlug, type]);

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

    const changeType = event => {
        if (type === 'midscreen' && event.target.name === 'corner-btn') {
            setType('corner');
        } else if (type === 'corner' && event.target.name === 'midscreen-btn') {
            setType('midscreen');
        }
    };

    return (
        <main className="character">
            {character ?
                <h1>{character.name}</h1>
            : null}
            <div className="add-combo-btn-wrapper">
                <Link to={'/' + characterSlug + '/combos/create'} className="btn-container">
                    <button className="btn add-combo-btn">Add Combo</button>
                </Link>
            </div>
            <div className="combo-type-btns">
                <button className={type === 'midscreen' ? 'btn active-type' : 'btn'} name="midscreen-btn" onClick={changeType}>Midscreen</button>
                <button className={type === 'corner' ? 'btn active-type' : 'btn'} name="corner-btn" onClick={changeType}>Corner</button>
            </div>
            <div className="combos">
                {combos ?
                    combos.map((combo, i) => {
                        return (
                            <div key={combo._id} className="combo-wrapper">
                                <Combo combo={combo} />
                                <div className="combo-btns">
                                    <Link to={'/' + characterSlug + '/combos/' + combo._id + '/update'} className="btn-container">
                                        <button className="btn">Edit</button>
                                    </Link>
                                    <button className="btn" onClick={() => { deleteCombo(combo._id, i) }}>Delete</button>
                                </div>
                            </div>
                        )
                    })
                : null}
            </div>
        </main>
    );
};

export default Character;