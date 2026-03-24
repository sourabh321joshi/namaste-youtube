import React, { memo } from "react";
import { formatViews, timeAgo } from "../utils/formatters";

const VideoCart = ({ info }) => {
  if (!info) return null;

  const { snippet = {}, statistics = {} } = info;
  const { channelTitle, title, thumbnails, publishedAt } = snippet;

  return (
    <article className="group rounded-xl p-2 transition hover:bg-gray-100 dark:hover:bg-gray-900">
      <img
        className="h-44 w-full rounded-xl object-cover"
        alt="thumbnail"
        src={thumbnails?.medium?.url || thumbnails?.high?.url}
      />
      <div className="pt-3">
        <h3 className="h-10 overflow-hidden text-sm font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-gray-500">{channelTitle}</p>
        <p className="text-xs text-gray-500">
          {formatViews(statistics.viewCount)} . {timeAgo(publishedAt)}
        </p>
      </div>
    </article>
  );
};

export default memo(VideoCart);
