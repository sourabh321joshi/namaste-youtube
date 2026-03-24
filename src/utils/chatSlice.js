import { createSlice } from "@reduxjs/toolkit";

const NAMES = ["Aarav", "Emma", "Riya", "Liam", "Noah", "Sophia", "Olivia"];
const MESSAGES = [
  "This stream is fire!",
  "Can you explain that again?",
  "Love this content",
  "Subscribed just now",
  "Watching from India",
  "That was awesome",
  "Great explanation",
];

const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const createRandomMessage = () => ({
  id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
  name: randomItem(NAMES),
  message: randomItem(MESSAGES),
});

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: Array.from({ length: 8 }, createRandomMessage),
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.unshift(action.payload);
      if (state.messages.length > 80) state.messages.pop();
    },
    addRandomMessage: (state) => {
      state.messages.unshift(createRandomMessage());
      if (state.messages.length > 80) state.messages.pop();
    },
    clearChat: (state) => {
      state.messages = [];
    },
  },
});

export const { addMessage, addRandomMessage, clearChat } = chatSlice.actions;
export default chatSlice.reducer;
