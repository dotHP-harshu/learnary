import TaskContainer from "./TaskContainer";
import { data, useParams } from "react-router";
import UserPanel from "../userPanel/UserPanel";
import supabase from "../../supabase/supabase";
import { useEffect, useState } from "react";
import Loading from "../ui/Loading";
import ErrorPopup from "../ui/ErrorPopup";
import SuccessPopup from "../ui/SuccessPopup";
import { set, get } from "idb-keyval";
import SkillMap from "./SkillMap";
import { FaLightbulb } from "react-icons/fa6";

function Tasks() {
  const { collection_id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [collection_title, setCollection_title] = useState(null);

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      setUser(user);
    }
  };
  const getCollectionName = async () => {
    const { data, error } = await supabase
      .from("collections")
      .select("title")
      .eq("collection_id", collection_id.replace(":", ""));
    if (error) {
      setError(error.message);
    } else {
      setCollection_title(data);
    }
  };

  useEffect(() => {
    if (navigator.onLine) {
      getUser();
    }
    const getLocalUser = async () => {
      const localUser = await get("user");
      if (localUser) {
        setUser(localUser);
      } else {
        setError("User was not saved.");
      }
    };
    getLocalUser();
  }, []);

  useEffect(() => {
    if (navigator.onLine) {
      getCollectionName();
    }
    const getLocalCollectionName = async () => {
      let localCollectionTitle = await get("collections");
      if (localCollectionTitle) {
        localCollectionTitle = localCollectionTitle.filter(
          (n) => n.collection_id === collection_id.replace(":", "")
        );
        setCollection_title(localCollectionTitle);
      } else {
        setError("Collections is not saved.");
      }
    };
    if (!navigator.onLine) {
      getLocalCollectionName();
    }
  }, [collection_id]);

  return user ? (
    <div className="w-full min-h-[1000px] h-auto py-6 px-6 max-sm:px-4 bg-bg-light dark:bg-bg-dark text-text-primary-light dark:text-text-primary-dark overflow-hidden">
      {success && <SuccessPopup setSuccess={setSuccess} msg={success} />}
      {error && <ErrorPopup setError={setError} msg={error} />}
      <UserPanel user={user} />
      <h1 className="text-2xl w-fit font-semibold ml-10 max-sm:ml-4 capitalize ">
        {collection_title ? collection_title[0].title : <Loading />}
      </h1>
      <div className="">
        <TaskContainer
          collection_id={collection_id.replace(":", "")}
          collection_title={collection_title}
          user={user}
          setError={setError}
          setSuccess={setSuccess}
        />
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default Tasks;
