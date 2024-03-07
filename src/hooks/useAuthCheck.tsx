"use client";
import { login } from "@/redux/features/auth/authSlice";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const useAuthCheck = () => {
  const [authCheck, setAuthCheck] = useState(false);
  const dispatch = useDispatch();

  const checkAuthStatus = useCallback(() => {
    const auth = localStorage.getItem("userData") as string;
    return auth;
  }, []);

  useEffect(() => {
    const parsedData = checkAuthStatus()
      ? JSON.parse(checkAuthStatus())
      : undefined;
    if (parsedData) {
      dispatch(login(parsedData));
    }
    setAuthCheck(true);
  }, [checkAuthStatus, dispatch]);
  return authCheck;
};
