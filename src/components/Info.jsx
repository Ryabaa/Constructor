import React, { useCallback, useState, useRef } from "react";

function Info({ settings, editSettings }) {
    const refName = useRef()
    const refToken = useRef()
    const refStart = useRef()
    const refButton = useRef()

    const [nameInput, setNameInput] = useState("");
    const [tokenInput, setTokenInput] = useState("");
    const [startInput, setStartInput] = useState("");
    const [buttonInput, setButtonInput] = useState("");

    const [nameActive, setNameActive] = useState(false);
    const [tokenActive, setTokenActive] = useState(false);
    const [startActive, setStartActive] = useState(false);
    const [buttonActive, setButtonActive] = useState(false);

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
            case "button":
                setButtonInput(event.target.value);
                break;

            default:
                break;
        }
    };

    const editingName = useCallback(() => {
        setNameActive(true)
        refName.current.focus();
        refName.current.selectionStart = nameInput.length
    },
        [nameActive],
    )
    const editingToken = useCallback(() => {
        setTokenActive(true)
        refToken.current.focus();
        refToken.current.selectionStart = tokenInput.length
    },
        [tokenActive],
    )
    const editingStart = useCallback(() => {
        setStartActive(true)
        refStart.current.focus();
        refStart.current.selectionStart = startInput.length
    },
        [startActive],
    )
    const editingButton = useCallback(() => {
        setButtonActive(true)
        refButton.current.focus();
        refButton.current.selectionButton = buttonInput.length
    },
        [buttonActive],
    )

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
            case "button":
                setButtonActive(false);
                break;

            default:
                break;
        }
        const newSettings = {
            fileName: nameInput + ".py",
            token: tokenInput,
            startMsg: startInput,
            firstBtn: buttonInput
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
                        ref={refName}
                        maxLength={20}
                        placeholder="Write bot name..."
                        value={nameInput}
                        onChange={(event) => handleInputChange("name", event)}
                        className={nameActive ? "info-input info-input__active" : "info-input"}
                    />
                    <button onClick={editingName} className="info-btn info-btn1">
                        Edit name
                    </button>
                </div>

                <div className={tokenActive ? "info-block info-block2 info-block2__active" : "info-block info-block2"}>
                    <input
                        onBlur={() => handleSave("token")}
                        type="text"
                        ref={refToken}
                        placeholder="Write bot token..."
                        value={tokenInput}
                        onChange={(event) => handleInputChange("token", event)}
                        className={tokenActive ? "info-input info-input__active" : "info-input"}
                    />
                    <button onClick={editingToken} className="info-btn info-btn2">
                        Edit token
                    </button>
                </div>

                <div className={startActive ? "info-block info-block3 info-block3__active" : "info-block info-block3"}>
                    <input
                        onBlur={() => handleSave("start")}
                        type="text"
                        ref={refStart}
                        placeholder="Write bot start message..."
                        value={startInput}
                        onChange={(event) => handleInputChange("start", event)}
                        className={startActive ? "info-input info-input__active" : "info-input"}
                    />
                    <button onClick={editingStart} className="info-btn info-btn3">
                        Edit start
                    </button>
                </div>

                <div className={buttonActive ? "info-block info-block4 info-block4__active" : "info-block info-block4"}>
                    <input
                        onBlur={() => handleSave("button")}
                        type="text"
                        ref={refButton}
                        placeholder="Write button text..."
                        value={buttonInput}
                        onChange={(event) => handleInputChange("button", event)}
                        className={buttonActive ? "info-input info-input__active" : "info-input"}
                    />
                    <button onClick={editingButton} className="info-btn info-btn3">
                        Edit button
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Info;
