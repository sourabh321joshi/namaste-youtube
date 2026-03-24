import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import VideoCart from "./VideoCart";
import ShimmerVideoCard from "./ShimmerVideoCard";
import ErrorState from "./ErrorState";
import OfflineFallback from "./OfflineFallback";
import { fetchPopularVideos } from "../utils/videosSlice";
import useOnlineStatus from "../utils/useOnlineStatus";

const VideoContainer = () => {
  const dispatch = useDispatch();
  const { items, loading, error, nextPageToken } = useSelector((state) => state.videos);
  const isOnline = useOnlineStatus();

  useEffect(() => {
    if (!items.length) dispatch(fetchPopularVideos());
  }, [dispatch, items.length]);

  useEffect(() => {
    const onScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 800;
      if (nearBottom && nextPageToken && !loading) {
        dispatch(fetchPopularVideos(nextPageToken));
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [dispatch, loading, nextPageToken]);

  if (!isOnline) return <OfflineFallback />;
  if (error) return <ErrorState message={error} onRetry={() => dispatch(fetchPopularVideos())} />;

  return (
    <section className="grid grid-cols-1 gap-4 p-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((video) => (
        <Link key={video.id} to={`/watch?v=${video.id}`}>
          <VideoCart info={video} />
        </Link>
      ))}

      {loading &&
        Array.from({ length: 8 }).map((_, idx) => <ShimmerVideoCard key={`shimmer-${idx}`} />)}
    </section>
  );
};

export default VideoContainer;
