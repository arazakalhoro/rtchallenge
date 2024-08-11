import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

export default function AuthLayout() {
  if (localStorage.getItem("token")) {
    return <Navigate to="/dashboard" />;
  } else{
    return (
        <>
          <Outlet/>
        </>
    )
  }
}
