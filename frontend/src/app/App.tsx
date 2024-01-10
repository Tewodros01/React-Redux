import React from "react";
import PostList from "./features/post/components/PostList";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AddPostForm from "./features/post/components/AddPostForm";
import SinglePost from "./features/post/components/SinglePost";
import EditPostForm from "./features/post/components/EditPostForm";

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<PostList />} />
      <Route path="post">
        <Route index element={<AddPostForm />} />
        <Route path=":postId" element={<SinglePost />} />
        <Route path="edit/:postId" element={<EditPostForm />} />
      </Route>
    </Route>
  </Routes>
);

export default App;
