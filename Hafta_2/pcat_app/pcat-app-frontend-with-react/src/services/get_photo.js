import axios from "axios";

export default async function getPhoto() {
    try {
        const res = await axios({
            method: "get",
            url: "http://localhost:8080/photo",
        })
        return res.data;
    } catch (error) {
        console.error(`error ${error}`);
    }
}