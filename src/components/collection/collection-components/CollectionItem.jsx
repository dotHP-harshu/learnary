import React, { useState } from "react";
import { useNavigate } from "react-router";
import supabase from "../../../supabase/supabase";
import { MdOutlineDelete } from "react-icons/md";

function CollectionItem({ coll, getCollection, user, setError }) {
  let navigate = useNavigate();
  const [collection_id, setCollection_name] = useState(coll.collection_id);


  

  const deleteSkillMap = async () => {
    const responseTasks = await supabase.from("skillmaps").delete().match({
      collection_id: collection_id,
    });
  };

  const deleteTasks = async () => {
    const responseTasks = await supabase.from("tasks").delete().match({
      collection_id: collection_id,
      user_id: user.identities[0].id,
    });
  };
  const deleteColl = async () => {
    const responseColls = await supabase
      .from("collections")
      .delete()
      .eq("id", coll.id)
      .select();

    getCollection(user);
    setError("Deleted '" + coll.title + "' collection");
  };
  return (
    <div className="w-full min-h-40 flex justify-between  flex-col collection-item bg-surface-light dark:bg-surface-dark  rounded-lg p-6 border-2 border-border-light dark:border-border-dark ">
      <h1
        className="text-2xl max-sm:text-xl font-bold capitalize hover:underline cursor-pointer w-fit"
        onClick={() => {
          navigate("/tasks/:" + coll.collection_id);
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
              deleteSkillMap();
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
