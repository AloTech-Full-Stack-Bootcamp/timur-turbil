import axios from "axios";

export default async function updatePhoto(data, id) {
    try {
        const res = await axios({
            method: "put",
            url: "https://lit-hamlet-20521.herokuapp.com/photo/" + id,
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