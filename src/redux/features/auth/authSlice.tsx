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
      const { username, email } = action.payload;
      state.isLoggedIn = true;
      state.user = { username, email }; // Save user data in locally
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
