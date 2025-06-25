import React from "react";
import { Navigate } from "react-router";

function ErrorPage() {
  return (
    <div className="w-full min-h-dvh flex justify-center items-center bg-bg-light dark:bg-bg-dark">
      <div className="p-6 border-2 border-border-light dark:border-border-dark rounded-2xl">
        <h1 className="text-2xl font-bold">404 Page not found</h1>
        <Navigate to={"/collection"}>Go home</Navigate>
      </div>
    </div>
  );
}

export default ErrorPage;
