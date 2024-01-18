import React from 'react'
import style from  "./Header.module.scss"
import Avatar from '@mui/material/Avatar';
import userImage from "../../assets/images/userImage.jpeg"
import Image from 'next/image';

function Header() {
    return (
        <div className={style.header_wrapper}>
            <div className={style.header_container}>
                <Avatar className={""} sx={{ width: 50, height: 50 }}>
                    <Image src={userImage} alt={"userImg"} layout="fill"  />
                </Avatar>
   <div className={style.header_userDetails}>
    <p className={style.header_userDetails_username}>Alpha_Aj__</p>
    <p className={style.header_userDetails_realName}>Ashu Jha</p>
   </div>
   <button className={style.header_user_logout_btn}>Logout</button>
            </div>
        </div>
    )
}

export default Header