import React, { useContext, useEffect, useState } from "react";
import { installPromtContext } from "../../context/InstallAppContext";
import { IoIosArrowDown } from "react-icons/io";

function InstallApp() {
  const { deferredPrompt, setDeferredPrompt } = useContext(installPromtContext);
  const [showButton, setShowButton] = useState(false);

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

  useEffect(() => {
    const isInStandaloneMode =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    if (isInStandaloneMode) {
      setShowButton(false);
    } else if (deferredPrompt) {
      setShowButton(true);
    }
  }, [deferredPrompt]);

  return (
    showButton && (
      <div className=" fixed bottom-6 right-6 flex flex-col items-center gap-2">
        <span>
          <p className="text-text-primary-light dark:text-text-primary-dark  ">
            Click install button to download the web app.
          </p>
        </span>
        <span>
          <IoIosArrowDown
            size={25}
            className="animate-bounce text-text-primary-light dark:text-text-primary-dark"
          />
        </span>

        <button
          onClick={handleInstall}
          title="Install the app"
          className="border-none outline-none text-text-muted-light dark:text-text-muted-dark cursor-pointer hover:underline bg-primary rounded-lg px-4 py-1"
        >
          Install App
        </button>
      </div>
    )
  );
}

export default InstallApp;
