import React, { useState, useEffect, useCallback } from "react";

import cross from "../../images/cross.png";

function Timesleeps({ index, timesleep, deleteTimesleep, editTimesleep }) {
    const { name, input, value } = timesleep

    const [timesleepValue, setTimesleepValue] = useState(value);
    const [timesleepInput, setTimesleepInput] = useState(input);

    const handleInputChange = (event) => {
        setTimesleepInput(event.target.value);
    };
    const handleValueChange = (event) => {
        setTimesleepValue(event.target.value);
    };

    const handleEdit = useCallback(() => {
        editTimesleep({ name: name, input: timesleepInput, value: Number(timesleepValue) }, index);
        setTimesleepInput(timesleepInput || input);
        setTimesleepValue(timesleepValue || value);
    }, [timesleepInput, timesleepValue]);

    const handleDelete = () => {
        deleteTimesleep(index);
    };

    useEffect(() => {
        setTimesleepInput(input);
    }, [input]);

    return (
        <div className="options-timesleeps__block-wrapper">
            <div className="options-timesleeps__block">
                <div className="options-timesleeps__block-name">{name}</div>
                <input onChange={handleInputChange} onBlur={handleEdit} value={timesleepInput} placeholder="Enter text..." type="text" />
                <div className="options-timesleeps__block-time">
                    <input onChange={handleValueChange} onBlur={handleEdit} value={timesleepValue} type="number" />
                </div>
            </div>
            <div className="options-buttons__block-line"></div>
            <button onClick={handleDelete} type="submit" className="options-timesleeps__block-delete">
                <img src={cross} alt="" />
            </button>
        </div>
    );
}

export default Timesleeps;
