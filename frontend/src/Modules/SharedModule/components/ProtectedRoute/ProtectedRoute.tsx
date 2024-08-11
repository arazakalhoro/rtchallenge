import React from "react";
import { Navigate } from "react-router-dom";

type ChildrenProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ChildrenProps) {
  if (localStorage.getItem("token")) {
    return children;
  }
  return <Navigate to="/login" />;
}
