import React from "react";
import { useDispatch } from "react-redux";
import { reactionAdded } from "../slices/postSlice";
import { Post } from "../../../../types/Post";
import { AppDispatch } from "../../../../store/store";

const reactions = {
  thumbsUp: "👍",
  wow: "😲",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕",
};

interface ReactionButtonProps {
  post: Post;
}

const ReactionButton: React.FC<ReactionButtonProps> = ({ post }) => {
  const dispatch: AppDispatch = useDispatch();

  const handleReactionClick = (reaction: keyof typeof reactions) => {
    dispatch(reactionAdded({ postId: post.id!, reaction }));
  };

  const reactionButtons = Object.entries(reactions).map(([name, emoji]) => (
    <button
      key={name}
      onClick={() => handleReactionClick(name as keyof typeof reactions)}
    >
      {emoji}{" "}
      {post.reactions && post.reactions[name as keyof typeof post.reactions]}
    </button>
  ));

  return <div>{reactionButtons}</div>;
};

export default ReactionButton;
