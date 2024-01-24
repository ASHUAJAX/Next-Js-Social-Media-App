"use client";
import Header from "@/Components/Header/Header";
import PostCard from "@/Components/PostCard/PostCard";

import style from "./feed.module.scss";
import AuthChecker from "@/Components/AuthChecker/AuthChecker";
import { useEffect, useState } from "react";
import { apiCallGetFunc } from "@/utils/apiCallFormat";
import { CircularProgress } from "@mui/material";

function feed() {
  const [feeds, setFeeds]: any = useState([]);
  // const [page, setPage] = useState(1);
  // const[count,setCount]=useState(0);
  const [dataRequirements, setDataRequirements] = useState({
    page: 1,
    count: 0,
    limit: 10,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchFeeds = async () => {
    setIsLoading(true);
    try {
      let user_ID = localStorage.getItem("user_ID");

      const apiResp: any = await apiCallGetFunc(
        window.location.href,
        `/api/feeds/id=${user_ID}&page=${dataRequirements.page}&limit=${dataRequirements.limit}`
      );

      if (apiResp) {
        if (apiResp.data?.status === 200) {
          if (apiResp?.data?.feedsResp.length > 0) {
            setFeeds((prev: any) => [...prev, ...apiResp?.data?.feedsResp]);

            setDataRequirements((prev) => ({
              ...prev,
              count: apiResp?.data?.count,
            }));
          } else {
            throw new Error("Some error occurred in fetching the feeds");
          }
        } else {
          throw new Error("Some error occurred in fetching the feeds");
        }
      } else {
        throw new Error("Some error occurred in fetching the feeds");
      }
    } catch (err: any) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  const hadleInfiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      // setPage((prev) => (prev*5 < count) ? prev + 1 : prev);

      setDataRequirements((prev) => ({
        ...prev,
        page: prev.page * 10 < prev.count ? prev.page + 1 : prev.page,
      }));
    }
  };
  
  useEffect(() => {
    window.addEventListener("scroll", hadleInfiniteScroll);
    return () => window.removeEventListener("scroll", hadleInfiniteScroll);
  }, []);

  useEffect(() => {
    return () => {
      fetchFeeds();
    };
  }, [dataRequirements.page]);

  return (
    <div className="">
      <AuthChecker />
      <Header />

      <div className={style.feedContainer}>
        {error && <p className={style.feedError}>{error}</p>}

        {feeds &&
          feeds.map((elem: any) => {
            return <PostCard PostCardData={elem} />;
          })}

        {isLoading && (
          <div className={style.loaderContainer}>
            <CircularProgress color="success" />
          </div>
        )}
      </div>
    </div>
  );
}

export default feed;
