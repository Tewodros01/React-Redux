import React, { useState } from "react";
import { useDeleteTodoMutation, useGetTodosQuery } from "../api/todoApi";
import TodoForm from "./TodoForm";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const Todo: React.FC = () => {
  const { data: todos, isLoading, isSuccess, isError } = useGetTodosQuery();
  const [deleteTodoMutation] = useDeleteTodoMutation();

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isTodoFormVisible, setIsTodoFormVisible] = useState(false);

  const toggleTodoForm = async () => {
    try {
      setIsTodoFormVisible(!isTodoFormVisible);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleUpdateTodo = async (id: number) => {
    try {
      const todoToUpdate = todos!.find((todo) => todo.id === id);
      if (todoToUpdate) {
        setSelectedTodo(todoToUpdate);
        setIsTodoFormVisible(true);
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      const result = await deleteTodoMutation(id);
      console.log("Deleted Todo:", result);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Todo App</h1>
        <ul>
          {todos &&
            todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between border p-2 mb-2"
              >
                <div>
                  <strong>{todo.title}</strong>
                  <p
                    className={
                      todo.completed ? "text-green-500" : "text-red-500"
                    }
                  >
                    {todo.completed ? "Completed" : "Not Completed"}
                  </p>
                </div>
                <div>
                  <button
                    className="bg-yellow-500 text-white p-2 mr-2"
                    onClick={() => handleUpdateTodo(todo.id)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white p-2"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    );
  } else if (isError) {
    content = <p>{"Error fetching todos"}</p>;
  }

  return (
    <section className=" mt-20 mx-auto p-4">
      <div className="flex mb-4 justify-end">
        <button
          className="bg-blue-500 text-white p-2 ml-2"
          onClick={toggleTodoForm}
        >
          Add Todo
        </button>
      </div>
      {isTodoFormVisible && (
        <TodoForm onClose={toggleTodoForm} todo={selectedTodo} />
      )}
      {content}
    </section>
  );
};

export default Todo;
