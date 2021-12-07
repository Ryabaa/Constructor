import React, { useState } from "react";

function Info({ settings, editSettings }) {
    const [nameInput, setNameInput] = useState("");
    const [tokenInput, setTokenInput] = useState("");
    const [startInput, setStartInput] = useState("");

    const [nameActive, setNameActive] = useState(false);
    const [tokenActive, setTokenActive] = useState(false);
    const [startActive, setStartActive] = useState(false);

    const handleInputChange = (el, event) => {
        switch (el) {
            case "name":
                setNameInput(event.target.value);
                break;
            case "token":
                setTokenInput(event.target.value);
                break;
            case "start":
                setStartInput(event.target.value);
                break;

            default:
                break;
        }
    };

    const handleSave = (el) => {
        switch (el) {
            case "name":
                setNameActive(false);
                break;
            case "token":
                setTokenActive(false);
                break;
            case "start":
                setStartActive(false);
                break;

            default:
                break;
        }
        const newSettings = {
            fileName: nameInput + ".py",
            token: tokenInput,
            startMsg: startInput
        }
        editSettings(newSettings)
    };

    return (
        <div className="info">
            <div className="info-name">
                <p className="info-name__text">{(nameInput || "my_bot") + ".py"}</p>
            </div>
            <div className="info-container">
                <div className={nameActive ? "info-block info-block1 info-block1__active" : "info-block info-block1"}>
                    <input
                        onBlur={() => handleSave("name")}
                        type="text"
                        placeholder="Write bot name..."
                        value={nameInput}
                        onChange={(event) => handleInputChange("name", event)}
                        className={nameActive ? "info-input info-input__active" : "info-input"}
                    />
                    <button onClick={() => setNameActive(true)} className="info-btn info-btn1">
                        Edit name
                    </button>
                </div>

                <div className={tokenActive ? "info-block info-block2 info-block2__active" : "info-block info-block2"}>
                    <input
                        onBlur={() => handleSave("token")}
                        type="text"
                        placeholder="Write bot token..."
                        value={tokenInput}
                        onChange={(event) => handleInputChange("token", event)}
                        className={tokenActive ? "info-input info-input__active" : "info-input"}
                    />
                    <button onClick={() => setTokenActive(true)} className="info-btn info-btn2">
                        Edit token
                    </button>
                </div>

                <div className={startActive ? "info-block info-block3 info-block3__active" : "info-block info-block3"}>
                    <input
                        onBlur={() => handleSave("start")}
                        type="text"
                        placeholder="Write bot start message..."
                        value={startInput}
                        onChange={(event) => handleInputChange("start", event)}
                        className={startActive ? "info-input info-input__active" : "info-input"}
                    />
                    <button onClick={() => setStartActive(true)} className="info-btn info-btn3">
                        Edit start
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Info;
