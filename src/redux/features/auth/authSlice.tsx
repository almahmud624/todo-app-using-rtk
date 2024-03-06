import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
  user?: { username: string; email: string };
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      // Assuming login logic happens entirely on the client-side (e.g., form validation)
      const { username, email } = action.payload;
      state.isLoggedIn = true;
      state.user = { username, email }; // Save user data locally
      localStorage.setItem("userData", JSON.stringify(state.user));
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = undefined;
      localStorage.removeItem("userData");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
