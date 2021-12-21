import React, { useCallback, useState } from "react";

function Input({ editInputs, block, index }) {
    const { input, name } = block
    const [inputState, setInputState] = useState(input)

    const handleInputChange = (event) => {
        setInputState(event.target.value)
    };

    const handleEdit = useCallback(() => {
        editInputs({ name: name, input: inputState }, index);
    }, [inputState])

    return (
        <div className="options-container options-container1">
            <div className="options-container__name">
                <p>{name}</p>
            </div>
            <input onBlur={handleEdit} onChange={handleInputChange} value={inputState} type="text" placeholder="Enter text..." className="options-container__input" />
        </div>
    )
}

export default Input