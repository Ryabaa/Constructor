import React, { useState, useCallback } from "react";
import plus from "../../img/plus.svg";
import Block from "./Block.jsx";
import Options from "./Options.jsx";

let initialBlocksState = [
    { name: "Block 1", options: { buttons: [{ input: "" }], timesleeps: [{ input: "" }] } },
    { name: "Block 2", options: { buttons: [{ input: "" }], timesleeps: [{ input: "" }] } },
    { name: "Block 3", options: { buttons: [{ input: "" }], timesleeps: [{ input: "" }] } }
];

function BlocksSection() {
    const [blocks, setBlocks] = useState(initialBlocksState);
    const [modalActive, setModalActive] = useState(false);

    const addBlock = useCallback(() => {
        setBlocks([...blocks, { name: 'Block ' + (blocks.length + 1), options: { buttons: [{ input: "" }], timesleeps: [{ input: "" }] } }]);
    }, [blocks]);

    const deleteBlock = useCallback(
        (index) => {
            setBlocks(blocks.filter((block, blockIndex) => blockIndex !== index))
        },
        [blocks]
    );

    const editBlock = useCallback(
        (newBlock, blockIndex) => {
            let newBlocks = [...blocks]
            newBlocks.splice(blockIndex, 1, newBlock)
            setBlocks(newBlocks)
        },
        [blocks]
    );

    return (
        <>
            <div className="blocks">
                <h1 className="blocks-title">Blocks</h1>
                {
                    blocks.map((block, index) => (
                        <>
                            <Block
                                key={'Block' + index}
                                deleteBlock={deleteBlock}
                                editBlock={editBlock}
                                block={block}
                                blockIndex={index}
                                setModalActive={setModalActive}
                            />
                            <Options options={block.options} blockIndex={index} key={'Options' + index} active={modalActive} setActive={setModalActive} />
                        </>
                    ))
                }
                <button onClick={addBlock} className="blocks-btn">
                    <img src={plus} alt="" />
                </button>
            </div>
        </>
    );
}

export default BlocksSection;
