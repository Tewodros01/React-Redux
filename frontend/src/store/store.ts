import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../app/features/counter/slices/counterSlice";
import postReducer from "../app/features/post/slices/postSlice";
import usersReducer from "../app/features/users/slice/usersSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
