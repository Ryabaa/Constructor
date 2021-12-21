import React, { useState, useRef } from "react";

function InfoButton({ block, index, editBlock }) {
    const ref = useRef()
    const { name, input, active, limit } = block

    const [stateActive, setStateActive] = useState(active)
    const [stateInput, setStateInput] = useState(input)

    const handleInputChange = (event) => {
        setStateInput(event.target.value)
    };

    const handleEdit = () => {
        setStateActive(false)
        editBlock({ name: name, input: stateInput, active: stateActive, limit: limit }, index)
    };

    const startEditing = () => {
        setStateActive(true)
        ref.current.focus();
        ref.current.selectionStart = setStateInput.length;
    };


    return (
        <div className={stateActive ? "info-block info-block__active" : "info-block"}>
            <input
                ref={ref}
                type="text"
                placeholder="Write bot name..."
                className={stateActive ? "info-input info-input__active" : "info-input"}
                maxLength={limit ? 15 : 1000}
                value={stateInput}
                onBlur={handleEdit}
                onChange={handleInputChange}
            />
            <button onClick={startEditing} className="info-btn">
                {name}
            </button>
        </div>
    );
}

export default InfoButton;
