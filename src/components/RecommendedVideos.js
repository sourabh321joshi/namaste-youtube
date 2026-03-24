import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { YOUTUBE_RECOMMENDED_API } from "../utils/constants";
import { timeAgo } from "../utils/formatters";

const RecommendedVideos = ({ videoId }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchRecommended = async () => {
      const data = await fetch(YOUTUBE_RECOMMENDED_API(videoId));
      const json = await data.json();
      setVideos(json.items || []);
    };
    if (videoId) fetchRecommended();
  }, [videoId]);

  return (
    <aside className="space-y-2">
      {videos.map((video) => (
        <Link
          key={video.etag}
          to={`/watch?v=${video.id.videoId}`}
          className="flex gap-2 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <img
            src={video.snippet.thumbnails.medium.url}
            alt={video.snippet.title}
            className="h-20 w-36 rounded-lg object-cover"
          />
          <div>
            <p className="h-10 overflow-hidden text-sm font-semibold">{video.snippet.title}</p>
            <p className="text-xs text-gray-500">{video.snippet.channelTitle}</p>
            <p className="text-xs text-gray-500">{timeAgo(video.snippet.publishedAt)}</p>
          </div>
        </Link>
      ))}
    </aside>
  );
};

export default RecommendedVideos;
