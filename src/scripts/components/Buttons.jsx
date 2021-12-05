import React, { useState, useEffect, useCallback } from "react";
import cross from "../../img/cross.png";

function Buttons({ index, button, deleteButtons, editButtons }) {
    const initialInput = button.input;
    const [buttonInput, setbuttonInput] = useState(initialInput);

    const handleInputChange = (event) => {
        setbuttonInput(event.target.value)
    }

    const handleEdit = useCallback(
        () => {
            editButtons({ name: button.name, input: buttonInput }, index)
            setbuttonInput(buttonInput || initialInput)
        },
        [buttonInput, index, editButtons, initialInput],
    )

    const handleDelete = () => {
        deleteButtons(index);
    }

    useEffect(() => {
        setbuttonInput(initialInput)
    }, [initialInput])

    return (
        <div className="options-buttons__block-wrapper">
            <div className="options-buttons__block">
                <div className="options-buttons__block-name">{button.name}</div>
                <input
                    onChange={handleInputChange}
                    onBlur={handleEdit}
                    value={buttonInput}
                    placeholder="Enter text..."
                    type="text"
                />
            </div>
            <div className="options-buttons__block-line"></div>
            <button onClick={handleDelete} type="submit" className="options-buttons__block-delete">
                <img src={cross} alt="" />
            </button>
        </div>
    )
}

export default Buttons