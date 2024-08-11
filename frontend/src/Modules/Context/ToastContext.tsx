import React, { createContext, useContext } from "react";
import { Bounce, toast } from "react-toastify";



type ToastProps = {
  message: string;
  type: string;
  getToast: (
    type: "success" | "error" | "warning" | "info",
    message: string
  ) => void;
};

const ToastContext = createContext<ToastProps | any>("");

type ToastContextProviderProps = {
  children: React.ReactNode;
};

export const useToast = () => {
  return useContext(ToastContext);
};

export default function ToastContextProvider({
  children,
}: ToastContextProviderProps) {
  const getToast = (
    type: "success" | "error" | "warning" | "info",
    message: string
  ) => {
    return toast[type](message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };
  return (
    <ToastContext.Provider value={{ getToast }}>
      {children}
    </ToastContext.Provider>
  );
}
