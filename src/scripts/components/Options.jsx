import React, { useCallback, useState, useRef } from "react";
import cross from "../../img/cross.png";
import plus from "../../img/plus.svg";
import Buttons from "./Buttons";
import Timesleeps from "./Timesleeps";


function Options({ block, blockIndex, editBlock }) {
    const chboxCustomRef = useRef()
    const chboxSleepRef = useRef()
    const initialButtons = [{ name: "Button 1", input: "" }]
    const initialTimesleeps = []
    const [buttons, setButtons] = useState(initialButtons)
    const [timesleeps, setTimesleeps] = useState(initialTimesleeps)
    const [answer, setAnswer] = useState("")
    const [wiretapping, setWiretapping] = useState("")
    const [initialTime, setInitialTime] = useState(0.1)
    const [custom, setCustom] = useState(false)
    const [sleep, setSleep] = useState(false)

    const handleAnswerChange = (event) => {
        setAnswer(event.target.value)
    }
    const handleWiretappingChange = (event) => {
        setWiretapping(event.target.value)
    }
    const handleChangeTime = (event) => {
        setInitialTime(event.target.value)
    }

    const handleEditBlock = () => {
        editBlock({ name: block.name, wiretapping: wiretapping, answer: answer, active: false, buttons: buttons, timesleeps: timesleeps, initialTimesleep: initialTime, custom: custom, sleep: sleep }, blockIndex)
    };

    //--Buttons--//

    const addButton = useCallback(() => {
        setButtons([...buttons, { name: "Button " + (buttons.length + 1), input: "" }])
    },
        [buttons]
    );

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
        setTimesleeps([...timesleeps, { name: "Text " + (timesleeps.length + 1), input: "", value: 0.1 }])
    },
        [timesleeps]
    );

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


    const customChange = () => {
        if (chboxCustomRef.current.checked) {
            setCustom(true)
        } else {
            setCustom(false)
        }

        if (custom === false) {
            setButtons([])
        } else {
            if (sleep === true) {
                setTimesleeps(initialTimesleeps)
            }
            setButtons(initialButtons)
        }
    }

    const sleepChange = () => {
        if (chboxSleepRef.current.checked) {
            setSleep(true)
        } else {
            setSleep(false)
        }

        if (sleep === true) {
            setTimesleeps(initialTimesleeps)
        } else {
            if (custom === false) {
                addTimesleep()
            }
        }
    }

    return (
        <div className={block.active ? "options-wrapper options-wrapper__active" : "options-wrapper"} onClick={handleEditBlock}>
            <section className="options" onClick={(e) => e.stopPropagation()}>
                <button onClick={handleEditBlock} className="options-close">
                    <img src={cross} alt="" />
                </button>
                <div className="options-header">
                    <h1 className="options-title">Options</h1>
                    <div className="options-header__border"></div>
                    <div className="options-header__container">
                        <div className="options-custom">
                            <label className="switch">
                                <input ref={chboxCustomRef} onChange={customChange} type="checkbox" />
                                <span className="slider"></span>
                            </label>
                            <div className="options-custom__border"></div>
                            <p className="options-custom__text">Custom</p>
                        </div>
                        <div className="options-custom">
                            <label className="switch">
                                <input ref={chboxSleepRef} onChange={sleepChange} type="checkbox" />
                                <span className="slider"></span>
                            </label>
                            <div className="options-custom__border"></div>
                            <p className="options-custom__text">Timesleeps</p>
                        </div>
                    </div>
                </div>

                <div className="options-container options-container1">
                    <div className="options-container__name">
                        <p>Wiretapping</p>
                    </div>
                    <input placeholder="Enter text..." onChange={handleWiretappingChange} value={wiretapping} type="text" className="options-container__input" />
                </div>
                <div className="options-container options-container2">
                    <div className="options-container__name">
                        <p>Text</p>
                    </div>
                    <input placeholder="Enter text..." onChange={handleAnswerChange} value={answer} type="text" className="options-container__input" />
                </div>
                {
                    custom === false &&
                    <div className="options-box">

                        <div className="options-buttons">
                            <h2 className="options-buttons__title">Buttons</h2>
                            {
                                buttons.map((button, index) => (
                                    <Buttons
                                        key={'Buttons' + index}
                                        index={index}
                                        button={button}
                                        editButton={editButton}
                                        deleteButton={deleteButton}
                                    />
                                ))
                            }
                            <button onClick={addButton} className="options-buttons__block-add">
                                <img src={plus} alt="" />
                            </button>
                        </div>
                        {
                            sleep === true &&
                            <div className="options-timesleeps">
                                <h2 className="options-timesleeps__title">Timesleeps</h2>
                                <div className="options-timesleeps__initial">
                                    <p className="options-timesleeps__initial-text">Initial timesleep</p>
                                    <div className="options-timesleeps__block-time">
                                        <input type="number" value={initialTime} onChange={handleChangeTime} className="options-timesleeps__block-time" />
                                    </div>
                                </div>
                                {
                                    timesleeps.map((timesleep, index) => (
                                        <Timesleeps
                                            key={'Timesleeps' + index}
                                            index={index}
                                            timesleep={timesleep}
                                            editTimesleep={editTimesleep}
                                            deleteTimesleep={deleteTimesleep}
                                        />
                                    ))
                                }
                                <button onClick={addTimesleep} className="options-timesleeps__block-add">
                                    <img src={plus} alt="" />
                                </button>
                            </div>
                        }

                    </div>

                }
            </section>
        </div>
    );
}

export default Options;
