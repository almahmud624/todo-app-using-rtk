"use client";
import { RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  discardEdit,
  updateTodo,
} from "../redux/features/todos/todoSlice"; // Import addTodo action creator
import PrimaryButton from "./PrimaryButton";

const TodoInput = () => {
  const [todoText, setTodoText] = useState("");
  const dispatch = useDispatch();
  const { todos, editingTodoId } = useSelector(
    (state: RootState) => state.todo
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todoText.trim()) {
      dispatch(addTodo(todoText)); // Dispatch action to add todo
      setTodoText(""); // Clear input after submission
    }
  };

  // Update the todo
  const handleUpdate = () => {
    dispatch(updateTodo({ id: editingTodoId, text: todoText }));
    setTodoText("");
  };

  // Set editingTaskId to null
  const handleDiscard = () => {
    dispatch(discardEdit());
    setTodoText("");
  };

  useEffect(() => {
    if (editingTodoId) {
      // find editable todo
      const todo = todos.find((todo) => todo.id === editingTodoId);
      setTodoText(todo?.text ?? "");
    }
  }, [todos, editingTodoId]);
  return (
    <form
      onSubmit={handleSubmit}
      className="flex md:flex-row flex-col items-center gap-2"
    >
      <input
        type="text"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        placeholder="Add a new to-do"
        className="flex-1 w-full rounded-md border border-gray-300 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 px-2"
      />
      {editingTodoId ? (
        <div className="flex gap-1 w-full md:w-auto">
          <PrimaryButton onClick={handleUpdate} className="w-full md:w-auto">
            Update
          </PrimaryButton>
          <PrimaryButton
            onClick={handleDiscard}
            className="bg-red-600 hover:bg-red-700 w-full md:w-auto"
          >
            Discard
          </PrimaryButton>
        </div>
      ) : (
        <PrimaryButton type="submit" className="w-full md:w-auto">
          Add
        </PrimaryButton>
      )}
    </form>
  );
};

export default TodoInput;
