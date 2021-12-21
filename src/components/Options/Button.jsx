import React, { useState, useEffect, useCallback } from "react";

import cross from "../../images/cross.png";

function Buttons({ index, button, deleteButton, editButton }) {
    const { input, name } = button
    const [buttonInput, setbuttonInput] = useState(input);

    const handleInputChange = (event) => {
        setbuttonInput(event.target.value);
    };

    const handleEdit = useCallback(() => {
        editButton({ name: name, input: buttonInput }, index);
        setbuttonInput(buttonInput || input);
    }, [buttonInput]);

    const handleDelete = () => {
        deleteButton(index);
    };

    useEffect(() => {
        setbuttonInput(input);
    }, [input]);

    return (
        <div className="options-buttons__block-wrapper">
            <div className="options-buttons__block">
                <div className="options-buttons__block-name">{name}</div>
                <input onChange={handleInputChange} onBlur={handleEdit} value={buttonInput} placeholder="Enter text..." type="text" />
            </div>
            <div className="options-buttons__block-line"></div>
            <button onClick={handleDelete} type="submit" className="options-buttons__block-delete">
                <img src={cross} alt="" />
            </button>
        </div>
    );
}

export default Buttons;
