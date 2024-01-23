"use client";
import Header from "@/Components/Header/Header";
import PostCard from "@/Components/PostCard/PostCard";

import style from "./feed.module.scss";
import AuthChecker from "@/Components/AuthChecker/AuthChecker";
import { useEffect, useState } from "react";
import { apiCallGetFunc } from "@/utils/apiCallFormat";

function feed() {
  const [feeds, setFeeds]: any = useState([]);
  const [page, setPage] = useState(1);

  const fetchFeeds = async () => {
    try {
      let user_ID = localStorage.getItem("user_ID");

      const apiResp: any = await apiCallGetFunc(
        window.location.href,
        `/api/feeds/id=${user_ID}&page=${page}`
      );

      if (apiResp) {
        if (apiResp.data?.status === 200) {
          setFeeds((prev) => [...prev, ...apiResp.data?.feedsResp]);
        } else {
          throw new Error("Some error occurred in fetching the feeds");
        }
      } else {
        throw new Error("Some error occurred in fetching the feeds");
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const hadleInfiniteScroll =()=>{
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll",hadleInfiniteScroll)
    return () => window.removeEventListener("scroll",hadleInfiniteScroll)
  }, []);

  useEffect(() => {
    fetchFeeds();
  }, [page]);

  console.log(feeds);

  return (
    <div className="">
      <AuthChecker />
      <Header />
      <div className={style.feedContainer}>
        {feeds &&
          feeds.map((elem, index) => {
            return <PostCard PostCardData={elem} />;
          })}
      </div>
    </div>
  );
}

export default feed;
