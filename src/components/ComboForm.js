const ComboForm = () => {
    return (
        <main className="combo-form-page">
            <form className="combo-form" action="">
                <label htmlFor="input">Input</label>
                <input name="input"></input>
                <label htmlFor="damage">Damage</label>
                <input name="damage"></input>
                <label htmlFor="notes">Notes</label>
                <textarea name="notes"></textarea>
                <label htmlFor="tags">Tags</label>
                <label htmlFor="type">Type</label>
                <select name="type">
                    <option value="Midscreen">Midscreen</option>
                    <option value="Corner">Corner</option>
                </select>
                <button className="submit-btn" type="submit">Add</button>
            </form>
        </main>
    );
};

export default ComboForm;