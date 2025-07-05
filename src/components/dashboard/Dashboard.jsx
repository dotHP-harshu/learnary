import React, { useEffect, useState } from "react";
import supabase from "../../supabase/supabase";
import Loading from "../ui/Loading";
import Greet from "../collection/collection-components/Greet";
import UserPanel from "../userPanel/UserPanel";
import Chart from "./Chart";
import { get } from "idb-keyval";
import ActiveStats from "./ActiveStats";

function Dashboard() {
  const [user, setUser] = useState(null);
  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      setUser(user);
    }
  };
  const getOffineUser = async () => {
    const localUser = await get("user");
    if (localUser) {
      setUser(localUser);
    }
    if (!localUser) {
    }
  };

  useEffect(() => {
    if (navigator.onLine) {
      getUser();
    }
    if (!navigator.onLine) {
      getOffineUser();
    }
  }, []);

  return (
    <>
      {user ? (
        <div className="min-h-dvh p-10 max-sm:p-4 w-full bg-bg-light dark:bg-bg-dark text-text-primary-light dark:text-text-primary-dark ">
          <div className="flex flex-col gap-6">
            <UserPanel user={user} />
            <Greet user={user} />
          </div>
          <div>
            <ActiveStats user={user} />
          </div>
          <div>
            <Chart user={user} />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Dashboard;
