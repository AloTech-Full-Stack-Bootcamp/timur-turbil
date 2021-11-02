import axios from "axios";

export default async function postPhoto(data) {
    try {
        const res = await axios({
            method: "post",
            url: "http://localhost:8080/photo",
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