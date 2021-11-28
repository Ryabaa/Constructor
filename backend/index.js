const express = require('express')
const bodyParser = require("body-parser");
const pyCode = require("./pyCode.js");
const fs = require("fs");
const app = express()

let time = new Date().toLocaleTimeString()
let date = new Date().toLocaleDateString()


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const handler = (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        let data = req.body
        
        console.log(data);
        fs.writeFile(`${data.filePath}`, `${pyCode(date, time, data)}`, (err) => {
            if (err) {
                console.log(err);
                return;
            }
        });

        res.send("Succes");
}

app.post("/", handler);

app.listen(8000, () => {
    console.log(`Сервер запущен: http://localhost:8000`);
});



