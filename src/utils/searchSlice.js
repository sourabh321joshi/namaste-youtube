import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    suggestionCache: {},
  },
  reducers: {
    cacheSuggestions: (state, action) => {
      state.suggestionCache = {
        ...state.suggestionCache,
        ...action.payload,
      };
    },
  },
});

export const { cacheSuggestions } = searchSlice.actions;
export default searchSlice.reducer;
