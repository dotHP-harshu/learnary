import { get, update } from "idb-keyval";
import React, { useEffect, useState } from "react";
import { FaPenToSquare } from "react-icons/fa6";
import supabase from "../../supabase/supabase";
import Loading from "../ui/Loading";

function SkillMap({ isShowingSkillMap, collection_id, setError }) {
  const [isShowingTextArea, setIsShowingTextArea] = useState(false);
  const [skillMap, setSkillMap] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const updateSkillMap = async () => {
    setIsUpdating(true);
    const { data, error } = await supabase
      .from("skillmaps")
      .update({ skillmap: skillMap })
      .eq("collection_id", collection_id)
      .select();

    if (error) {
      setError(error.message);
      setIsUpdating(false);
    } else {
      setSkillMap(data[0].skillmap);
      setIsUpdating(false);
      setIsShowingTextArea(false);
    }
  };

  const getSkillMap = async () => {
    const { data, error } = await supabase
      .from("skillmaps")
      .select("skillmap")
      .eq("collection_id", collection_id);

    if (error) {
      setError(error.message);
    } else {
      setSkillMap(data[0].skillmap);
    }
  };

  useEffect(() => {
    if (navigator.onLine) {
      getSkillMap();
    }

    const getOfflineSkillmaps = async () => {
      let localSkillMaps = await get("skillmaps");
      if (localSkillMaps) {
        localSkillMaps = localSkillMaps.filter(
          (s) => s.collection_id === collection_id
        );
        setSkillMap(localSkillMaps[0].skillmap);
      } else {
        setError("No skill map saved at last time");
      }
    };

    if (!navigator.onLine) {
      getOfflineSkillmaps();
    }
  }, []);

  return (
    <div
      title="Skill map"
      className={`
        ${
          isShowingSkillMap ? "" : "translate-x-[110%]"
        } max-sm:w-full w-1/2 h-[550px] absolute right-0 top-auto p-6 max-sm:p-2 transition-all duration-300
        `}
    >
      <div className="relative w-full h-full dark:bg-surface-dark bg-surface-light rounded-2xl p-4 max-sm:p-2 border-2 border-border-light dark:border-border-dark ">
        {!isShowingTextArea && (
          <FaPenToSquare
            title="Edit"
            onClick={() => setIsShowingTextArea(true)}
            size={20}
            className="absolute top-2 right-4 cursor-pointer text-text-muted-light dark:text-text-muted-dark"
          />
        )}
        {skillMap === null ? (
          <Loading />
        ) : (
          <>
            {isShowingTextArea ? (
              <div className="flex flex-col w-full h-full items-end justify-between">
                <textarea
                  value={skillMap}
                  onChange={(e) => setSkillMap(e.target.value)}
                  className=" inline-block w-full h-[400px] border-2 border-border-light dark:border-border-dark rounded-lg dark:bg-bg-dark bg-bg-light resize-none outline-none p-4"
                ></textarea>

                <button
                  onClick={updateSkillMap}
                  className="cursor-pointer bg-primary px-4 py-2 mt-4 rounded-sm capitalize font-semibold cursor-pointe text-text-primary-dark"
                >
                  {isUpdating ? <Loading /> : "update"}
                </button>
              </div>
            ) : (
              <pre className="w-full h-[450px] scrollable text-base max-sm:text-sm mt-6  overflow-y-scroll ">
                {skillMap === "" ? (
                  <p className="text-xs">
                    "Click on edit button to update skillMap"
                  </p>
                ) : (
                  skillMap
                )}
              </pre>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default SkillMap;
