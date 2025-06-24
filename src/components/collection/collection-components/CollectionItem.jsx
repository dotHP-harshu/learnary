import React, { useState } from "react";
import { useNavigate } from "react-router";
import supabase from "../../../supabase/supabase";

function CollectionItem({ coll, setCollections }) {
  let navigate = useNavigate();
  const [collection_name, setCollection_name] = useState(
    `:${coll.title.toLowerCase().split(" ").join("-")}`
  );

  const getCollection = async () => {
    const { data, error } = await supabase.from("collections").select("*");

    if (error) {
      console.log(error);
    } else {
      setCollections(data);
    }
  };

  const deleteTasks = async () => {
    const responseTasks = await supabase
      .from("tasks")
      .delete()
      .eq("collection_name", collection_name);
  };
  const deleteColl = async () => {
    const responseColls = await supabase
      .from("collections")
      .delete()
      .eq("id", coll.id)
      .select();

    getCollection();
  };
  return (
    <div className="w-full min-h-40 flex justify-between  flex-col collection-item bg-surface-light dark:bg-surface-dark  rounded-lg p-6 border-2 border-border-light dark:border-border-dark ">
      <h1
        className="text-2xl max-sm:text-xl font-bold capitalize hover:underline cursor-pointer w-fit"
        onClick={() => {
          navigate("/tasks/:" + coll.title.toLowerCase().split(" ").join("-"));
        }}
      >
        {coll.title}
      </h1>
      <span className="w-full flex items-center justify-between">
        <p className="text-text-muted-light dark:text-text-muted-dark text-sm text-right">
          Created at: {coll.created_at.slice(0, 10)}
        </p>
        <MdOutlineDelete
          size={30}
          onClick={() => {
            if (confirm(`Are you sure to delete ${coll.title} collection?`)) {
              deleteTasks();
              deleteColl();
            }
          }}
          className="text-warning cursor-pointer rounded-full p-1 bg-primary-50"
        />
      </span>
    </div>
  );
}

export default CollectionItem;
