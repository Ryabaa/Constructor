import React, { useCallback, useState } from "react";

import Checkbox from "./Checkbox.jsx";
import Input from "./Input.jsx";
import Buttons from "./Button.jsx";
import Timesleeps from "./Timesleep.jsx";

import cross from "../../images/cross.png";
import { BsPlusLg } from "react-icons/bs";
import { IconContext } from "react-icons";


const initialButtons = [{ name: "Button 1", input: "" }];
const initialTimesleeps = [];

function Options({ block, blockIndex, editBlock }) {
    const { name, active, wiretapping, answer, initialTimesleep, custom, sleep } = block
    const initialCheckboxes = [{ name: "Custom", active: custom }, { name: "Timesleeps", active: sleep }]
    const initialInputs = [{ name: "Wiretapping", input: wiretapping }, { name: "Answer", input: answer }]

    const [checkboxes, setCheckboxes] = useState(initialCheckboxes);
    const [inputs, setInputs] = useState(initialInputs);
    const [buttons, setButtons] = useState(initialButtons);
    const [timesleeps, setTimesleeps] = useState(initialTimesleeps);
    const [initialTime, setInitialTime] = useState(initialTimesleep);

    const editCheckboxes = useCallback(
        (newBlock, blockIndex) => {
            let newCheckboxes = [...checkboxes];
            newCheckboxes.splice(blockIndex, 1, newBlock);
            setCheckboxes(newCheckboxes);
        },
        [checkboxes]
    );

    const editInputs = useCallback(
        (newBlock, blockIndex) => {
            let newInputs = [...inputs];
            newInputs.splice(blockIndex, 1, newBlock);
            setInputs(newInputs);
        },
        [inputs]
    );

    //--Buttons--//

    const addButton = useCallback(() => {
        setButtons([...buttons, { name: `Button ${buttons.length + 1}`, input: "" }]);
    }, [buttons]);

    const editButton = useCallback(
        (newButton, buttonIndex) => {
            let newButtons = [...buttons];
            newButtons.splice(buttonIndex, 1, newButton);
            setButtons(newButtons);
        },
        [buttons]
    );

    const deleteButton = useCallback(
        (index) => {
            setButtons(buttons.filter((button, buttonIndex) => buttonIndex !== index));
        },
        [buttons]
    );

    //--Timesleeps--//

    const addTimesleep = useCallback(() => {
        setTimesleeps([...timesleeps, { name: `Text ${timesleeps.length + 1}`, input: "", value: 0.1 }]);
    }, [timesleeps]);

    const editTimesleep = useCallback(
        (newTimesleep, timesleepIndex) => {
            let newTimesleeps = [...timesleeps];
            newTimesleeps.splice(timesleepIndex, 1, newTimesleep);
            setTimesleeps(newTimesleeps);
        },
        [timesleeps]
    );

    const deleteTimesleep = useCallback(
        (index) => {
            setTimesleeps(timesleeps.filter((timesleep, timesleepIndex) => timesleepIndex !== index));
        },
        [timesleeps]
    );

    const handleChangeTime = (event) => {
        setInitialTime(Number(event.target.value));
    };



    const handleEditBlock = () => {
        editBlock(
            {
                name: name,
                wiretapping: inputs[0].input,
                answer: inputs[1].input,
                active: false,
                buttons: buttons,
                timesleeps: timesleeps,
                initialTimesleep: initialTime,
                custom: checkboxes[0].active,
                sleep: checkboxes[1].active,
            },
            blockIndex
        );
    };



    return (
        <div className={active ? "options-wrapper options-wrapper__active" : "options-wrapper"} onClick={handleEditBlock}>
            <section className="options" onClick={(e) => e.stopPropagation()}>
                <button onClick={handleEditBlock} className="options-close">
                    <img src={cross} alt="" />
                </button>
                <div className="options-header">
                    <h1 className="options-title">Options</h1>
                    <div className="options-header__border"></div>
                    <div className="options-header__container">
                        {
                            checkboxes.map((block, index) => (
                                <Checkbox block={block} index={index} editCheckboxes={editCheckboxes} type="text" />
                            ))
                        }
                    </div>
                </div>
                {
                    inputs.map((block, index) => (
                        <Input block={block} index={index} editInputs={editInputs} type="text" className="options-container__input" />
                    ))
                }

                {checkboxes[0].active === false && (
                    <div className="options-box">
                        <div className="options-buttons">
                            <h2 className="options-buttons__title">Buttons</h2>
                            {buttons.map((button, index) => (
                                <Buttons key={"Buttons" + index} index={index} button={button} editButton={editButton} deleteButton={deleteButton} />
                            ))}
                            <button onClick={addButton} className="options-buttons__block-add">
                                <IconContext.Provider value={{ className: "add-icon" }}>
                                    <BsPlusLg />
                                </IconContext.Provider>
                            </button>
                        </div>
                        {checkboxes[1].active === true && (
                            <div className="options-timesleeps">
                                <h2 className="options-timesleeps__title">Timesleeps</h2>
                                <div className="options-timesleeps__initial">
                                    <p className="options-timesleeps__initial-text">Initial timesleep</p>
                                    <div className="options-timesleeps__block-time">
                                        <input type="number" value={initialTime} onChange={handleChangeTime} className="options-timesleeps__block-time" />
                                    </div>
                                </div>
                                {timesleeps.map((timesleep, index) => (
                                    <Timesleeps
                                        key={"Timesleeps" + index}
                                        index={index}
                                        timesleep={timesleep}
                                        editTimesleep={editTimesleep}
                                        deleteTimesleep={deleteTimesleep}
                                    />
                                ))}
                                <button onClick={addTimesleep} className="options-timesleeps__block-add">
                                    <IconContext.Provider value={{ className: "add-icon" }}>
                                        <BsPlusLg />
                                    </IconContext.Provider>
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </section>
        </div>
    );
}

export default Options;
