const GOOGLE_API_KEY = "AIzaSyATftgymZyOSJI43PutFTo1sj441xClO74"

export const YOUTUBE_VIDEO_API =  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics%2CtopicDetails&maxResults=50&chart=mostPopular&regionCode=IN&key="+
GOOGLE_API_KEY;

export const YOUTUBE_SEARCH_API = 
"https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";

export const YOUTUBE_VIDEO_DETAILS_API = (videoId) =>
  `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${GOOGLE_API_KEY}`;

export const YOUTUBE_RECOMMENDED_API = (videoId) =>
  `https://youtube.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${videoId}&type=video&maxResults=20&key=${GOOGLE_API_KEY}`;

export const YOUTUBE_SEARCH_RESULTS_API = (query) =>
  `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&type=video&q=${encodeURIComponent(
    query
  )}&key=${GOOGLE_API_KEY}`;