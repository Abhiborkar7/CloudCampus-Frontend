// src/components/ErrorToast.tsx
import React from "react";
import { Toast } from "react-hot-toast";

interface ErrorToastProps {
  t: Toast;
  message: string;
  type?: "error" | "success" | "info";
}

export const ErrorToast: React.FC<ErrorToastProps> = ({ t, message, type = "error" }) => {
  let bgColor = "bg-red-500";
  if (type === "success") bgColor = "bg-green-500";
  else if (type === "info") bgColor = "bg-gray-800";

  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } w-full max-w-md mx-auto ${bgColor} text-white px-4 py-3 rounded shadow-lg`}
    >
      {message}
    </div>
  );
};
