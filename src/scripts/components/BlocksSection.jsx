import React, { useState, useCallback, useEffect } from "react";
import plus from "../../img/plus.svg";
import Block from "./Block.jsx";
import Options from "./Options.jsx";
import axios from "axios";

let initialButtons = [{ input: '' }]

function BlocksSection() {
    const [buttons, setButtons] = useState(initialButtons);
    let initialBlocksState = [
        { name: "Block 1", wiretapping: "Список", answer: "Ты нажал список", buttons: buttons, timesleeps: [{ input: "", value: 0 }] },
        { name: "Block 2", wiretapping: "", answer: "", buttons: buttons, timesleeps: [{ input: "", value: 0 }] },
        { name: "Block 3", wiretapping: "", answer: "", buttons: buttons, timesleeps: [{ input: "", value: 0 }] },
    ];
    let [blocks, setBlocks] = useState(initialBlocksState);
    const [modalActive, setModalActive] = useState(false);

    const addBlock = useCallback(() => {
        setBlocks([...blocks, { name: "Block " + (blocks.length + 1), wiretapping: "", answer: "", buttons: buttons, timesleeps: [{ input: "", value: 0 }] }]);
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


    //---------------------------Buttons-------------------------------------------//

    const addButtonsBlock = useCallback((block) => {
        if (buttons.length !== 5) {
            setButtons([...buttons, { input: "" }])
        }
    }, [buttons])


    useEffect(() => {
        blocks.buttons = buttons
    })

    const editButtonsBlock = (newBlock, blockIndex) => {
        blocks.forEach((block, index) => {
            block.buttons.splice(blockIndex, 1, newBlock)
        })
    }

    const deleteButtonsBlock = (index) => {
        blocks.forEach(block => {
            block.buttons.filter((block, blockIndex) => blockIndex !== index)
        })
    };

    let obj = {
        bot_commands: {},
        sleep_times: {},
        slt_texts: [],
    };

    const buildObject = () => {
        blocks.forEach((block, index) => {
            let commands = [block.answer]
            let sleep_timesValues = [0.1]

            for (let i = 0; i < block.timesleeps.length; i++) {
                if (block.timesleeps[i].value !== 0) {
                    obj.slt_texts.push(block.timesleeps[i].input);
                    sleep_timesValues.push(block.timesleeps[i].value);
                    commands.splice(1, 0, `${block.timesleeps[i].value}`);
                }
            }

            obj.sleep_times[block.wiretapping] = sleep_timesValues;
            obj.bot_commands[block.wiretapping] = commands

            for (let i = 0; i < block.buttons.length; i++) {
                commands.push(block.buttons[i].input)
            }
        });
    };

    buildObject()
    let json = JSON.stringify(obj)


    const sendRequest = async () => {
        const res = await axios
            .post("http://localhost:8000/data", json)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        return await res;
    }

    return (
        <>
            <div className="blocks">
                <h1 className="blocks-title">Blocks</h1>
                {blocks.map((block, index) => (
                    <>
                        <Block key={"Block" + index} deleteBlock={deleteBlock} editBlock={editBlock} block={block} blockIndex={index} setModalActive={setModalActive} />
                        <Options buttonsBlocks={block.buttons} deleteButtonsBlock={deleteButtonsBlock} editButtonsBlock={editButtonsBlock} addButtonsBlock={addButtonsBlock} block={block} blockIndex={index} key={"Options" + index} active={modalActive} setActive={setModalActive} />
                    </>
                ))}
                <div className="blocks-footer">
                    <button onClick={addBlock} className="blocks-btn">
                        <img src={plus} alt="" />
                    </button>
                    <button onClick={sendRequest} className="download">
                        Download
                    </button>
                </div>
            </div>
        </>
    );
}

export default BlocksSection;