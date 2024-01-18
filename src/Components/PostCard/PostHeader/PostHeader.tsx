import React from 'react';
import style from "./PostHeader.module.scss";
import { Avatar } from '@mui/material';
import Image from 'next/image';
import postHeaderImage from "../../../assets/images/postImageDemo.jpg";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
function PostHeader() {
    return (
        <div className={style.PostHeader}>
            <Avatar className={""} sx={{ width: 35, height: 35 }}>
                <Image src={postHeaderImage} alt={"postHeaderImage"}  layout="fill" />
            </Avatar>
            <p className={style.PostHeader_admin_name}>idioticfeeds</p>
            <div className={style.PostHeader_time_dot}></div>
         <p className={style.PostHeader_time}>22h</p>

         <div className={style.PostHeader_threeDots}>
          <MoreHorizIcon/>
         </div>
        </div>
    )
}

export default PostHeader