"use client";

import { apiCallPostFunc } from "@/utils/apiCallFormat";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import style from "./login.module.scss";
import { API_BASE_URL } from "@/utils/constant";

function Login() {
  const [isShowPassword, setIsShowPasword] = useState(false);

  const [formData, setFormData] = useState({
    uName: "",
    pass: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onChangeFunc = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const submitFunc = async (event: any) => {
    event.preventDefault();

    setIsLoading(true);
    setError("");

    try {
      let data = { ...formData };
      
      

      const apiResp: any = await apiCallPostFunc(`${API_BASE_URL}/api/login`, data);

      if (apiResp) {
        console.log(apiResp);
        if (apiResp?.data?.error) {
          throw new Error(apiResp?.data?.error);
        } else {

          console.log(apiResp?.data?.message);

        }
      } else {
        throw new Error("Some Error Occure");
      }
    } catch (err: any) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  return (
    <div className={style.loginwrapper}>
      <div className={style.loginFormWrapper}>
        <form className={style.loginForm} onSubmit={submitFunc}>
          <h1 className={style.loginForm_heading}>Hello Dev!</h1>
          <p className={style.loginForm_para}>
            Welcome Back You,ve
            <br /> been missed!
          </p>
          <input
            className={style.loginForm_input_username}
            name="uName"
            onChange={onChangeFunc}
            type="text"
            placeholder="Enter your username"
          />
          <br />
          <input
            className={style.loginForm_input_password}
            name="pass"
            onChange={onChangeFunc}
            type={isShowPassword ? "text" : "password"}
            placeholder="Enter your password"
          />
          <div className={style.loginForm_input_password_wrapper}>
            {isShowPassword ? (
              <VisibilityOffIcon
                className={style.loginForm_input_password_eye_icon}
                onClick={() => {
                  setIsShowPasword(!isShowPassword);
                }}
              />
            ) : (
              <RemoveRedEyeIcon
                className={style.loginForm_input_password_eye_icon}
                onClick={() => {
                  setIsShowPasword(!isShowPassword);
                }}
              />
            )}
          </div>
          <br />
          {
            error && <p className={style.loginForm_submitError}>{error}</p>
          }
          <button className={style.loginForm_submit} type="submit">
            {isLoading ? "logining in..." : "login"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default Login;
