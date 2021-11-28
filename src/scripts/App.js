import React from "react";
import "../styles/style.css";
import "../styles/media/media.css";
import Main from "./components/Main.jsx";
import axios from "axios";

export default function App() {
    const sendRequest = async () => {
        const json = JSON.stringify({ filePath: "./data/bot.py"});
        const res = await axios
            .post("http://localhost:8000/", json)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        return await res;
    }
    return (
        <>
            <button onClick={sendRequest}>AAAAAAAA</button>
            <Main />
        </>
    );
}
