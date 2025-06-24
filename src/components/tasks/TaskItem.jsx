import React from "react";
import { BiCrosshair } from "react-icons/bi";
import { MdDelete, MdOutlineDelete } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import supabase from "../../supabase/supabase";

function TaskItem({ task, setTasks }) {
  const getTasks = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("collection_name", task.collection_name);
    if (error) {
      console.log(error);
    } else {
      setTasks(data);
    }
  };

  const deleteTask = async () => {
    const responseTasks = await supabase
      .from("tasks")
      .delete()
      .eq("id", task.id);

    getTasks();
  };
  return (
    <div className="flex gap-4 items-center justify-between relative bg-surface-light dark:bg-surface-dark flex-wrap p-4 rounded-sm pr-24 border-2 border-border-light dark:border-border-dark">
      <h3 className="flex justify-center items-center gap-2  ">
        {task.completed ? (
          <TiTick size={24} className="text-success" />
        ) : (
          <BiCrosshair size={24} />
        )}
        {task.title}
      </h3>
      <p className="text-sm text-text-muted-light dark:text-text-muted-dark text-right">
        Completed on: {task.created_at}
      </p>
      <MdOutlineDelete
        size={25}
        onClick={() => {
          if (confirm(`Are you sure to delete ${task.title} collection?`)) {
            deleteTask();
          }
        }}
        className="text-warning cursor-pointer rounded-full p-1 bg-primary-50 absolute top-1/2 right-4 -translate-y-1/2 "
      />
    </div>
  );
}

export default TaskItem;
