"use client"

import { apiCallPostFunc } from "@/utils/apiCallFormat";
import style from "./login.module.scss";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from "axios";
import { useState } from "react";

function Login() {
  const [isShowPassword, setIsShowPasword] = useState(false);

  const [formData, setFormData] = useState({
    uName: "",
    pass: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const onChangeFunc = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value })
  }

  const submitFunc = async (event: any) => {
    event.preventDefault();
   
    setIsLoading(true);
    try {

      
debugger
      let data = {...formData};
      const url = "/api/login"

    const apiResp = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
 


      if (apiResp) {
        console.log(apiResp);
      } else {
         throw new Error("Some Error Occure")
      }

    } catch (err: any) {
      console.log(err.message)
    }
  }

  return (
    <div className={style.loginwrapper}>
      <div className={style.loginFormWrapper}>
        <form className={style.loginForm} onSubmit={submitFunc}>
          <h1 className={style.loginForm_heading}>Hello Dev!</h1>
          <p className={style.loginForm_para}>Welcome Back You,ve<br /> been missed!</p>
          <input className={style.loginForm_input_username} name="uName" onChange={onChangeFunc} type="text" placeholder="Enter your username" /><br />
          <input className={style.loginForm_input_password} name="pass" onChange={onChangeFunc} type={isShowPassword ? "text" : "password"} placeholder="Enter your password" />
          <div className={style.loginForm_input_password_wrapper}>
            {
              isShowPassword ? <VisibilityOffIcon className={style.loginForm_input_password_eye_icon} onClick={() => {
                setIsShowPasword(!isShowPassword);
              }} /> : <RemoveRedEyeIcon className={style.loginForm_input_password_eye_icon} onClick={() => {
                setIsShowPasword(!isShowPassword);
              }} />
            }

          </div><br />
          <button className={style.loginForm_submit} type="submit">
            login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login