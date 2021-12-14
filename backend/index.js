const express = require('express')
const createPyCode = require("./pyCode.js");
const fs = require("fs");
const path = require("path");
const cors = require('cors')
const app = express()

app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Content-Type", 'application/json');
    next();
});
app.use(cors());

let fileName = ""

const dataHandler = (req, res) => {
    let data = req.body
    let jsonData = JSON.stringify(data)

    let time = new Date().toLocaleTimeString()
    let date = new Date().toLocaleDateString()

    fileName = data.bot_settings.fileName
    const pyCode = createPyCode(date, time, jsonData)

    fs.writeFile(fileName, pyCode, (err) => {
        if (err) {
            console.log(err);
            return;
        }
    });
    res.send("Succes");
}

const downloadHandler = (req, res) => {
    res.download(fileName)
}


app.post("/data", dataHandler);
app.get("/download", downloadHandler);

app.listen(8000, () => {
    console.log(`Сервер запущен: http://localhost:8000`);
});