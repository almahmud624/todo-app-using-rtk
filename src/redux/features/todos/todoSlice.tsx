import { createSlice } from "@reduxjs/toolkit";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

const generateId = () => Math.floor(Math.random() * 100000); // Simple ID generation

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
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (index !== -1) {
        state.todos[index].text = action.payload.text;
      }
    },
    removeTodoFromList(state, action) {
      const { todoId, sourceListId } = action.payload;
      state.todos = state.todos.filter(
        (todo) =>
          todo.id !== todoId ||
          todo.completed !== (sourceListId === "completed")
      );
    },
    addTodoToList(state, action) {
      const { todoId, destinationListId } = action.payload;
      const updatedTodo = state.todos.find((todo) => todo.id === todoId);
      if (!updatedTodo) return; // Todo not found, do nothing

      const completed = destinationListId === "completed";
      state.todos = state.todos.map((todo) =>
        todo.id === todoId ? { ...todo, completed } : todo
      );
    },
  },
});

export const {
  addTodo,
  toggleTodo,
  updateTodo,
  addTodoToList,
  removeTodoFromList,
} = todoSlice.actions;
export default todoSlice.reducer;
