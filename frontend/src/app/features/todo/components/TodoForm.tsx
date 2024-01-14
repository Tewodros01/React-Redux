import React, { useState } from "react";
import Todo from "./Todo";
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "../api/todoApi";

interface TodoFormProps {
  onClose: () => void;
  todo: Todo | null;
}

const TodoForm: React.FC<TodoFormProps> = ({ onClose, todo }) => {
  const [newTodo, setNewTodo] = useState<string>("");
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  const handleSaveTodo = async () => {
    try {
      if (todo) {
        updateTodo({
          id: todo.id,
          updatedTodo: { title: newTodo, completed: todo.completed },
        });
      } else {
        await addTodo({
          userId: 1,
          title: newTodo,
          completed: false,
        });
      }

      onClose();
    } catch (error) {
      console.error("Error saving todo:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-4 w-96">
        <input
          type="text"
          className="border p-2 w-full mb-4"
          placeholder="Todo Title"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white p-2 mr-2"
            onClick={handleSaveTodo}
          >
            Save
          </button>
          <button className="bg-gray-500 text-white p-2" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoForm;
