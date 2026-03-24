import React from "react";

const OfflineFallback = () => {
  return (
    <div className="m-5 rounded-xl border border-yellow-300 bg-yellow-50 p-4 text-sm text-yellow-800 dark:border-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300">
      You are offline. Please reconnect to load the latest videos.
    </div>
  );
};

export default OfflineFallback;
