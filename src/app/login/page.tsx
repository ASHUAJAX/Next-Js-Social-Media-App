"use client";

import { apiCallPostFunc } from "@/utils/apiCallFormat";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import style from "./login.module.scss";

function Login() {
  const [window_URL, set_window_URL]: any = useState();

  const [isShowPassword, setIsShowPasword] = useState(false);

  const [formData, setFormData] = useState({
    uName: "",
    pass: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

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


      if (!formData.uName || !formData.pass) {
        throw new Error("Please fill out all the fields in form!");
      }

      const apiResp: any = await apiCallPostFunc(
        window_URL,
        `/api/login`,
        formData
      );

      if (apiResp) {
        console.log(apiResp);
        if (apiResp?.data?.error) {
          throw new Error(apiResp?.data?.error);
        } else if (apiResp?.data?.status === 200) {
          localStorage.setItem("name", apiResp?.data?.user?.name);
          localStorage.setItem("userImg", apiResp?.data?.user?.userImg);
          localStorage.setItem("userName", apiResp?.data?.user?.userName);
          localStorage.setItem("user_ID", apiResp?.data?.user?._id);

          router.push("/feed");
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

  useEffect(() => {
    set_window_URL(window.location.href);
  }, []);

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
          {error && <p className={style.loginForm_submitError}>{error}</p>}
          <button className={style.loginForm_submit} type="submit">
            {isLoading ? "logining in..." : "login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
