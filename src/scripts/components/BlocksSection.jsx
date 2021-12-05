import React, { useState, useCallback } from "react";
import plus from "../../img/plus.svg";
import Block from "./Block.jsx";
import Options from "./Options.jsx";
import axios from "axios";

let initialBlocks = [
    { name: "Block 1", wiretapping: "", answer: "" },
    { name: "Block 2", wiretapping: "", answer: "" },
    { name: "Block 3", wiretapping: "", answer: "" },
];

let initialButtons = [{ name: "Button 1", input: "" }]
let initialTimesleeps = [{ name: "Text 1", input: "", value: 0.1 }]

function BlocksSection() {
    const [buttons, setButtons] = useState(initialButtons);
    const [timesleeps, setTimesleeps] = useState(initialTimesleeps);
    const [blocks, setBlocks] = useState(initialBlocks);
    const [modalActive, setModalActive] = useState(false);

    const addBlock = useCallback(() => {
        setBlocks([...blocks, { name: "Block " + (blocks.length + 1), wiretapping: "", answer: "" }]);
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

    //---------------------------Options-------------------------------------------//

    const editAnswer = useCallback(
        (newAnswer, blockIndex) => {
            let newBlocks = [...blocks];
            newBlocks.splice(blockIndex, 1, newAnswer);
            setBlocks(newBlocks);
        },
        [blocks]
    );

    const editWiretapping = useCallback(
        (newWiretapping, blockIndex) => {
            let newBlocks = [...blocks];
            newBlocks.splice(blockIndex, 1, newWiretapping);
            setBlocks(newBlocks);
        },
        [blocks]
    );

    //---------------------------Buttons-------------------------------------------//

    const addButtons = useCallback(() => {
        if (buttons.length !== 4) {
            setButtons([...buttons, { name: "Button " + (buttons.length + 1), input: "" }])
        }
    }, [buttons])


    const editButtons = useCallback(
        (newButton, buttonIndex) => {
            let newButtons = [...buttons];
            newButtons.splice(buttonIndex, 1, newButton);
            setButtons(newButtons);
        },
        [buttons]
    );

    const deleteButtons = useCallback(
        (index) => {
            setButtons(buttons.filter((button, buttonIndex) => buttonIndex !== index))
        }, [buttons]
    )

    //---------------------------Timesleeps-------------------------------------------//

    const addTimesleeps = useCallback(() => {
        if (timesleeps.length !== 5) {
            setTimesleeps([...timesleeps, { name: "Text " + (timesleeps.length + 1), input: "", value: 0.1 }]);
        }
    }, [timesleeps]);

    const editTimesleeps = useCallback(
        (newTimesleep, timesleepIndex) => {
            let newTimesleeps = [...timesleeps];
            newTimesleeps.splice(timesleepIndex, 1, newTimesleep);
            setTimesleeps(newTimesleeps);
        },
        [timesleeps]
    );

    const deleteTimesleeps = useCallback(
        (index) => {
            setTimesleeps(timesleeps.filter((timesleep, timesleepIndex) => timesleepIndex !== index))
        }, [timesleeps]
    )


    let obj = {
        bot_commands: {},
        sleep_times: {},
        slt_texts: [],
    };

    const buildObject = () => {
        blocks.forEach((block, index) => {
            let commands = [block.answer]
            let sleep_timesValues = [0.1]

            for (let i = 0; i < timesleeps.length; i++) {
                if (timesleeps[i].value !== 0) {
                    obj.slt_texts.push(timesleeps[i].input);
                    sleep_timesValues.push(timesleeps[i].value);
                    commands.splice(1, 0, `${timesleeps[i].value}`);
                }
            }

            obj.sleep_times[block.wiretapping] = sleep_timesValues;
            obj.bot_commands[block.wiretapping] = commands

            for (let i = 0; i < buttons.length; i++) {
                commands.push(buttons[i].input)
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
                        <Options
                            key={blocks.length}
                            blockIndex={index}
                            block={block}
                            active={modalActive}
                            setActive={setModalActive}
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
                        />
                    </>
                ))
            }
            <div className="blocks-footer">
                <button onClick={addBlock} className="blocks-btn">
                    <img src={plus} alt="" />
                </button>
                <button onClick={sendRequest} className="download">
                    Download
                </button>
            </div>
        </div>
    );
}

export default BlocksSection;