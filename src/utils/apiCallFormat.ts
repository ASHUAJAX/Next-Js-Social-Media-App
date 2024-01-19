import axios from "axios";


export const apiCallPostFunc = async (url:string,data:object) => {
    const headers = {
        'Content-Type': 'application/json' 
      };
    const apiResp = await axios.post(url,data,{headers});
    console.log(apiResp);
    return apiResp;

  
}