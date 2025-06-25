import React, { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import { BsPlusCircleFill } from "react-icons/bs";
import TaskPopup from "../popup/TaskPopup";
import supabase from "../../supabase/supabase";
import Loading from "../ui/Loading";
import Search from "../searchBar/Search";

function TaskContainer({ collection_name, user, setSuccess, setError }) {
  const [isShowingPopup, setIsShowingPopup] = useState(false);
  const [tasks, setTasks] = useState(null);
  const [updatedTasks, setUpdatedTasks] = useState(null);

  const getTasks = async (user_id) => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .match({
        collection_name,
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
    getTasks(user.identities[0].id);
  }, []);

  return (
    <>
      {isShowingPopup && (
        <TaskPopup
          collection_name={collection_name}
          setIsShowingPopup={setIsShowingPopup}
          getTasks={getTasks}
          user_id={user.identities[0].id}
          setSuccess={setSuccess}
          setError={setError}
        />
      )}

      <div className="w-full flex flex-col gap-4 lg:px-20 sm:px-10 max-sm:px-4 mt-20">
        <div>
          <Search array={tasks} setArray={setUpdatedTasks} />
        </div>
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
  );
}

export default TaskContainer;
