import { Avatar } from "@mui/material";
import React from "react";
import style from "./LikedUser.module.scss";
import Image from "next/image";

function LikedUser({ userInfo }) {
  return (
    <div>
      <div className={style.LikedUser_container}>
        <Avatar className={""} sx={{ width: 50, height: 50 }}>
          <Image src={userInfo?.userImg} alt={"userImg"} layout="fill" />
        </Avatar>
        <div className={style.LikedUser_userDetails}>
          <p className={style.LikedUser_userDetails_realName}>
            {userInfo?.name}
          </p>
        </div>

        <button className={style.LikedUser_userDetails_username}>
          {userInfo?.userName}
        </button>
      </div>
    </div>
  );
}

export default LikedUser;
