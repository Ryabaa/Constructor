import React, { useState, useCallback } from "react";

import Info from "./Info/Info.jsx";
import sendRequest from "../utils/request.js";
import buildObject from "../utils/buildObject.js"
import Block from "./Block.jsx";
import Options from "./Options/Options.jsx";

import { BsPlusLg } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { IconContext } from "react-icons";



const initialSettings = {
    fileName: "",
    token: "",
    startMsg: "",
    firstBtn: "",
};

function createBlocks(blocksAmount) {
    const blocks = blocksAmount.map(name => {
        return {
            name: name,
            wiretapping: "",
            answer: "",
            active: false,
            buttons: [{ name: "Button 1", input: "" }],
            timesleeps: [],
            initialTimesleep: 0.1,
            custom: false,
            sleep: false,
        }
    });

    return blocks
}

const initialBlocks = createBlocks(["Block 1", "Block 2", "Block 3"])



function Main() {
    const [blocks, setBlocks] = useState(initialBlocks);
    const [settings, setSettings] = useState(initialSettings);

    const addBlock = useCallback(() => {
        setBlocks([
            ...blocks,
            {
                name: `Block ${blocks.length + 1}`,
                wiretapping: "",
                answer: "",
                active: false,
                buttons: [{ name: "Button 1", input: "" }],
                timesleeps: [],
                initialTimesleep: 0.1,
                custom: false,
                sleep: false,
            },
        ]);
    }, [blocks]);

    const deleteBlock = useCallback(
        (index) => {
            setBlocks(blocks.filter((block, blockIndex) => blockIndex !== index));
        },
        [blocks]
    );

    const editBlock = useCallback(
        (newBlock, blockIndex) => {
            let newBlocks = [...blocks];
            newBlocks.splice(blockIndex, 1, newBlock);
            setBlocks(newBlocks);
        },
        [blocks]
    );

    const editSettings = useCallback(
        (newSettings) => {
            setSettings(newSettings);
        },
        [settings]
    );

    const downloadFile = () => {
        const pyObject = buildObject(blocks, settings)
        sendRequest(pyObject)
    }


    return (
        <main className="main">
            <section className="section">
                <h1 className="section-title">Constrtuctor</h1>
                <Info editSettings={editSettings} />
                <div className="blocks">
                    <h1 className="blocks-title">Blocks</h1>
                    {
                        blocks.map((block, index) => (
                            <>
                                <Block key={`Block ${index}`} block={block} editBlock={editBlock} deleteBlock={deleteBlock} blockIndex={index} />
                                <Options key={blocks.length} blockIndex={index} block={block} editBlock={editBlock} />
                            </>
                        ))
                    }
                    <div className="blocks-footer">
                        <button onClick={addBlock} className="blocks-btn">
                            <IconContext.Provider value={{ className: "add-icon" }}>
                                <BsPlusLg />
                            </IconContext.Provider>
                        </button>
                        <button onClick={downloadFile} className="download">
                            Download
                            <IconContext.Provider value={{ className: "download-icon" }}>
                                <HiDownload />
                            </IconContext.Provider>
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Main;
