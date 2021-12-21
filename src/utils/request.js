import axios from "axios";

export default async function sendRequest(pyObject) {
    await axios.post("http://localhost:8000/data", pyObject);
    await axios({
        url: "http://localhost:8000/download",
        method: "GET",
        responseType: "blob",
    }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", pyObject.bot_settings.fileName);
        document.body.appendChild(link);
        link.click();
    });
};