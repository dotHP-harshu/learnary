import React, { useState } from "react";
import { BsPlusCircleFill, BsPlusSquareFill } from "react-icons/bs";
import supabase from "../../supabase/supabase";
import Loading from "../ui/Loading";

function TaskPopup({
  setIsShowingPopup,
  collection_id,
  getTasks,
  user_id,
  setError,
  setSuccess,
}) {
  const [isInserting, setIsInserting] = useState(false);
  const [taskName, setTaskName] = useState("");

  const addTask = async (e) => {
    e.preventDefault();
    setIsInserting(true);
    const { error } = await supabase
      .from("tasks")
      .insert({ title: taskName, collection_id, user_id });

    if (error) {
      setError(error.message);
    } else {
      setIsInserting(false);
      getTasks(user_id);
      setIsShowingPopup(false);
      setTaskName("");
      setSuccess(`Successfully added task "${taskName}" `);
    }
  };

  return (
    <div
      className="w-screen h-screen fixed top-0 left-0 z-10 bg-[#ffffff5c] dark:bg-[#0000005c] text-text-primary-light dark:text-text-primary-dark flex justify-center items-center max-sm:px-2 "
      style={{
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      <form
        onSubmit={(e) => addTask(e)}
        className="w-96 max-sm:w-full pt-16 p-6 rounded-sm bg-surface-light dark:bg-surface-dark relative border-2 border-border-light dark:border-border-dark "
      >
        <span
          className="absolute top-4 right-4 cursor-pointer "
          onClick={() => setIsShowingPopup(false)}
        >
          <BsPlusCircleFill size={24} className="text-primary-500 rotate-45" />
        </span>
        <label className="block mb-2" htmlFor="title">
          Task Name
        </label>
        <input
          value={taskName}
          autoFocus
          onChange={(e) => setTaskName(e.target.value)}
          required
          type="text"
          placeholder="Task Name"
          id="title"
          className="block w-full rounded-sm p-2 outline-none border-2 border-border-light dark:border-border-dark text-text-muted-light dark:text-text-muted-dark "
        />

        <span className="flex w-full justify-end">
          <button className="bg-primary px-4 py-2 mt-4 rounded-sm capitalize font-semibold cursor-pointer ">
            {isInserting ? <Loading /> : "add"}
          </button>
        </span>
      </form>
    </div>
  );
}

export default TaskPopup;
