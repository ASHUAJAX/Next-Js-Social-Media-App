import React, { useEffect, useState } from "react";
import style from "./PostHeader.module.scss";
import { Avatar } from "@mui/material";
import Image from "next/image";
import postHeaderImage from "../../../assets/images/postImageDemo.jpg";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
function PostHeader({ PostCardData }) {
  const [correctPostTime, setCorrectPostTime]: any = useState(false);

  const timeAgo = () => {
    const postDate = new Date(PostCardData?.createdAt);
    const currentDate = new Date();

    let timeDifference = postDate.getTime() - currentDate.getTime();
    let minutesDifference: any = timeDifference / (1000 * 60);
    let hoursDifference: any = timeDifference / (1000 * 60 * 60);
    let daysDifference: any = timeDifference / (1000 * 60 * 60 * 24);

    minutesDifference = parseInt(minutesDifference.toFixed().replace("-", ""));
    hoursDifference = parseInt(hoursDifference.toFixed().replace("-", ""));
    daysDifference = parseInt(daysDifference.toFixed().replace("-", ""));

    if (hoursDifference === 0) {
      console.log(minutesDifference);
      setCorrectPostTime(minutesDifference + " Minutes ago");
    } else if (hoursDifference < 24) {
      setCorrectPostTime(hoursDifference + " Hours ago");
    } else {
      setCorrectPostTime(daysDifference + " days ago");
    }
  };

  useEffect(() => {
    timeAgo();
  }, []);

  return (
    <div className={style.PostHeader}>
      <Avatar className={""} sx={{ width: 35, height: 35 }}>
        <Image
          src={PostCardData?.adminProfileImg}
          alt={"postHeaderImage"}
          layout="fill"
        />
      </Avatar>
      <p className={style.PostHeader_admin_name}>
        {PostCardData?.adminProfileName}
      </p>
      <div className={style.PostHeader_time_dot}></div>
      <p className={style.PostHeader_time}>{correctPostTime}</p>

      <div className={style.PostHeader_threeDots}>
        <MoreHorizIcon />
      </div>
    </div>
  );
}

export default PostHeader;
