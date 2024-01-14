import { useSelector } from "react-redux";
import {
  getPostsError,
  getPostsStatus,
  selectPostIds,
} from "../slices/postSlice";
import PostExcerpt from "./PostExcerpt";

const PostList: React.FC = () => {
  const orderedPostsIds = useSelector(selectPostIds);
  const postsStatus = useSelector(getPostsStatus);
  const postsError = useSelector(getPostsError);

  let content: React.ReactNode;
  if (postsStatus === "loading") {
    content = <p>"Loading...."</p>;
  } else if (postsStatus === "succeeded") {
    content = orderedPostsIds.map((postId) => (
      <PostExcerpt key={postId} postId={postId} />
    ));
  } else if (postsStatus === "failed") {
    content = <p className="mt-20">{postsError}</p>;
  }

  return (
    <section className="flex justify-between items-center gap-10 px-20 mt-20">
      <div>{content}</div>
    </section>
  );
};

export default PostList;
