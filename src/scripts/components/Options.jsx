import React, { useState, useCallback } from "react";
import cross from "../../img/cross.png";
import plus from "../../img/plus.svg";
import ButtonsBlock from "./ButtonsBlock";
import TimesleepsBlock from "./TimesleepsBlock";

function Options({ active, setActive, block, blockIndex, buttonsBlocks, deleteButtonsBlock, editButtonsBlock, addButtonsBlock }) {
    const [timesleepsBlocks, setTimesleepsBlocks] = useState(block.timesleeps);
    //---------------------------Timesleeps----------------------------------------//

    const addTimesleepsBlock = useCallback(() => {
        if (timesleepsBlocks.length !== 5) {
            setTimesleepsBlocks([...timesleepsBlocks, { input: "" }]);
        }
    }, [timesleepsBlocks]);

    const editTimesleepsBlock = useCallback(
        (newBlock, blockIndex) => {
            let newTimesleepsBlocks = [...timesleepsBlocks]
            newTimesleepsBlocks.splice(blockIndex, 1, newBlock)
            setTimesleepsBlocks(newTimesleepsBlocks)
        },
        [timesleepsBlocks]
    );

    const deleteTimesleepsBlock = useCallback(
        (index) => {
            setTimesleepsBlocks(timesleepsBlocks.filter((block, blockIndex) => blockIndex !== index))
        },
        [timesleepsBlocks]
    );

    const handleAddButtonsBlock = () => {
        addButtonsBlock(block)
    }

    return (
        <>
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
                        <input placeholder="Enter text..." type="text" className="options-container__input" />
                    </div>
                    <div className="options-container options-container2">
                        <div className="options-container__name">
                            <p>Text</p>
                        </div>
                        <input placeholder="Enter text..." type="text" className="options-container__input" />
                    </div>
                    <div className="options-box">

                        <div className="options-buttons">
                            <h2 className="options-buttons__title">Buttons</h2>
                            {
                                buttonsBlocks.map((buttonsBlock, index) => (
                                    <ButtonsBlock
                                        key={'ButtonsBlock' + blockIndex}
                                        buttonsBlock={buttonsBlock}
                                        blockIndex={index}
                                        editBlock={editButtonsBlock}
                                        deleteBlock={deleteButtonsBlock}
                                    />
                                ))
                            }
                            <button onClick={handleAddButtonsBlock} className="options-buttons__block-add">
                                <img src={plus} alt="" />
                            </button>
                        </div>

                        {/* -------------------------------------------------------------------- */}

                        <div className="options-timesleeps">
                            <h2 className="options-timesleeps__title">Timesleeps</h2>
                            <div className="options-timesleeps__initial">
                                <p className="options-timesleeps__initial-text">Initial timesleep</p>
                                <div className="options-timesleeps__block-time">
                                    <p>1</p>
                                </div>
                            </div>
                            {
                                timesleepsBlocks.map((block, index) => (
                                    <TimesleepsBlock
                                        key={'TimesleepsBlock' + blockIndex}
                                        block={block}
                                        blockIndex={index}
                                        editBlock={editTimesleepsBlock}
                                        deleteBlock={deleteTimesleepsBlock}
                                    />
                                ))
                            }
                            <button onClick={addTimesleepsBlock} className="options-timesleeps__block-add">
                                <img src={plus} alt="" />
                            </button>
                        </div>

                    </div>
                </section>
            </div>
        </>
    );
}

export default Options;
