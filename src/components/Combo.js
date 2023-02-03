const Combo = ({combo}) => {
    return (
        <div className="combo">
            <div className="combo-col-left">
                <div className="combo-input-tags">
                    <div className="combo-input">{combo.input}</div>
                    <div className="combo-tags">
                        {combo.tags.length > 0 ?
                            combo.tags.map((tag, i) => {
                                return (
                                    <div key={i} className="combo-tag">{tag}</div>
                                );
                            })
                        : null}
                    </div>
                </div>
                <div className="combo-notes">{combo.notes}</div>
            </div>
            <div className="combo-col-right combo-damage">{combo.damage.$numberDecimal + ' dmg'}</div>
        </div>
    );
};

export default Combo;