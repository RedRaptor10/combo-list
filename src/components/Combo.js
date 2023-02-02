import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Combo = () => {
    const { comboId } = useParams();
    const [combo, setCombo] = useState();

    // Get Combo
    useEffect(() => {
        const fetchCombo = async () => {
            try {
                const options = {
                    method: 'GET'
                };

                const data = await fetch(process.env.REACT_APP_SERVER + 'api/combos/' + comboId, options);
                if (data.status < 200 || data.status > 299) {
                    throw new Error('Error ' + data.status + ': ' + data.statusText);
                }
                return data.json();
            } catch (error) {
                throw new Error(error);
            }
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