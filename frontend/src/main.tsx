import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import App from "./app/App.tsx";
import "./index.css";
import { fetchUsers } from "./app/features/users/slice/usersSlice.ts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { fetchPosts } from "./app/features/post/slices/postSlice.ts";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { todoApi } from "./app/features/todo/api/todoApi.ts";

store.dispatch(fetchPosts());
store.dispatch(fetchUsers());

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApiProvider api={todoApi}>
      {/* <Provider store={store}> */}
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
      {/* </Provider> */}
    </ApiProvider>
  </React.StrictMode>
);
