import { useSelector } from "react-redux";
import { selectAllUsers } from "../../users/usersSlice";

interface PostProps {
  userId?: number;
}
const PostAuther: React.FC<PostProps> = ({ userId }) => {
  const users = useSelector(selectAllUsers);
  const auther = users.find((user) => user.id === userId);

  return <span>{auther ? auther.name : "Unknown auther"}</span>;
};

export default PostAuther;
