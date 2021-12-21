import React, { useCallback, useState, useEffect } from "react";

import InfoButton from "./InfoButton.jsx"

function createSettings(settingsAmount) {
    const settings = settingsAmount.map((name, index) => {
        let limit = false
        if (index === 0) {
            limit = true
        }

        return {
            name: name, input: "", active: false, limit: limit
        }
    });

    return settings
}

const initialSettings = createSettings(["File Name", "Bot Token", "Start Message", "Start Button"])


function Info({ editSettings }) {
    const [settings, setSettings] = useState(initialSettings)

    const editBlock = useCallback(
        (newBlock, blockIndex) => {
            let newSettings = [...settings];
            newSettings.splice(blockIndex, 1, newBlock);
            setSettings(newSettings);
        },
        [settings]
    );

    const settingsObject = () => {
        let settingsInputs = []

        settings.forEach((block, index) => {
            settingsInputs.push(block.input)
        })

        const settingsObj = {
            fileName: `${settingsInputs[0] || "my_bot"}.py`,
            token: settingsInputs[1],
            startMsg: settingsInputs[2],
            firstBtn: settingsInputs[3],
        }

        return settingsObj
    }

    useEffect(() => {
        editSettings(settingsObject)
    }, [settings])

    return (
        <div className="info">
            <div className="info-name">
                <p className="info-name__text">{(settings[0].input || "my_bot") + ".py"}</p>
            </div>
            <div className="info-container">
                {
                    settings.map((block, index) => (
                        <InfoButton block={block} index={index} editBlock={editBlock} />
                    ))
                }
            </div>
        </div>
    );
}

export default Info;
