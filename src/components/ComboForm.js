import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ComboForm = () => {
    const { character, comboId } = useParams();
    const tagsList = ['1 Bar', '2 Bars', '3 Bars'];
    const [form, setForm] = useState({
        damage: '',
        input: '',
        notes: '',
        tags: [],
        type: 'Midscreen'
    });
    const navigate = useNavigate();

    // If Update, get combo data and set form
    useEffect(() => {
        if (comboId) {
            const options = {
                method: 'GET'
            };

            fetch(process.env.REACT_APP_SERVER + 'api/combos/' + comboId, options)
            .then(res => {
                if (res.status < 200 || res.status > 299) {
                    throw new Error('Error ' + res.status + ': ' + res.statusText);
                }
                return res.json();
            })
            .then(res => {
                setForm({
                    character: res.character,
                    damage: res.damage.$numberDecimal,
                    date: res.date,
                    input: res.input,
                    notes: res.notes,
                    tags: res.tags,
                    type: res.type
                });
            })
            .catch(error => {
                throw new Error(error);
            });
        }
    }, [comboId]);

    const handleChange = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    const submitCombo = event => {
        event.preventDefault();

        const method = comboId ? 'PUT' : 'POST';
        const route = comboId ? 'api/combos/' + comboId + '/update' : 'api/combos/create';

        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                character: form.character ? form.character : character,
                damage: form.damage,
                date: form.date ? form.date : new Date(),
                input: form.input,
                notes: form.notes,
                tags: form.tags,
                type: form.type
            })
        };

        fetch(process.env.REACT_APP_SERVER + route, options)
        .then(res => {
            if (res.status < 200 || res.status > 299) {
                throw new Error('Error ' + res.status + ': ' + res.statusText);
            }
        })
        .then(() => {
            navigate('/' + character);
        })
        .catch(error => {
            throw new Error(error);
        });
    };

    const toggleTag = tag => {
        const temp = form.tags.slice();

        // If form tags don't include tag then add it, otherwise remove tag
        if (!form.tags.includes(tag)) {
            temp.push(tag);
        } else {
            const index = temp.indexOf(tag);
            temp.splice(index, 1);
        }

        setForm({
            ...form,
            tags: temp
        });
    };

    return (
        <main className="combo-form-page">
            <form className="combo-form" action="">
                <label htmlFor="input">Input</label>
                <input name="input" value={form.input} onChange={handleChange}></input>
                <label htmlFor="damage">Damage</label>
                <input name="damage" value={form.damage} onChange={handleChange}></input>
                <label htmlFor="notes">Notes</label>
                <textarea name="notes" value={form.notes} onChange={handleChange}></textarea>
                <label htmlFor="tags">Tags</label>
                <label htmlFor="type">Type</label>
                <select name="type" value={form.type} onChange={handleChange}>
                    <option value="Midscreen">Midscreen</option>
                    <option value="Corner">Corner</option>
                </select>
                <div className="form-tags">
                    {tagsList.map(tag => {
                        return (
                            <div key={tag} className={form.tags.includes(tag) ? 'active-tag' : null} onClick={() => toggleTag(tag)}>{tag}</div>
                        )
                    })}
                </div>
                <button className="submit-btn" type="submit" onClick={submitCombo}>{comboId ? 'Update' : 'Add'}</button>
            </form>
        </main>
    );
};

export default ComboForm;