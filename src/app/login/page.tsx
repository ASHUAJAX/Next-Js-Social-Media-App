"use client"

import style from "./login.module.scss";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from "react";

function Login() {
  const [isShowPassword, setIsShowPasword] = useState(false);

  const [formData, setFormData] = useState({
    uName: "",
    pass: ""
  });

  const onChangeFunc = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value })
  }

  const submitFunc = (event: any) => {
    event.preventDefault();
    console.log(formData);
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