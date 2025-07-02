import React, { useEffect, useState } from "react";
import Collection from "./components/collection/Collection";
import Tasks from "./components/tasks/Tasks";
import Signup from "./components/loginPage/Signup";
import { createBrowserRouter, RouterProvider } from "react-router";
import SignIn from "./components/loginPage/SignIn";
import supabase from "./supabase/supabase";
import userContext from "./context/userContext";
import InstallApp from "./components/ui/InstallApp";
import { InstallAppProvider } from "./context/InstallAppContext";

import "./index.css";
import ProtectRoute from "./components/protectRoute/ProtectRoute";
import Loading from "./components/ui/Loading";
import ErrorPage from "./components/ui/ErrorPage";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ⬅️ prevent early redirect

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        setUser(session.user);
      }

      // also listen to auth state changes
      supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user || null);
      });

      setLoading(false); // ⬅️ done loading
    };

    getSession();
  }, []);

  const Router = createBrowserRouter([
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/",
      element: <Signup />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "/collection",
      element: (
        <ProtectRoute>
          <Collection />
          <InstallApp />
        </ProtectRoute>
      ),
    },
    {
      path: "/tasks/:collection_id",
      element: (
        <ProtectRoute>
          <Tasks />
        </ProtectRoute>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <ProtectRoute>
          <Dashboard />
        </ProtectRoute>
      ),
    },
  ]);

  if (loading) {
    return (
      <div className="w-full min-h-dvh bg-bg-light dark:bg-bg-dark text-text-primary-light dark:text-text-primary-dark">
        <Loading />
      </div>
    );
  }

  return (
    <userContext.Provider value={{ user, setUser }}>
      <InstallAppProvider>
        <div className="bg-bg-light dark:bg-bg-dark w-full min-h-dvh">
          {!navigator.onLine && (
            <div className=" w-full flex justify-center items-center p-4 max-sm:scale-90">
              <p className="text-warning border-2 border-warning  px-4 py-2 rounded-lg text-base max-sm:text-sm">
                You are offline. You can not write or update data. We are
                showing the last saved data
              </p>
            </div>
          )}
          <RouterProvider router={Router} />
        </div>
      </InstallAppProvider>
    </userContext.Provider>
  );
}
export default App;
