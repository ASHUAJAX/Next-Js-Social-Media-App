"use client";
import Header from "@/Components/Header/Header";
import PostCard from "@/Components/PostCard/PostCard";
import AuthChecker from "@/Components/AuthChecker/AuthChecker";
import { apiCallGetFunc } from "@/utils/apiCallFormat";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import style from "./feed.module.scss";

function Feed() {
  const [feeds, setFeeds]: any = useState([]);

  const [dataRequirements, setDataRequirements] = useState({
    page: 1,
    count: 0,
    limit: 10,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchFeeds = async () => {
    setIsLoading(true);
    setError(false);
    try {
      let user_ID = localStorage.getItem("user_ID");

      const apiResp: any = await apiCallGetFunc(
       
        `/api/feeds/id=${user_ID}&page=${dataRequirements.page}&limit=${dataRequirements.limit}`
      );

      if (apiResp) {
        if (apiResp.data?.status === 200) {
          if (apiResp?.data?.feedsResp.length > 0) {
            setFeeds((prev: any) => [...prev, ...apiResp?.data?.feedsResp]);
            // setFeeds((prev: any) => {
            //   const newFeeds = apiResp?.data?.feedsResp || [];

            //   // Combine the previous feeds with the new ones
            //   const combinedFeeds = [...prev, ...newFeeds];

            //   // Create a Set with a custom function to compare objects
            //   const uniqueFeeds = Array.from(
            //     new Set(combinedFeeds.map(JSON.stringify)),
            //     JSON.parse
            //   );

            //   return uniqueFeeds;
            // });

            setDataRequirements((prev) => ({
              ...prev,
              count: apiResp?.data?.count,
            }));
          } else {
          }
        } else {
          throw new Error(apiResp.data.message);
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
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.documentElement.scrollHeight
    ) {
      setDataRequirements((prev) => ({
        ...prev,
        page:
          //1*99%10=9.9
          prev.page * (prev.count % prev.limit) <= prev.count
            ? prev.page + 1
            : prev.page,
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
        {feeds &&
          feeds.map((elem: any, index: any) => {
            return <PostCard PostCardData={elem} key={index} />;
          })}

        {isLoading && (
          <div className={style.loaderContainer}>
            <CircularProgress color="success" />
          </div>
        )}

        {error && <p className={style.feedError}>{error}</p>}
      </div>
    </div>
  );
}

export default Feed;
