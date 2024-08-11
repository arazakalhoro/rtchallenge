import React from 'react'
import FadeLoader from "react-spinners/FadeLoader";


export default function Loading() {
  return (
    <>
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <FadeLoader
        color={"gold"}
        height={15}
        width={5}
        radius={2}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  </>
  )
}
