const GOOGLE_API_KEY = "AIzaSyATftgymZyOSJI43PutFTo1sj441xClO74"

export const YOUTUBE_VIDEO_API =  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics%2CtopicDetails&maxResults=50&chart=mostPopular&regionCode=IN&key="+
GOOGLE_API_KEY;

export const YOUTUBE_SEARCH_API = 
"http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";