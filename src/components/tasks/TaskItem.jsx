import React from "react";
import { BiCrosshair } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import supabase from "../../supabase/supabase";

function TaskItem({ task, getTasks, user, setError }) {
  const deleteTask = async () => {
    const responseTasks = await supabase
      .from("tasks")
      .delete()
      .eq("id", task.id);

    getTasks(user.identities[0].id);
    setError(`Deleted task "${task.title}"`);
  };
  return (
    <div className="flex gap-4 items-center justify-between relative bg-surface-light dark:bg-surface-dark flex-wrap p-4 rounded-sm pr-24 border-2 border-border-light dark:border-border-dark shadow-lg shadow-border-light dark:shadow-border-dark">
      <div className="flex ">
        {task.completed ? (
          <TiTick size={24} className="text-success shrink-0" />
        ) : (
          <BiCrosshair size={24} />
        )}
        <h3 className="flex justify-center items-center gap-2 max-sm:text-xs tracking-tight font-light ">
          {task.title}
        </h3>
      </div>
      <p className="text-sm text-text-muted-light dark:text-text-muted-dark text-right max-sm:text-left max-sm:text-xs tracking-tighter ">
        Completed on: {task.created_at}
      </p>
      <MdOutlineDelete
        size={25}
        onClick={() => {
          if (confirm(`Are you sure to delete ${task.title} collection?`)) {
            deleteTask();
          }
        }}
        className="text-error cursor-pointer rounded-full p-1 bg-primary-50 absolute top-1/2 right-4 -translate-y-1/2 "
      />
    </div>
  );
}

export default TaskItem;
