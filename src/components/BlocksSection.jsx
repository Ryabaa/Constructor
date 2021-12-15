import React from "react";

import Block from "./Block.jsx";
import Options from "./Options.jsx";

import { BsPlusLg } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { IconContext } from "react-icons";

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
                    <IconContext.Provider value={{ className: 'add-icon' }}>
                        <BsPlusLg />
                    </IconContext.Provider>
                </button>
                <button onClick={sendRequest} className="download">
                    Download
                    <IconContext.Provider value={{ className: 'download-icon' }}>
                        <HiDownload />
                    </IconContext.Provider>
                </button>
            </div>
        </div>
    );
}

export default BlocksSection;