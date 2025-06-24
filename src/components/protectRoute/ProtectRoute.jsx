import supabase from "../../supabase/supabase";
import userContext from "../../context/userContext";
import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router";

function ProtectRoute({ children }) {
  const { user, setUser } = useContext(userContext);
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
      }
    };
    getUser();
  }, []);

  if (!user) {
    return <Navigate to={"/signin"} replace />;
  }
  return children;
}

export default ProtectRoute;
