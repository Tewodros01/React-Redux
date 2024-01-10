import { Post } from "../../../../types/Post";
import PostAuther from "./PostAuther";
import TimeAgo from "./TimeAgo";
import ReactionButton from "./ReactionButton";
import { Link } from "react-router-dom";

interface PostExcerptProps {
  post: Post;
}

const PostExcerpt: React.FC<PostExcerptProps> = ({ post }) => {
  return (
    <article className="mb-4 p-4 border rounded">
      <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
      <p className="text-gray-700">{post.body.substring(0, 100)}</p>
      <div className="flex justify-between mt-2">
        <div>
          <p>
            <PostAuther userId={post.userId} />
            <TimeAgo timeStamp={post.date} />
          </p>
        </div>
        <div>
          <Link
            className="rounded bg-green-500
           hover:bg-green-700 text-white p-2 mt-4"
            to={`post/${post.id}`}
          >
            View Post
          </Link>
        </div>
      </div>
      <ReactionButton post={post} />
    </article>
  );
};

export default PostExcerpt;
