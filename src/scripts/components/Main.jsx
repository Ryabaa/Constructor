import React, { useState, useCallback } from "react";
import BlocksSection from "./BlocksSection.jsx";
import Info from "./Info.jsx";
import axios from "axios";


const initialSettings = {
    fileName: "",
    token: "",
    startMsg: "",
    firstBtn: ""
}

const initialBlocks = [
    { name: "Block 1", wiretapping: "", answer: "", active: false, buttons: [{ name: "Button 1", input: "" }], timesleeps: [{ name: "Text 1", input: "", value: 0.1 }], initialTimesleep: 0.1, custom: false, sleep: false },
    { name: "Block 2", wiretapping: "", answer: "", active: false, buttons: [{ name: "Button 1", input: "" }], timesleeps: [{ name: "Text 1", input: "", value: 0.1 }], initialTimesleep: 0.1, custom: false, sleep: false },
    { name: "Block 3", wiretapping: "", answer: "", active: false, buttons: [{ name: "Button 1", input: "" }], timesleeps: [{ name: "Text 1", input: "", value: 0.1 }], initialTimesleep: 0.1, custom: false, sleep: false },
];

function Main() {
    const [blocks, setBlocks] = useState(initialBlocks);
    const [settings, setSettings] = useState(initialSettings)

    const addBlock = useCallback(() => {
        setBlocks([...blocks, { name: "Block " + (blocks.length + 1), wiretapping: "", answer: "", active: false, buttons: [{ name: "Button 1", input: "" }], timesleeps: [{ name: "Text 1", input: "", value: 0.1 }], initialTimesleep: 0.1, custom: false, sleep: false }]);
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
            setSettings(newSettings)
        },
        [settings],
    )

    //---------------------------Object build-------------------------------------------//


    const buildObject = () => {
        let obj = {
            bot_settings: settings,
            bot_commands: {},
            sleep_times: {},
            slt_texts: {},
            custom_code_blocks: []
        };
        blocks.forEach((block, index) => {
            let commands = [block.answer]
            let sleep_timesValues = [block.initialTimesleep]
            let sleep_texts = []

            if (block.custom == true) {
                obj.custom_code_blocks.push(block.wiretapping)
            } else {
                obj.sleep_times[block.wiretapping] = sleep_timesValues;
                obj.slt_texts[block.wiretapping] = sleep_texts;
                obj.bot_commands[block.wiretapping] = commands

                block.buttons.forEach(i => {
                    commands.push(i.input)
                })
            }

            if (block.sleep == true) {
                commands.splice(1, 0, 'sleep');
                block.timesleeps.forEach(i => {
                    if (i.value !== 0) {
                        sleep_texts.push(i.input);
                        sleep_timesValues.push(i.value);
                    }
                })
            } else {
                commands.splice(1, 0, '');
            }
        });
        return obj;
    };

    //---------------------------Request-------------------------------------------//

    const sendRequest = async () => {
        let pyObject = buildObject()
        const res = await axios
            .post("http://localhost:8000/data", pyObject)
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
                    addBlock={addBlock}
                    editBlock={editBlock}
                    deleteBlock={deleteBlock}
                    sendRequest={sendRequest}
                />
            </section>
        </main>
    );
}

export default Main;