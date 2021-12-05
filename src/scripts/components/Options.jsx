import React, { useState } from "react";
import cross from "../../img/cross.png";
import plus from "../../img/plus.svg";
import Buttons from "./Buttons";
import Timesleeps from "./Timesleeps";

function Options({ active, setActive, blockIndex, block, buttons, deleteButtons, editButtons, addButtons, timesleeps, deleteTimesleeps, editTimesleeps, addTimesleeps, editAnswer, editWiretapping }) {
    const initialAnswerInput = block.answer
    const initialWiretappingInput = block.answer
    const [answerInput, setAnswerInput] = useState(initialAnswerInput)
    const [wiretappingInput, setWiretappingInput] = useState(initialWiretappingInput)

    const handleAnswerChange = (event) => {
        setAnswerInput(event.target.value)
    }
    const handleEditAnswer = () => {
        editAnswer({ name: block.name, wiretapping: wiretappingInput, answer: answerInput }, blockIndex)
    }


    const handleWiretappingChange = (event) => {
        setWiretappingInput(event.target.value)
    }
    const handleEditWiretapping = () => {
        editWiretapping({ name: block.name, wiretapping: wiretappingInput, answer: answerInput }, blockIndex)
    }

    return (
        <div className={active ? "options-wrapper options-wrapper__active" : "options-wrapper"} onClick={() => setActive(false)}>
            <section className="options" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => setActive(false)} className="options-close">
                    <img src={cross} alt="" />
                </button>
                <h1 className="options-title">Options</h1>
                <div className="options-container options-container1">
                    <div className="options-container__name">
                        <p>Wiretapping</p>
                    </div>
                    <input placeholder="Enter text..." onChange={handleWiretappingChange} onBlur={handleEditWiretapping} value={wiretappingInput} type="text" className="options-container__input" />
                </div>
                <div className="options-container options-container2">
                    <div className="options-container__name">
                        <p>Text</p>
                    </div>
                    <input placeholder="Enter text..." onChange={handleAnswerChange} onBlur={handleEditAnswer} value={answerInput} type="text" className="options-container__input" />
                </div>
                <div className="options-box">

                    <div className="options-buttons">
                        <h2 className="options-buttons__title">Buttons</h2>
                        {
                            buttons.map((button, index) => (
                                <Buttons
                                    key={'Buttons' + index}
                                    index={index}
                                    button={button}
                                    editButtons={editButtons}
                                    deleteButtons={deleteButtons}
                                />
                            ))
                        }
                        <button onClick={addButtons} className="options-buttons__block-add">
                            <img src={plus} alt="" />
                        </button>
                    </div>

                    <div className="options-timesleeps">
                        <h2 className="options-timesleeps__title">Timesleeps</h2>
                        <div className="options-timesleeps__initial">
                            <p className="options-timesleeps__initial-text">Initial timesleep</p>
                            <div className="options-timesleeps__block-time">
                                <input type="number" value="0.1" className="options-timesleeps__block-time" />
                            </div>
                        </div>
                        {
                            timesleeps.map((timesleep, index) => (
                                <Timesleeps
                                    key={'Timesleeps' + index}
                                    index={index}
                                    timesleep={timesleep}
                                    editTimesleeps={editTimesleeps}
                                    deleteTimesleeps={deleteTimesleeps}
                                />
                            ))
                        }
                        <button onClick={addTimesleeps} className="options-timesleeps__block-add">
                            <img src={plus} alt="" />
                        </button>
                    </div>

                </div>
            </section>
        </div>
    );
}

export default Options;
