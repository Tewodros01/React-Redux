import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RootState } from "../../../../store/store";
import { selectUserById } from "../slice/usersSlice";
import { selectPostByUser } from "../../post/slices/postSlice";

const UserPage: React.FC = () => {
  const { userId } = useParams();

  const user = useSelector((state: RootState) =>
    selectUserById(state, Number(userId))
  );

  const postsForUser = useSelector((state: RootState) =>
    selectPostByUser(state, Number(userId))
  );

  const postTitles = postsForUser.map((post) => (
    <li key={post.id} className="mb-4">
      <Link
        to={`/post/${post.id}`}
        className="text-blue-500 hover:underline transition duration-300"
      >
        {post.title}
      </Link>
    </li>
  ));

  return (
    <section className="max-w-2xl mx-auto mt-20 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">
        {user?.name}'s Posts
      </h2>
      <ul>{postTitles}</ul>
    </section>
  );
};

export default UserPage;
