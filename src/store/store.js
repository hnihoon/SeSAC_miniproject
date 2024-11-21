import { configureStore } from "@reduxjs/toolkit";
import authReduce from "./slices/authSlice";
import postsReduce from "./slices/genreSlice";

const store = configureStore({
  reducer: {
    auth: authReduce,
    posts: postsReduce,
  },
});

export default store;
