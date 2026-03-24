import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { YOUTUBE_SEARCH_RESULTS_API } from "../utils/constants";
import VideoCart from "./VideoCart";
import ShimmerVideoCard from "./ShimmerVideoCard";
import ErrorState from "./ErrorState";

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search_query") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setResults([]);
        setError("");
        return;
      }
      try {
        setLoading(true);
        setError("");
        const data = await fetch(YOUTUBE_SEARCH_RESULTS_API(query));
        if (!data.ok) throw new Error("Request failed");
        const json = await data.json();
        setResults(json.items || []);
      } catch (e) {
        setError("Unable to load search results");
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [query]);

  if (error) return <ErrorState message={error} onRetry={() => window.location.reload()} />;

  return (
    <div className="w-full px-4 py-2">
      <h2 className="mb-4 text-lg font-semibold">Results for "{query}"</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {results.map((video) => {
          const videoId = video?.id?.videoId || video?.id;
          if (!videoId) return null;
          const data = {
            id: videoId,
            snippet: video.snippet,
            statistics: { viewCount: 0 },
          };
          return (
            <Link key={`${video.etag}-${videoId}`} to={`/watch?v=${videoId}`}>
              <VideoCart info={data} />
            </Link>
          );
        })}
        {loading && Array.from({ length: 6 }).map((_, i) => <ShimmerVideoCard key={i} />)}
      </div>
    </div>
  );
};

export default SearchResultsPage;
