import React from "react";

const ShimmerVideoCard = () => {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl">
      <div className="h-40 rounded-xl bg-gray-300 dark:bg-gray-700" />
      <div className="mt-3 h-4 w-11/12 rounded bg-gray-300 dark:bg-gray-700" />
      <div className="mt-2 h-3 w-1/2 rounded bg-gray-300 dark:bg-gray-700" />
      <div className="mt-2 h-3 w-1/3 rounded bg-gray-300 dark:bg-gray-700" />
    </div>
  );
};

export default ShimmerVideoCard;
