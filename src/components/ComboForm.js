import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ComboForm = () => {
    const { character } = useParams();
    const tags = ['1 Bar', '2 Bars', '3 Bars'];
    const [form, setForm] = useState({
        damage: '',
        input: '',
        notes: '',
        tags: [],
        type: 'Midscreen'
    });
    const navigate = useNavigate();

    const handleChange = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    const addCombo = event => {
        event.preventDefault();

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                character: character,
                damage: form.damage,
                date: new Date(),
                input: form.input,
                notes: form.notes,
                tags: form.tags,
                type: form.type
            })
        }

        fetch(process.env.REACT_APP_SERVER + 'api/combos/create', options)
        .then(res => {
            if (res.status < 200 || res.status > 299) {
                throw new Error('Error ' + res.status + ': ' + res.statusText);
            }
            return res.json();
        })
        .then(() => {
            navigate('/' + character);
        })
        .catch(error => {
            throw new Error(error);
        });
    }

    const toggleTag = tag => {
        const newTags = form.tags;

        // If form tags don't include tag, add tag, otherwise remove tag
        if (!form.tags.includes(tag)) {
            newTags.push(tag);
        } else {
            const index = newTags.indexOf(tag);
            newTags.splice(index, 1);
        }

        setForm({
            ...form,
            tags: newTags
        });
    }

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
                    {tags.map(tag => {
                        return (
                            <div key={tag} className={form.tags.includes(tag) ? 'active-tag' : null} onClick={() => toggleTag(tag)}>{tag}</div>
                        )
                    })}
                </div>
                <button className="submit-btn" type="submit" onClick={addCombo}>Add</button>
            </form>
        </main>
    );
};

export default ComboForm;