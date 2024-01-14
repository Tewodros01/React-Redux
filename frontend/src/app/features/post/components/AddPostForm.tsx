import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAllUsers } from "../../users/slice/usersSlice";
import { addNewPost } from "../slices/postSlice";
import { AppDispatch } from "../../../../store/store";

interface AddPostFormProps {
  // Other props, if any
}

const AddPostForm: React.FC<AddPostFormProps> = () => {
  const navigation = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState<number | undefined>(undefined); // Updated initialization
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const users = useSelector(selectAllUsers);

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
        setAddRequestStatus("pending");
        dispatch(addNewPost({ title, body, userId }));
        setTitle("");
        setBody("");
        setUserId(undefined);
        navigation("/");
      } catch (error) {
        // Handle error if needed
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section className="p-4 max-w-md mx-auto bg-white shadow-md rounded-md mt-20">
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
    </section>
  );
};

export default AddPostForm;
