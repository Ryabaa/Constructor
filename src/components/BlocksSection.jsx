import React from "react";

import Block from "./Block.jsx";
import Options from "./Options.jsx";

import plus from "../img/plus.svg";

function BlocksSection({ blocks, addBlock, editBlock, deleteBlock, sendRequest }) {

    return (
        <div className="blocks">
            <h1 className="blocks-title">Blocks</h1>
            {
                blocks.map((block, index) => (
                    <>
                        <Block
                            key={'Block' + index}
                            block={block}
                            editBlock={editBlock}
                            deleteBlock={deleteBlock}
                            blockIndex={index}
                        />
                        <Options
                            key={blocks.length}
                            blockIndex={index}
                            block={block}
                            editBlock={editBlock}
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