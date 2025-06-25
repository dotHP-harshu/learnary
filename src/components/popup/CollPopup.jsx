import React, { useState } from "react";
import { BsPlusCircleFill, BsPlusSquareFill } from "react-icons/bs";
import supabase from "../../supabase/supabase";
import { VscLoading } from "react-icons/vsc";
import Loading from "../ui/Loading";

function CollPopup({
  user,
  setIsShowingPopup,
  setCollections,
  setSuccess,
  setError,
}) {
  const [title, setTitle] = useState("");
  const [isInserting, setIsInserting] = useState(false);

  const getCollection = async (user) => {
    const { data, error } = await supabase
      .from("collections")
      .select("*")
      .eq("user_id", user.identities[0].id);

    if (error) {
      setError(error.message);
    } else {
      setCollections(data);
      setSuccess("Successfully added '" + title + "' collection.");
    }
  };

  const addCollection = async (e) => {
    e.preventDefault();
    setIsInserting(true);
    const { error } = await supabase.from("collections").insert({
      title,
      user_id: user.identities[0].id,
      path: `:${title.toLowerCase().split(" ").join("-")}`,
    });

    if (error) {
      setIsInserting(false);
      setError(error.message);
    }

    setIsShowingPopup(false);
    setIsInserting(false);
    getCollection(user);
    setTitle("");
  };
  return (
    <div className="w-screen h-screen fixed top-0 left-0 z-10 bg-bg-light dark:bg-bg-dark text-text-primary-light dark:text-text-primary-dark flex justify-center items-center">
      <form
        onSubmit={(e) => addCollection(e)}
        className="min-w-96 w-auto pt-16 p-6 rounded-sm bg-surface-light dark:bg-surface-dark relative"
      >
        <span
          className="absolute top-4 right-4 cursor-pointer "
          onClick={() => setIsShowingPopup(false)}
        >
          <BsPlusCircleFill size={24} className="text-primary-500 rotate-45" />
        </span>
        <label className="block mb-2" htmlFor="title">
          Title
        </label>
        <input
          value={title}
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
          required
          type="text"
          placeholder="Title"
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

export default CollPopup;
