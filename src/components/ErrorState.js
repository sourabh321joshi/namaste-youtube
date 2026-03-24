import React from "react";

const ErrorState = ({ message, onRetry }) => {
  return (
    <div className="mx-auto my-10 max-w-lg rounded-xl border border-red-300 bg-red-50 p-5 text-red-700 dark:border-red-600 dark:bg-red-900/30 dark:text-red-300">
      <p className="font-semibold">Something went wrong</p>
      <p className="mt-1 text-sm">{message || "Please try again."}</p>
      <button
        onClick={onRetry}
        className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
      >
        Retry
      </button>
    </div>
  );
};

export default ErrorState;
