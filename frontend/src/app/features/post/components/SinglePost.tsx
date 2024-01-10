import React from "react";
import { useSelector } from "react-redux";
import { selectPostById } from "../slices/postSlice";
import { RootState } from "../../../../store/store";
import ReactionButton from "./ReactionButton";
import PostAuther from "./PostAuther";
import TimeAgo from "./TimeAgo";
import { Link, useParams } from "react-router-dom";

const SinglePost: React.FC = () => {
  const { postId } = useParams();

  console.log("Post Id In Single Post", postId);
  if (!postId) {
    return (
      <section>
        <h2>Invalide Post Id</h2>
      </section>
    );
  }

  const post = useSelector((state: RootState) =>
    selectPostById(state, Number(postId))
  );

  console.log("Post  In Single Post", post);
  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <article className="mb-4 p-4 border rounded mt-20">
      <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
      <p className="text-gray-700">{post.body.substring(0, 100)}</p>
      <div>
        <p>
          <PostAuther userId={post.userId} />
          <TimeAgo timeStamp={post.date} />
        </p>
      </div>
      <div className="flex justify-between">
        <ReactionButton post={post} />
        <div>
          <Link to={`/post/edit/${post.id}`}>Edit</Link>
        </div>
      </div>
    </article>
  );
};

export default SinglePost;
