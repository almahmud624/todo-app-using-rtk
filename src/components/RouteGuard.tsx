"use client";
import { RootState } from "@/redux/store";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "./Loader";

export default function RouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      redirect("/login");
    }
  }, [isLoggedIn]);
  return isLoggedIn ? children : <Loader />;
}
