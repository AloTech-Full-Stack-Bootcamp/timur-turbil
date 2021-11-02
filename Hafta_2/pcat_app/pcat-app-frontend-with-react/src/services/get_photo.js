import axios from "axios";

export default async function getPhoto() {
    try {
        const res = await axios({
            method: "get",
            url: "https://lit-hamlet-20521.herokuapp.com/photo",
        })
        return res.data;
    } catch (error) {
        console.error(`error ${error}`);
    }
}