import React from "react";
import PostList from "./features/post/components/PostList";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import AddPostForm from "./features/post/components/AddPostForm";
import SinglePost from "./features/post/components/SinglePost";
import EditPostForm from "./features/post/components/EditPostForm";
import UsersList from "./features/users/components/UsersList";
import UserPage from "./features/users/components/UserPage";
import Todo from "./features/todo/components/Todo";

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Todo />} />
      {/* <Route index element={<PostList />} /> */}
      <Route path="post">
        <Route index element={<AddPostForm />} />
        <Route path=":postId" element={<SinglePost />} />
        <Route path="edit/:postId" element={<EditPostForm />} />
      </Route>
      <Route path="user">
        <Route index element={<UsersList />} />
        <Route path=":userId" element={<UserPage />} />
      </Route>
    </Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;
