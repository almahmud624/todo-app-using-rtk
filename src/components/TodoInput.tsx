"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/features/todos/todoSlice"; // Import addTodo action creator

const TodoInput = () => {
  const [todoText, setTodoText] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todoText.trim()) {
      dispatch(addTodo(todoText)); // Dispatch action to add todo
      setTodoText(""); // Clear input after submission
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-x-2">
      <input
        type="text"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        placeholder="Add a new to-do"
        className="flex-1 w-full rounded-md border border-gray-300 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 px-2"
      />
      <button
        type="submit"
        className="rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 "
      >
        Add
      </button>
    </form>
  );
};

export default TodoInput;
