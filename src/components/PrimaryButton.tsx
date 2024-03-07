import React from "react";

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: React.ReactEventHandler;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function PrimaryButton({
  children,
  onClick,
  className,
  type = "button",
}: PrimaryButtonProps) {
  return (
    <button
      type={type}
      className={`rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
