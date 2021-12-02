const express = require('express')
const pyCode = require("./pyCode.js");
const fs = require("fs");
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

const handler = (req, res) => {
    console.log(req.body)

    let time = new Date().toLocaleTimeString()
    let date = new Date().toLocaleDateString()
    /*     fs.writeFile(`${data.filePath}`, `${pyCode(date, time, data)}`, (err) => {
            if (err) {
                console.log(err);
                return;
            }
        }); */

    res.send("Succes");
}

app.use("/data", handler);

app.listen(8000, () => {
    console.log(`Сервер запущен: http://localhost:8000`);
});