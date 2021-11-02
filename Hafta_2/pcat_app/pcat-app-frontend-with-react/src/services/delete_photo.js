import axios from "axios";

export default async function deletePhoto(id) {
    try {
        const res = await axios({
            method: "delete",
            url: "http://localhost:8080/photo/" + id,
            headers: {
                "Content-Type": "application/json",
            },
        })
        return res.data;
    } catch (error) {
        console.error(error);
    }
}