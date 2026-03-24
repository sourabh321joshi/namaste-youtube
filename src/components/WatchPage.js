import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import { YOUTUBE_VIDEO_DETAILS_API } from "../utils/constants";
import { formatViews } from "../utils/formatters";
import RecommendedVideos from "./RecommendedVideos";
import CommentsContainer from "./CommentsContainer";
import LiveChat from "./LiveChat";

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const dispatch = useDispatch();
  const [videoInfo, setVideoInfo] = useState(null);

  useEffect(() => {
    dispatch(closeMenu());
  }, [dispatch]);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      const data = await fetch(YOUTUBE_VIDEO_DETAILS_API(videoId));
      const json = await data.json();
      setVideoInfo(json.items?.[0] || null);
    };
    if (videoId) fetchVideoDetails();
  }, [videoId]);

  return (
    <div className="grid w-full grid-cols-1 gap-5 px-4 pb-6 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <iframe
          className="h-[240px] w-full rounded-xl sm:h-[420px]"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
        <h1 className="mt-4 text-xl font-bold">{videoInfo?.snippet?.title}</h1>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-semibold">{videoInfo?.snippet?.channelTitle}</p>
            <p className="text-sm text-gray-500">1.2M subscribers</p>
          </div>
          <div className="flex gap-2">
            <button className="rounded-full bg-gray-200 px-4 py-2 text-sm dark:bg-gray-700">👍 {formatViews(videoInfo?.statistics?.likeCount)}</button>
            <button className="rounded-full bg-gray-200 px-4 py-2 text-sm dark:bg-gray-700">👎 Dislike</button>
          </div>
        </div>
        <LiveChat />
        <CommentsContainer />
      </div>

      <div className="lg:col-span-4">
        <RecommendedVideos videoId={videoId} />
      </div>
    </div>
  );
};

export default WatchPage;
