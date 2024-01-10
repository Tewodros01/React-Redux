import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deletePost, selectPostById, updatePost } from "../slices/postSlice";
import { AppDispatch, RootState } from "../../../../store/store";
import { selectAllUsers } from "../../users/usersSlice";
import { ChangeEvent, FormEvent, useState } from "react";

const EditPostForm = () => {
  const dispatch: AppDispatch = useDispatch();

  const { postId } = useParams();
  const navigation = useNavigate();

  const post = useSelector((state: RootState) =>
    selectPostById(state, Number(postId))
  );
  const users = useSelector(selectAllUsers);

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [userId, setUserId] = useState<number | undefined>(post.userId);
  const [addRequestStatus, setRequestStatus] = useState("idle");

  const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onBodyChanged = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  const onAuthorChanged = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedUserId =
      e.target.value !== "" ? Number(e.target.value) : undefined;
    setUserId(selectedUserId);
  };

  const canSave =
    [title, body, userId].every(Boolean) && addRequestStatus === "idle";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (canSave) {
      try {
        setRequestStatus("pending");
        dispatch(
          updatePost({
            id: post.id,
            title,
            body,
            userId,
            reactions: post.reactions,
          })
        );
        setTitle("");
        setBody("");
        setUserId(undefined);
        navigation(`/post/${post.id}`);
      } catch (error) {
        // Handle error if needed
      } finally {
        setRequestStatus("idle");
      }
    }
  };

  const onDeletePostClicked = () => {
    try {
      setRequestStatus("pending");
      dispatch(deletePost(post.id!));
      setTitle("");
      setBody("");
      setUserId(undefined);
      navigation(`/`);
    } catch (error) {
    } finally {
      setRequestStatus("idle");
    }
  };
  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section className="p-4 max-w-md mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Add a New Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="postTitle" className="block mb-2 text-sm font-medium">
          Post Title
        </label>
        <input
          type="text"
          id="postTitle"
          value={title}
          onChange={onTitleChanged}
          className="w-full border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none px-3 py-2"
        />

        <label
          htmlFor="postAuthor"
          className="block mt-4 mb-2 text-sm font-medium"
        >
          Author:
        </label>
        <select
          id="postAuthor"
          value={userId !== undefined ? userId : ""}
          onChange={onAuthorChanged}
          defaultValue={userId}
          className="w-full border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none px-3 py-2"
        >
          <option value="">Select Author</option>
          {usersOptions}
        </select>

        <label
          htmlFor="postBody"
          className="block mt-4 mb-2 text-sm font-medium"
        >
          Post Body
        </label>
        <textarea
          id="postBody"
          value={body}
          onChange={onBodyChanged}
          className="w-full border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none px-3 py-2"
        />

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
          disabled={!canSave}
        >
          Save Post
        </button>
      </form>
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
        onClick={onDeletePostClicked}
      >
        Delete Post
      </button>
    </section>
  );
};

export default EditPostForm;
