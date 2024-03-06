"use client";
import Loader from "@/components/Loader";
import { logout } from "@/redux/features/auth/authSlice";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";

export default function Home() {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todo.todos);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setLoading(false);
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [isLoggedIn, router]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <main className="h-screen w-full flex items-center justify-center">
          <button
            className="w-fit absolute right-5 top-5 rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-700"
            onClick={handleLogout}
          >
            Logout
          </button>
          <div className="md:h-[70vh] shadow border w-[calc(100%-10px)] md:w-1/2 p-3 rounded space-y-5 overflow-y-auto">
            <h1 className="text-center text-2xl font-bold">Todo List</h1>
            <TodoInput />
            <TodoList todos={todos} />
          </div>
        </main>
      )}
    </>
  );
}
