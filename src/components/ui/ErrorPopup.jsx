import React, { useEffect, useState } from "react";

function ErrorPopup({ msg, setError }) {
  const [isShowing, setIsShowing] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setError(null);
      setIsShowing(false);
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    isShowing && (
      <p className="fixed top-6 left-1/2 -translate-x-1/2 w-fit border-2 border-warning text-warning text-sm bg-surface-light dark:bg-surface-dark px-4 py-2 rounded-lg z-50">
        {msg}
      </p>
    )
  );
}

export default ErrorPopup;
