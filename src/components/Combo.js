import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Combo = () => {
    const { comboId } = useParams();
    const [combo, setCombo] = useState();

    // Get Combo
    useEffect(() => {
        const fetchCombo = async () => {
            const options = {
                method: 'GET'
            };

            const data = await fetch(process.env.REACT_APP_SERVER + 'api/combos/' + comboId, options);
            return data.json();
        };

        fetchCombo()
        .then(res => {
            setCombo(res);
        });
    }, [comboId]);

    return (
        <div>
            {combo ?
                <div>{combo.input}</div>
            : null}
        </div>
    );
};

export default Combo;