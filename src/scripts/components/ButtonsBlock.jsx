import React, { useState, useEffect, useCallback } from "react";
import cross from "../../img/cross.png";

function ButtonsBlock({ deleteBlock, editBlock, buttonsBlock, blockIndex }) {
    const initialInput = buttonsBlock.input;
    const [blockInput, setBlockInput] = useState(initialInput);

    const handleInputChange = (event) => {
        setBlockInput(event.target.value)
    };

    const handleEdit = useCallback(
        () => {
            editBlock({ input: blockInput }, blockIndex)
            setBlockInput(blockInput || initialInput)
        },
        [blockInput, blockIndex, editBlock, initialInput],
    )

    const handleDelete = () => {
        deleteBlock(blockIndex);
    };

    useEffect(() => {
        setBlockInput(initialInput)
    }, [initialInput])

    return (
        <div className="options-buttons__block-wrapper">
            <div className="options-buttons__block">
                <div className="options-buttons__block-name">Button {blockIndex + 1}</div>
                <input
                    onChange={handleInputChange}
                    onBlur={handleEdit}
                    value={blockInput}
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

export default ButtonsBlock
