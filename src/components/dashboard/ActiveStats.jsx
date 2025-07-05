import React, { useEffect, useState } from "react";
import supabase from "../../supabase/supabase";
import { set, get } from "idb-keyval";

function ActiveStats({ user }) {
  const [stats, setStats] = useState({
    totalCollections: 0,
    totalTasks: 0,
    totalActiveDays: 0,
  });

  const getTotalCollections = async (user) => {
    const { data, error } = await supabase.rpc("get_total_collections", {
      user_uuid: user.identities[0].id,
    });
    if (error) {
      console.error("Error fetching collections:", error);
      return 0;
    }
    return data;
  };

  const getTotalTasks = async (user) => {
    const { data, error } = await supabase.rpc("get_total_tasks", {
      user_uuid: user.identities[0].id,
    });
    if (error) {
      console.error("Error fetching tasks:", error);
      return 0;
    }
    return data;
  };

  const getTotalActiveDays = async (user) => {
    const { data, error } = await supabase.rpc("get_active_days", {
      user_uuid: user.identities[0].id,
    });
    if (error) {
      console.error("Error fetching active days:", error);
      return 0;
    }
    return data;
  };

  const getStats = async () => {
    const [collections, tasks, activeDays] = await Promise.all([
      getTotalCollections(user),
      getTotalTasks(user),
      getTotalActiveDays(user),
    ]);

    const newStats = {
      totalCollections: collections,
      totalTasks: tasks,
      totalActiveDays: activeDays,
    };

    setStats(newStats);
    await set("activeStats", newStats);
  };

  useEffect(() => {
    if (navigator.onLine) {
      getStats();
    } else {
      const loadLocalStats = async () => {
        const savedStats = await get("activeStats");
        if (savedStats) {
          setStats(savedStats);
        }
      };
      loadLocalStats();
    }
  }, [user]);

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-fit bg-surface-light dark:bg-surface-dark max-sm:px-4 mt-10 max-sm:scale-90 flex-col gap-4 text-center p-6 rounded-lg border-2 border-border-light dark:border-border-dark shadow-lg shadow-border-light dark:shadow-border-dark">
        <h1 className="text-2xl max-sm:text-xl font-bold text-primary mb-6">
          Active Stats
        </h1>
        <div className="flex justify-center items-center gap-6 max-sm:flex-col">
          <div className="flex flex-col gap-2 border-2 border-border-light dark:border-border-dark p-4 rounded-lg ">
            <h2 className="text-sm text-text-muted-light dark:text-text-muted-dark">
              Total Created Collections
            </h2>
            <h2 className="text-base text-primary font-bold">
              {stats.totalCollections}
            </h2>
          </div>
          <div className="flex flex-col gap-2 border-2 border-border-light dark:border-border-dark p-4 rounded-lg">
            <h2 className="text-sm text-text-muted-light dark:text-text-muted-dark">
              Total Completed Tasks
            </h2>
            <h2 className="text-base text-primary font-bold">
              {stats.totalTasks}
            </h2>
          </div>
          <div className="flex flex-col gap-2 border-2 border-border-light dark:border-border-dark p-4 rounded-lg ">
            <h2 className="text-sm text-text-muted-light dark:text-text-muted-dark">
              Total Active Days
            </h2>
            <h2 className="text-base  text-primary font-bold">
              {stats.totalActiveDays}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActiveStats;
