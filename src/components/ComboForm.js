import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Combo from './Combo';

const ComboForm = () => {
    const { characterSlug, comboId } = useParams();
    const inputs = ['b', 'u', 'd', 'f', 'B', 'U', 'D', 'F', '1', '2', '3', '4', ',', '+', ' ', 'Backspace'];
    const tagsList = ['Easy', 'Medium', 'Hard', '1 Bar', '2 Bars', '3 Bars'];
    const [form, setForm] = useState({
        damage: 0.00,
        input: '',
        notes: '',
        tags: [],
        type: 'Midscreen'
    });
    const [formErrors, setFormErrors] = useState();
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

    const checkInput = event => {
        const allowed = ['Delete', 'Tab', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowRight'];

        // If allowed keys are not pressed, prevent onChange event
        if (!inputs.includes(event.key) && !allowed.includes(event.key)) {
            event.preventDefault();
        }
    };

    const checkDamage = event => {
        const allowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'Delete', 'Tab', '.', 'Decimal', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowRight'];

        // If allowed keys are not pressed OR there are multiple decimal points, prevent onChange event
        if ((!allowed.includes(event.key)) || ((event.key === '.' || event.key === 'Decimal') && event.target.value.includes('.'))) {
            event.preventDefault();
        }
    };

    const handleChange = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    const handleInputClick = event => {
        event.preventDefault();

        // If button is Backspace, remove last character from form input, else add input
        const newInput = event.target.value === 'Backspace' ? form.input.slice(0, -1) : form.input + event.target.value;

        setForm({
            ...form,
            input: newInput
        });
    };

    const clearForm = event => {
        event.preventDefault();

        setForm({
            damage: 0.00,
            input: '',
            notes: '',
            tags: [],
            type: 'Midscreen'
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
                character: form.character ? form.character : characterSlug,
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
            return res.json();
        })
        .then(res => {
            if (res.errors) {
                setFormErrors(res.errors);
            } else {
                navigate('/' + characterSlug);
            }
        })
        .catch(error => {
            throw new Error(error);
        });
    };

    const toggleTag = (event, tag) => {
        event.preventDefault();

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
            <h1>{comboId ? 'Edit Combo' : 'Add Combo'}</h1>
            <div className="combo-form-page-preview">
                <label>Preview</label>
                <Combo combo={{...form, damage: { $numberDecimal: form.damage }}} />
            </div>
            <form className="combo-form" action="">
                <label htmlFor="input">Input</label>
                <input name="input" className="combo-form-input" value={form.input} onKeyDown={checkInput} onChange={handleChange}></input>
                {formErrors ?
                    formErrors.map((error, i) => {
                        if (error.param === 'input') {
                            return (
                                <div key={i} className="combo-form-error">{error.msg}</div>
                            );
                        }
                        return null;
                    })
                : null}
                <div className="combo-form-btns">
                    {inputs.map((input, i) => {
                        return (
                            <button key={i} className="btn" value={input} onClick={handleInputClick}>{input === ' ' ? 'Space' : input}</button>
                        );
                    })}
                </div>
                <label htmlFor="damage">Damage</label>
                <input name="damage" type="number" className="combo-form-damage" min="0" max="999" value={form.damage} onKeyDown={checkDamage} onChange={handleChange}></input>
                <label htmlFor="notes">Notes</label>
                <textarea name="notes" className="combo-form-notes" value={form.notes} onChange={handleChange}></textarea>
                {formErrors ?
                    formErrors.map((error, i) => {
                        if (error.param === 'notes') {
                            return (
                                <div key={i} className="combo-form-error">{error.msg}</div>
                            );
                        }
                        return null;
                    })
                : null}
                <label htmlFor="tags">Tags</label>
                <div className="combo-form-tags">
                    {tagsList.map(tag => {
                        return (
                            <button key={tag} className={form.tags.includes(tag) ? 'btn combo-form-tag btn combo-form-active-tag' : 'btn combo-form-tag'}
                                onClick={event => toggleTag(event, tag)}>{tag}</button>
                        )
                    })}
                </div>
                <label htmlFor="type">Type</label>
                <select name="type" className="combo-form-type" value={form.type} onChange={handleChange}>
                    <option value="Midscreen">Midscreen</option>
                    <option value="Corner">Corner</option>
                </select>
                <div className="combo-form-footer combo-form-btns">
                    <Link to={'/' + characterSlug} className="btn-container">
                        <button className="btn">Cancel</button>
                    </Link>
                    <button className="btn" onClick={clearForm}>Clear Form</button>
                    <button className="btn" type="submit" onClick={submitCombo}>{comboId ? 'Update Combo' : 'Add Combo'}</button>
                </div>
            </form>
        </main>
    );
};

export default ComboForm;