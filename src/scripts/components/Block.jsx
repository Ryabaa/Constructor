import React, { useCallback, useEffect, useRef, useState } from "react";
import cross from "../../img/cross.png";
import menu from "../../img/menu.svg";
import pencil from "../../img/pencil.png";


function Block({ deleteBlock, editBlock, block, blockIndex, setModalActive }) {
    const ref = useRef()
    const initialName = block.name;
    const [blockName, setBlockName] = useState(initialName);
    const [editing, setEditing] = useState(false);

    const handleDelete = () => {
        deleteBlock(blockIndex);
    };

    const startEditing = () => {
        setEditing(true)
        ref.current.focus();
        ref.current.selectionStart = blockName.length
    }

    const handleEdit = useCallback(
        () => {
            editBlock({ name: blockName || `Block ${blockIndex}` }, blockIndex)
            setEditing(false)
            setBlockName(blockName || initialName)
        },
        [blockName, blockIndex, editBlock, initialName],
    )

    const handleInputChange = (event) => {
        setBlockName(event.target.value)
    };


    useEffect(() => {
        setBlockName(initialName)
    }, [initialName])

    return (
        <>
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
                            <img src={pencil} alt="" />
                        </button>
                    </div>
                    <button onClick={() => setModalActive(true)} className="blocks-params">
                        <img className="blocks-menu" src={menu} alt="" />
                    </button>
                </div>
                <button onClick={handleDelete} type="submit" className="blocks-delete">
                    <img src={cross} alt="" />
                </button>
            </div>
        </>
    );
}

export default Block;
