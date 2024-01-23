import React from 'react';
import style from "./PostHeader.module.scss";
import { Avatar } from '@mui/material';
import Image from 'next/image';
import postHeaderImage from "../../../assets/images/postImageDemo.jpg";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
function PostHeader({PostCardData}) {
    console.log(PostCardData);
    return (
        <div className={style.PostHeader}>
            <Avatar className={""} sx={{ width: 35, height: 35 }}>
                <Image src={PostCardData?.adminProfileImg} alt={"postHeaderImage"}  layout="fill" />
            </Avatar>
            <p className={style.PostHeader_admin_name}>{PostCardData?.adminProfileName}</p>
            <div className={style.PostHeader_time_dot}></div>
         <p className={style.PostHeader_time}>{PostCardData?.createdAt}</p>

         <div className={style.PostHeader_threeDots}>
          <MoreHorizIcon/>
         </div>
        </div>
    )
}

export default PostHeader