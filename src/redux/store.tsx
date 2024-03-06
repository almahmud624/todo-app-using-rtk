import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import todoReducer from "./features/todos/todoSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todo: todoReducer,
  },
});

// Infer the store type for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
