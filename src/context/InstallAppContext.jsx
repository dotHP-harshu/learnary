import { createContext, useEffect, useState } from "react";

export const installPromtContext = createContext();

export const InstallAppProvider = ({ children }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  return (
    <installPromtContext.Provider value={{ deferredPrompt, setDeferredPrompt }}>
      {children}
    </installPromtContext.Provider>
  );
};
