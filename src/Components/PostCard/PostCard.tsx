"use client";
import React, { useEffect, useState } from "react";
import PostHeader from "./PostHeader/PostHeader";
import style from "./PostCard.module.scss";
import postImage from "../../assets/images/postImageDemo.jpg";
import Image from "next/image";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import SendIcon from "@mui/icons-material/Send";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { apiCallPutFunc } from "@/utils/apiCallFormat";
function PostCard({ PostCardData }) {
  const [isReadMore, setIsReadMore] = useState(true);

  const [window_URL, set_window_URL]: any = useState();

  const [isUserLiked, setIsUserLiked] = useState(false);
  const [totalLikes, setTotalLikes]:any = useState(0);

  const isReadMoreFunc = () => {
    setIsReadMore(!isReadMore);
  };

  const likeFunc = async (dataForUpdate: object) => {
    try {
      const apiResp = await apiCallPutFunc(
        window_URL,
        `/api/feeds`,
        dataForUpdate
      );

      if (apiResp?.data?.error) {
        throw new Error(apiResp?.data?.error);
      } else if (apiResp?.data?.status === 200) {
        console.log("Liked Successfully", apiResp?.data?.updatedDocument);

        //like checker
        let likedByUsersArr: string[] = apiResp?.data?.updatedDocument.likedByUsers;
        setTotalLikes(likedByUsersArr.length);
        if (likedByUsersArr.includes(PostCardData.user_id)) {
          setIsUserLiked(true);
        } else {
          setIsUserLiked(false);
        }
      } else {
        throw new Error(apiResp?.data?.message);
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    set_window_URL(window.location.href);
  }, []);

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
          {isUserLiked ? (
            <FavoriteIcon
              onClick={() => {
                likeFunc({
                  post_id: PostCardData._id,
                  user_id: PostCardData.user_id,
                  isLiked: false,
                });
              }}
              className={style.postCard_userInteractions_liked}
            />
          ) : (
            <FavoriteBorderIcon
              onClick={() => {
                likeFunc({
                  post_id: PostCardData._id,
                  user_id: PostCardData.user_id,
                  isLiked: true,
                });
              }}
            />
          )}

          <ModeCommentOutlinedIcon />
          <SendIcon className={style.postCard_userInteractions_send} />
          <BookmarkBorderOutlinedIcon
            className={style.postCard_userInteractions_save}
          />
        </div>
        <p className={style.postCard_totalLikes}>{totalLikes} likes</p>
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
