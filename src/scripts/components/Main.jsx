import React, { useState, useCallback } from "react";
import BlocksSection from "./BlocksSection.jsx";
import Info from "./Info.jsx";
import axios from "axios";


const initialSettings = {
    fileName: "",
    token: "",
    startMsg: ""
}

const initialButtons = [{ name: "Button 1", input: "" }]
const initialTimesleeps = [{ name: "Text 1", input: "", value: 0.1 }]

const initialBlocks = [
    { name: "Block 1", wiretapping: "", answer: "", active: false, buttons: [{ name: "Button 1", input: "" }], timesleeps: [{ name: "Text 1", input: "", value: 0.1 }] },
    { name: "Block 2", wiretapping: "", answer: "", active: false, buttons: [{ name: "Button 1", input: "" }], timesleeps: [{ name: "Text 1", input: "", value: 0.1 }] },
    { name: "Block 3", wiretapping: "", answer: "", active: false, buttons: [{ name: "Button 1", input: "" }], timesleeps: [{ name: "Text 1", input: "", value: 0.1 }] },
];

function Main() {
    const [buttons, setButtons] = useState(initialButtons);
    const [timesleeps, setTimesleeps] = useState(initialTimesleeps);
    const [blocks, setBlocks] = useState(initialBlocks);
    const [settings, setSettings] = useState(initialSettings)

    const addBlock = useCallback(() => {
        setBlocks([...blocks, { name: "Block " + (blocks.length + 1), wiretapping: "", answer: "", active: false, buttons: buttons, timesleeps: timesleeps }]);
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

    //---------------------------Settings-------------------------------------------//

    const editSettings = useCallback(
        (newSettings) => {
            setSettings(newSettings)
        },
        [settings],
    )
    //---------------------------Modal active-------------------------------------------//

    const changeActive = useCallback(
        (newBlock, blockIndex) => {
            let newBlocks = [...blocks];
            newBlocks.splice(blockIndex, 1, newBlock);
            setBlocks(newBlocks);
        },
        [blocks]
    );

    //---------------------------Object build-------------------------------------------//

    let obj = {
        bot_settings: {},
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

    //---------------------------Request-------------------------------------------//

    const sendRequest = async () => {
        buildObject()
        let json = JSON.stringify(obj)
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
        <main className="main">
            <section className="section">
                <h1 className="section-title">Constrtuctor</h1>
                <Info
                    editSettings={editSettings}
                />
                <BlocksSection
                    blocks={blocks}
                    deleteBlock={deleteBlock}
                    editBlock={editBlock}
                    addBlock={addBlock}
                    sendRequest={sendRequest}
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
            </section>
        </main>
    );
}

export default Main;