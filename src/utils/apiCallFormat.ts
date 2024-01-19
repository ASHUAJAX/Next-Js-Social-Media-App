import axios from "axios";


export const apiCallPostFunc = async (url:string,data:object) => {

    const apiResp = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

    console.log(apiResp);
}