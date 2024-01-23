"use client";
import React, { useState } from "react";
import PostHeader from "./PostHeader/PostHeader";
import style from "./PostCard.module.scss";
import postImage from "../../assets/images/postImageDemo.jpg";
import Image from "next/image";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import SendIcon from "@mui/icons-material/Send";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import FavoriteIcon from '@mui/icons-material/Favorite';
function PostCard({ PostCardData }) {
  const [isReadMore, setIsReadMore] = useState(true);

  const isReadMoreFunc = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <div className={style.postCard}>
      <PostHeader PostCardData={PostCardData} />
      <div className={style.postCard_postImg_conatainer}>
        <Image
          className={style.postCard_postImg_conatainer_img}
          src={PostCardData?.postImg}
          alt={"postImg"}
          height={290}
          width={290}
        />
      </div>

      <div className={style.postCard_lower_section}>
        <div className={style.postCard_userInteractions}>
          {
            PostCardData?.likedByMe ? <FavoriteIcon className={style.postCard_userInteractions_liked}/>  : <FavoriteBorderIcon />
          }
         
          <ModeCommentOutlinedIcon />
          <SendIcon className={style.postCard_userInteractions_send} />
          <BookmarkBorderOutlinedIcon
            className={style.postCard_userInteractions_save}
          />
        </div>
        <p className={style.postCard_totalLikes}>{PostCardData?.likes} likes</p>
        <div className={style.postCard_description}>
          <a href="">{PostCardData?.adminProfileName}</a>
          {isReadMore
            ? PostCardData?.description.slice(0, 100)
            : PostCardData?.description}

          {isReadMore ? (
            <span onClick={isReadMoreFunc}>... more</span>
          ) : (
            <span onClick={isReadMoreFunc}>{"<less"}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostCard;
