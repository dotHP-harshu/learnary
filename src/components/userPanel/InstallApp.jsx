import React, { useEffect, useState } from "react";

function InstallApp() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      showButton(true);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        console.log("User accepted ");
      }
      setDeferredPrompt(null);
      setShowButton(false);
    }
  };

  return (
    <div>
      {showButton && (
        <button
          title="Install the app"
          className="border-none outline-none text-text-muted-light dark:text-text-muted-dark cursor-pointer hover:underline"
        >
          Install App
        </button>
      )}
    </div>
  );
}

export default InstallApp;
