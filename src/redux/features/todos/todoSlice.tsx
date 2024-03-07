import { createSlice } from "@reduxjs/toolkit";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  editingTodoId?: number | null;
}

const initialState: TodoState = {
  todos: [],
  editingTodoId: null,
};

const generateId = () => Math.floor(Math.random() * 100000); // Generating unique ID for each todo

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo(state, action) {
      state.todos.push({
        id: generateId(),
        text: action.payload,
        completed: false,
      });
    },
    toggleTodo(state, action) {
      const index = state.todos.findIndex((todo) => todo.id === action.payload);
      if (index !== -1) {
        state.todos[index].completed = !state.todos[index].completed;
      }
    },
    updateTodo(state, action) {
      const updatedTodo = action.payload;
      const index = state.todos.findIndex((todo) => todo.id === updatedTodo.id);
      if (index !== -1) {
        state.todos[index] = updatedTodo;
      }
      state.editingTodoId = null;
    },
    editableTodo(state, action) {
      const todoId = action.payload;
      state.editingTodoId = todoId;
    },
    discardEdit(state) {
      state.editingTodoId = null;
    },
    deleteTodo(state, action) {
      const todoId = action.payload;
      state.todos = state.todos.filter((todo) => todo.id !== todoId);
    },
  },
});

export const {
  addTodo,
  toggleTodo,
  updateTodo,
  editableTodo,
  discardEdit,
  deleteTodo,
} = todoSlice.actions;
export default todoSlice.reducer;
