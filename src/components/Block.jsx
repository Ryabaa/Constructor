import React, { useCallback, useEffect, useRef, useState } from "react";

import { IconContext } from "react-icons/lib";
import { FaPencilAlt } from "react-icons/fa";
import { IoOptions } from 'react-icons/io5';
import { CgClose } from "react-icons/cg";


function Block({ deleteBlock, editBlock, block, blockIndex }) {
    const ref = useRef()
    const initialName = block.name;
    const [blockName, setBlockName] = useState(initialName);
    const [editing, setEditing] = useState(false);


    const startEditing = () => {
        setEditing(true)
        ref.current.focus();
        ref.current.selectionStart = blockName.length
    }

    const handleInputChange = (event) => {
        setBlockName(event.target.value)
    };

    const handleEdit = useCallback(
        () => {
            editBlock({ name: blockName || `Block ${blockIndex}`, wiretapping: block.wiretapping, answer: block.answer, active: block.active, buttons: block.buttons, timesleeps: block.timesleeps, initialTimesleep: block.initialTimesleep, custom: block.custom, sleep: block.sleep }, blockIndex)
            setEditing(false)
            setBlockName(blockName || initialName)
        },
        [blockName, blockIndex, editBlock, initialName],
    )

    const handleDelete = () => {
        deleteBlock(blockIndex);
    };

    const handleEditActive = () => {
        editBlock({ name: block.name, wiretapping: block.wiretapping, answer: block.answer, active: true, buttons: block.buttons, timesleeps: block.timesleeps, initialTimesleep: block.initialTimesleep, custom: block.custom, sleep: block.sleep }, blockIndex)
    };

    useEffect(() => {
        setBlockName(initialName)
    }, [initialName])

    return (
        <div className="blocks-container-wrapper">
            <div className="blocks-container">
                <div className="blocks-name">
                    <input
                        ref={ref}
                        onBlur={handleEdit}
                        readOnly={editing ? "" : "readonly"}
                        onChange={handleInputChange}
                        value={blockName}
                        className="blocks-name__input"
                    />
                    <button onClick={startEditing} className="blocks-name__btn">
                        <IconContext.Provider value={{ className: 'pencil-icon' }}>
                            <FaPencilAlt />
                        </IconContext.Provider>
                    </button>
                </div>
                <button onClick={handleEditActive} className="blocks-params">
                    <IconContext.Provider value={{ className: 'params-icon' }}>
                        <IoOptions />
                    </IconContext.Provider>
                </button>
            </div>
            <button onClick={handleDelete} type="submit" className="blocks-delete">
                <IconContext.Provider value={{ className: 'cross-icon' }}>
                    <CgClose />
                </IconContext.Provider>
            </button>
        </div>
    );
}

export default Block;
