import axios from "axios";

export default async function deletePhoto(id) {
    try {
        const res = await axios({
            method: "delete",
            url: "https://lit-hamlet-20521.herokuapp.com/photo/" + id,
            headers: {
                "Content-Type": "application/json",
            },
        })
        return res.data;
    } catch (error) {
        console.error(error);
    }
}