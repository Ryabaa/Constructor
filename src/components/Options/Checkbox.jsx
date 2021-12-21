import React, { useEffect, useState, useRef } from "react";

function Checkbox({ editCheckboxes, block, index }) {
    const ref = useRef();
    const { active, name } = block

    const [activeState, setActiveState] = useState(active)

    const handleChange = (event) => {
        if (ref.current.checked) {
            setActiveState(true)
        } else {
            setActiveState(false)
        }
    };

    useEffect(() => {
        editCheckboxes({ name: name, active: activeState }, index);
    }, [activeState])

    return (
        <div className="options-custom">
            <label className="switch">
                <input ref={ref} onChange={handleChange} type="checkbox" />
                <span className="slider"></span>
            </label>
            <div className="options-custom__border"></div>
            <p className="options-custom__text">{name}</p>
        </div>
    )
}

export default Checkbox