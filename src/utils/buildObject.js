export default function buildObject(blocks, settings) {
    let obj = {
        bot_settings: settings,
        bot_commands: {},
        sleep_times: {},
        slt_texts: {},
        custom_code_blocks: [],
    };
    blocks.forEach((block, index) => {
        let commands = [block.answer];
        let sleep_timesValues = [block.initialTimesleep];
        let sleep_texts = [];

        if (block.custom === true) {
            obj.custom_code_blocks.push(block.wiretapping);
        } else {
            obj.bot_commands[block.wiretapping] = commands;
            if (block.sleep === true) {
                obj.sleep_times[block.wiretapping] = sleep_timesValues;
                obj.slt_texts[block.wiretapping] = sleep_texts;
            }

            block.buttons.forEach((i) => {
                commands.push(i.input);
            });
        }

        if (block.sleep === true) {
            if (block.custom === false) {
                commands.splice(1, 0, "sleep");
                block.timesleeps.forEach((i) => {
                    if (i.value !== 0) {
                        sleep_texts.push(i.input);
                        sleep_timesValues.push(i.value);
                    }
                });
            }
        } else {
            commands.splice(1, 0, "");
        }
    });
    return obj;
};