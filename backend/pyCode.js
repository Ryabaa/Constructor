const createPyCode = (date, time, data) => {
    return `
from logging import lastResort
import telebot
import time
import json
from telebot import types
# ------------------------------------------------------------------------------------------------
data = json.loads("""${data}""")
# ------------------------------------------------------------------------------------------------
bot_settings = data["bot_settings"]
# ------------------------------------------------------------------------------------------------
TOKEN = bot_settings["token"]
bot = telebot.TeleBot(TOKEN)
# ------------------------------------------------------------------------------------------------
# Cюда ставим кейворд и содержимое [1 - ответ 2 - наличие слиптайма , 3,4,5,6 - кнопки(не более 4шт)]
bot_commands = data["bot_commands"]

# Сюда ставим тайминги , 1 тайминг - время через которое придет основное сообщение, остальные уже к доп. сообщению относятся]
sleep_times = data["sleep_times"]
# А сюда вставляем текста, каждый текст относится к своему таймингу , но 1 текст относится ко 2 таймингу , 2 текст к 3 , выше сказано почему]
slt_texts = data["slt_texts"]
# Cюда строки "Имя блока который является кастомный","еще 1 такой же"]
custom_code_blocks = data["custom_code_blocks"]

# ------------------------------------------------------------------------------------------------


@bot.message_handler(commands=['start'])
def start(message):
    markup = types.ReplyKeyboardMarkup(resize_keyboard=True)
    item1 = types.KeyboardButton(bot_settings["firstBtn"])
    markup.add(item1)
    bot.send_message(message.chat.id, bot_settings["startMsg"].format(
        message.from_user), reply_markup=markup)
    
# ------------------------------------------------------------------------------------------------
@bot.message_handler(content_types=['text'])
def bot_message(message):
    if message.text in bot_commands:
        markup = types.ReplyKeyboardMarkup(resize_keyboard=True)
        if len(bot_commands[message.text]) == 3:
            item1 = types.KeyboardButton(bot_commands[message.text][2])
            markup.add(item1)
        if len(bot_commands[message.text]) == 4:
            item1 = types.KeyboardButton(bot_commands[message.text][4])
            item2 = types.KeyboardButton(bot_commands[message.text][3])
            markup.add(item1, item2)
        if len(bot_commands[message.text]) == 5:
            item1 = types.KeyboardButton(bot_commands[message.text][2])
            item2 = types.KeyboardButton(bot_commands[message.text][3])
            item3 = types.KeyboardButton(bot_commands[message.text][4])
            markup.add(item1, item2, item3)
        if len(bot_commands[message.text]) == 6:
            item1 = types.KeyboardButton(bot_commands[message.text][2])
            item2 = types.KeyboardButton(bot_commands[message.text][3])
            item3 = types.KeyboardButton(bot_commands[message.text][4])
            item4 = types.KeyboardButton(bot_commands[message.text][5])
            markup.add(item1, item2, item3, item4)
# ------------------------------------------------------------------------------------------------
        if bot_commands[message.text][1] == 'sleep': 
            time.sleep(sleep_times[message.text][0])
            bot.send_message(
                message.chat.id, bot_commands[message.text][0], reply_markup=markup)
            if len(slt_texts[message.text]) == 1:
                time.sleep(sleep_times[message.text][0])
                bot.send_message(
                    message.chat.id, slt_texts[message.text][0], reply_markup=markup)
            if len(slt_texts[message.text]) == 2:
                time.sleep(sleep_times[message.text][1])
                bot.send_message(
                    message.chat.id, slt_texts[message.text][0], reply_markup=markup)
                time.sleep(sleep_times[message.text][2])
                bot.send_message(
                    message.chat.id, slt_texts[message.text][1], reply_markup=markup)
            if len(slt_texts[message.text]) == 3:
                time.sleep(sleep_times[message.text][1])
                bot.send_message(
                    message.chat.id, slt_texts[message.text][0], reply_markup=markup)
                time.sleep(sleep_times[message.text][2])
                bot.send_message(
                    message.chat.id, slt_texts[message.text][1], reply_markup=markup)
                time.sleep(sleep_times[message.text][3])
                bot.send_message(
                    message.chat.id, slt_texts[message.text][2], reply_markup=markup)
            if len(slt_texts[message.text]) == 4:
                time.sleep(sleep_times[message.text][1])
                bot.send_message(
                    message.chat.id, slt_texts[message.text][0], reply_markup=markup)
                time.sleep(sleep_times[message.text][2])
                bot.send_message(
                    message.chat.id, slt_texts[message.text][1], reply_markup=markup)
                time.sleep(sleep_times[message.text][3])
                bot.send_message(
                    message.chat.id, slt_texts[message.text][2], reply_markup=markup)
                time.sleep(sleep_times[message.text][4])
                bot.send_message(
                    message.chat.id, slt_texts[message.text][3], reply_markup=markup)
            if len(slt_texts[message.text]) == 5:
                time.sleep(sleep_times[message.text][1])
                bot.send_message(
                    message.chat.id, slt_texts[message.text][0], reply_markup=markup)
                time.sleep(sleep_times[message.text][2])
                bot.send_message(
                    message.chat.id, slt_texts[message.text][1], reply_markup=markup)
                time.sleep(sleep_times[message.text][3])
                bot.send_message(
                    message.chat.id, slt_texts[message.text][2], reply_markup=markup)
                time.sleep(sleep_times[message.text][4])
                bot.send_message(
                    message.chat.id, slt_texts[message.text][3], reply_markup=markup)
                time.sleep(sleep_times[message.text][5])
                bot.send_message(
                    message.chat.id, slt_texts[message.text][4], reply_markup=markup)
# ------------------------------------------------------------------------------------------------
        if not bot_commands[message.text][1] == 'sleep':
            bot.send_message(
                message.chat.id, bot_commands[message.text][0], reply_markup=markup)
    if message.text in custom_code_blocks:
        #стираем pass и ебашим свой абсолютно любой код
        pass
    else:
        if message.text not in bot_commands:
            if message.text not in custom_code_blocks:
                bot.send_message(message.chat.id, f"{message.text} - неизвестная команда")
# ------------------------------------------------------------------------------------------------
bot.polling(none_stop=True)
# ---------------------------------- Cthulhu Telebot Constructor ---------------------------------
# Собрано: ${date}, в ${time}
##################################################################################################
#                                                                                                #
#    %$$$$%    $$$$$$$$$$  $$     $$   $$       $$   $$    $$$$$$$$$$  $$     $$   $$       $$   #
#   $%     %$      $$      $$     $$   $$       $$   $$        $$      $$     $$   $$       $$   #
#   $$             $$      $$%%%%%$$   $$       %$   $$        $$      $$%%%%%$$   $$       $%   #
#   $$             $$      $$     $$   $$       $%   $$        $$      $$     $$   $$       $%   #
#   $%     %$      $$      $$     $$    $$     %$    $$        $$      $$     $$    $$     %$    #
#    %$$$$%        $$      $$     $$     $$%$$$      $$$$$$$   $$      $$     $$     $$%$$$      #
#                                                                                                #
###############################################TG#################################################
`
}
module.exports = createPyCode;