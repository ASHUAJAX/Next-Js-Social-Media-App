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
import LikedUserModal from "./LikedUserModal/LikedUserModal";
function PostCard({ PostCardData }:any) {
  const [isReadMore, setIsReadMore] = useState(true);

  const [window_URL, set_window_URL]: any = useState();

  const [isUserLiked, setIsUserLiked] = useState(PostCardData?.likedByUsers?.some((obj:any) => obj._id === localStorage.getItem("user_ID")));
  const [totalLikes, setTotalLikes]: any = useState(0);

  const [showLikedModal, setShowLikedModal] = useState(false);

  const isReadMoreFunc = () => {
    setIsReadMore(!isReadMore);
  };

  const likeFunc = async (dataForUpdate: any) => {
    try {
      const apiResp = await apiCallPutFunc(
        window_URL,
        `/api/feeds`,
        dataForUpdate
      );

      if (apiResp?.data?.error) {
        throw new Error(apiResp?.data?.error);
      } else if (apiResp?.data?.status === 200) {
       

        //like checker
        let likedByUsersArr: string[] =
          apiResp?.data?.updatedDocument.likedByUsers;
        setTotalLikes(likedByUsersArr);
        if (dataForUpdate.isLiked) {
          setIsUserLiked(true);
        } else {
          setIsUserLiked(false);
        }
      } else {
        throw new Error(apiResp?.data?.message);
      }
    } catch (err: any) {
      // console.log(err.message);
    }
  };

  useEffect(() => {
    set_window_URL(window.location.href);

    setTotalLikes(PostCardData?.likedByUsers);
    
    
  
    
  
   
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
          {isUserLiked  ? (
            <FavoriteIcon
              onClick={() => {
                likeFunc({
                  post_id: PostCardData._id,
                  user_obj: {
                    _id: localStorage.getItem("user_ID"),
                    userName: localStorage.getItem("userName"),
                    userImg: localStorage.getItem("userImg"),
                    name: localStorage.getItem("name"),
                  },
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
                  user_obj: {
                    _id: localStorage.getItem("user_ID"),
                    userName: localStorage.getItem("userName"),
                    userImg: localStorage.getItem("userImg"),
                    name: localStorage.getItem("name"),
                  },
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
        <p
          className={style.postCard_totalLikes}
          onClick={() => {
            setShowLikedModal(true);
          }}
        >
          {totalLikes?.length} likes
        </p>
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
          {showLikedModal && (
            <LikedUserModal
              totalLikes={totalLikes}
              closeFunc={setShowLikedModal}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default PostCard;
