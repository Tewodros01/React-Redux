import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPosts,
  getPostsError,
  getPostsStatus,
  selectAllPosts,
} from "../slices/postSlice";
import { AppDispatch } from "../../../../store/store";
import AddPostForm from "./AddPostForm";
import PostExcerpt from "./PostExcerpt";

const PostList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const postsError = useSelector(getPostsError);

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  let content: React.ReactNode;
  if (postsStatus === "loading") {
    content = <p>"Loading...."</p>;
  } else if (postsStatus === "succeeded") {
    const orderedPosts = [...posts].sort((a, b) => {
      if (a.date && b.date) {
        return b.date.localeCompare(a.date);
      }
      // Handle the case where either a.date or b.date is undefined
      return 0;
    });

    content = orderedPosts.map((post, index) => (
      <PostExcerpt key={`${post.id}-${index}`} post={post} />
    ));
  } else if (postsStatus === "failed") {
    content = <p>{postsError}</p>;
  }

  return (
    <section className="flex justify-between gap-10 px-20 mt-20">
      <div>{content}</div>
      <div>
        <AddPostForm />
      </div>
    </section>
  );
};

export default PostList;
