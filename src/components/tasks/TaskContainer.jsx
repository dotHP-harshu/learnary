import React, { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import { BsPlusCircleFill } from "react-icons/bs";
import TaskPopup from "../popup/TaskPopup";
import supabase from "../../supabase/supabase";
import Loading from "../ui/Loading";
import Search from "../searchBar/Search";
import { get } from "idb-keyval";
import { FaLightbulb } from "react-icons/fa6";
import SkillMap from "./SkillMap";
import ExportData from "./ExportData";
import BackButton from "../ui/BackButton";

function TaskContainer({
  collection_id,
  collection_title,
  user,
  setSuccess,
  setError,
}) {
  const [isShowingPopup, setIsShowingPopup] = useState(false);
  const [tasks, setTasks] = useState(null);
  const [updatedTasks, setUpdatedTasks] = useState(null);
  const [isShowingSkillMap, setIsShowingSkillMap] = useState(false);

  const getTasks = async (user_id) => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .match({
        collection_id,
        user_id,
      })
      .order("created_at", { ascending: false });
    if (error) {
      setError(error.message);
    } else {
      setTasks(data);
      setUpdatedTasks(data);
    }
  };

  useEffect(() => {
    const getOfflineData = async () => {
      let localTasks = await get("tasks");
      localTasks = localTasks.filter((t) => t.collection_id === collection_id);
      setTasks([...localTasks]);
      setUpdatedTasks([...localTasks]);
    };

    if (navigator.onLine) {
      getTasks(user.identities[0].id);
    }

    if (!navigator.onLine) {
      getOfflineData();
    }
  }, []);

  return tasks ? (
    <>
      {isShowingPopup && (
        <TaskPopup
          collection_id={collection_id}
          setIsShowingPopup={setIsShowingPopup}
          getTasks={getTasks}
          user_id={user.identities[0].id}
          setSuccess={setSuccess}
          setError={setError}
        />
      )}

      <div className="w-full mt-6">
        <div className="w-full flex justify-between items-center relative ">
          <BackButton path={"/collection"} />
          <div className=" flex justify-end gap-4 items-center ">
            <ExportData tasks={tasks} collection_title={collection_title} />
            <FaLightbulb
              title="Skill map"
              onClick={() => {
                setIsShowingSkillMap((prev) => !prev);
              }}
              size={40}
              className="bg-surface-light dark:bg-surface-dark p-2 rounded-full cursor-pointer text-text-muted-light dark:text-text-muted-dark border-2 border-border-light dark:border-border-dark"
            />
            <SkillMap
              isShowingSkillMap={isShowingSkillMap}
              collection_id={collection_id}
              setError={setError}
            />
          </div>
        </div>
        <Search array={tasks} setArray={setUpdatedTasks} />
      </div>

      <div className="w-1/2 max-sm:w-full flex flex-col gap-4 lg:px-20 sm:px-10 max-sm:px-4 mt-10">
        <div
          onClick={() => setIsShowingPopup(true)}
          className="max-w-40 min-h-6 flex justify-center items-center  flex-col collection-item bg-primary-100 rounded-sm p-4 cursor-pointer border-2 border-primary "
        >
          <BsPlusCircleFill size={20} className="text-primary " />
        </div>

        {tasks ? (
          tasks.length === 0 ? (
            <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
              Click on the plus button to add a task.
            </p>
          ) : (
            updatedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                getTasks={getTasks}
                user={user}
                setError={setError}
              />
            ))
          )
        ) : (
          <Loading />
        )}
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default TaskContainer;
