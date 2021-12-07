import React from "react";
import plus from "../../img/plus.svg";
import Block from "./Block.jsx";
import Options from "./Options.jsx";

function BlocksSection({ deleteBlock, editBlock, timesleeps, buttons, deleteButtons,
    editButtons, addButtons, deleteTimesleeps, editTimesleeps, addTimesleeps, editAnswer, editWiretapping, addBlock, sendRequest, blocks, changeActive }) {

    return (
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
                            changeActive={changeActive}
                        />
                        <Options
                            key={blocks.length}
                            blockIndex={index}
                            block={block}
                            timesleeps={timesleeps}
                            buttons={buttons}
                            deleteButtons={deleteButtons}
                            editButtons={editButtons}
                            addButtons={addButtons}
                            deleteTimesleeps={deleteTimesleeps}
                            editTimesleeps={editTimesleeps}
                            addTimesleeps={addTimesleeps}
                            editAnswer={editAnswer}
                            editWiretapping={editWiretapping}
                            changeActive={changeActive}
                        />
                    </>
                ))
            }
            <div className="blocks-footer">
                <button onClick={addBlock} className="blocks-btn">
                    <img src={plus} alt="" />
                </button>
                <button onClick={sendRequest} className="download">Download</button>
            </div>
        </div>
    );
}

export default BlocksSection;