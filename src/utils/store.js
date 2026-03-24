import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import searchSlice from "./searchSlice";
import videosSlice from "./videosSlice";
import chatSlice from "./chatSlice";

const store = configureStore({
   reducer:{
    app:appSlice,
    search: searchSlice,
    videos: videosSlice,
    chat: chatSlice,
   },
});
export default store;