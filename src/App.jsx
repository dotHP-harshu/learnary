import React, { useEffect, useState } from "react";
import Collection from "./components/collection/Collection";
import Tasks from "./components/tasks/Tasks";
import Signup from "./components/loginPage/Signup";
import { createBrowserRouter, RouterProvider } from "react-router";
import SignIn from "./components/loginPage/SignIn";
import supabase from "./supabase/supabase";
import userContext from "./context/userContext";

import "./index.css";
import ProtectRoute from "./components/protectRoute/ProtectRoute";
import Loading from "./components/ui/Loading";
import ErrorPage from "./components/ui/ErrorPage";

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
        </ProtectRoute>
      ),
    },
    {
      path: "/tasks/:collection_name",
      element: (
        <ProtectRoute>
          <Tasks />
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
      <div className="bg-bg-light dark:bg-bg-dark w-full min-h-dvh">
        <RouterProvider router={Router} />
      </div>
    </userContext.Provider>
  );
}
export default App;
