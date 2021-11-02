import axios from "axios";

export default async function updatePhoto(data, id) {
    try {
        const res = await axios({
            method: "put",
            url: "http://localhost:8080/photo/" + id,
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