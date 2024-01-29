import React from "react";
import LikedUser from "./LikedUser/LikedUser";
import style from "./LikedUserModal.module.scss";
import { Close } from "@mui/icons-material";
function LikedUserModal({ closeFunc, totalLikes }:any) {

  return (
    <div className={style.ModalContainer}>
      <div className={style.Modal}>
        <div className={style.Modal_header}>
          <p>Likes</p>
          <Close onClick={() => closeFunc(false)} />
        </div>

        <div className={style.Modal_list_container}>
          {totalLikes.map((elem:any, index:any) => {
            return <LikedUser userInfo={elem} key={index} />;
          })}

          {
            totalLikes?.length === 0 && <p className={style.Modal_list_container_NoOneLiked}>
              No one liked this post
            </p>
          }
        </div>
      </div>
    </div>
  );
}

export default LikedUserModal;
