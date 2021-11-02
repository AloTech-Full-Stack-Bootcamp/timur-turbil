import axios from "axios";

export default async function postPhoto(data) {
    try {
        const res = await axios({
            method: "post",
            url: "https://lit-hamlet-20521.herokuapp.com/photo",
            data: data,
            headers: {
                "Content-Type": "application/json",
            },
        })
        return res.data;
    } catch (error) {
        console.error(error);
    }
}