import React, { useState } from 'react'
import style from  "./Header.module.scss"
import Avatar from '@mui/material/Avatar';
import userImage from "../../assets/images/userImage.jpeg"
import Image from 'next/image';
import { logoutFunc } from '@/utils/logout';
import { useRouter } from 'next/navigation';

function Header() {

const route = useRouter();

const[userData,setUserData]=useState({
    username : localStorage.getItem("userName")?localStorage.getItem("userName"):"",
    userImg : localStorage.getItem("userImg")?localStorage.getItem("userImg"):"",
    name : localStorage.getItem("name")?localStorage.getItem("name"):"",
})

    return (
        <div className={style.header_wrapper}>
            <div className={style.header_container}>
                <Avatar className={""} sx={{ width: 50, height: 50 }}>
                    <Image src={userData.userImg} alt={"userImg"} layout="fill"  />
                </Avatar>
   <div className={style.header_userDetails}>
    <p className={style.header_userDetails_username}>{userData.username}</p>
    <p className={style.header_userDetails_realName}>{userData.name}</p>
   </div>
   <button className={style.header_user_logout_btn} onClick={()=>logoutFunc(route)}>Logout</button>
            </div>
        </div>
    )
}

export default Header