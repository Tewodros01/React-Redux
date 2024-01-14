import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../slice/usersSlice";
import { Link } from "react-router-dom";
import { User } from "../../../../types/user";

const UsersList: React.FC = () => {
  const users: User[] = useSelector(selectAllUsers);

  const renderedUsers = users.map((user) => (
    <li key={user.id} className="mb-4">
      <Link
        to={`/user/${user.id}`}
        className="text-blue-500 hover:underline transition duration-300"
      >
        {user.name}
      </Link>
    </li>
  ));

  return (
    <section className="max-w-2xl mx-auto mt-20 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Users</h2>
      <ul>{renderedUsers}</ul>
    </section>
  );
};

export default UsersList;
