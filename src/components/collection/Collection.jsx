import React, { useEffect, useRef, useState } from "react";
import Greet from "./collection-components/Greet";
import CollectionList from "./collection-components/CollectionList";
import supabase from "../../supabase/supabase";
import CollPopup from "../popup/CollPopup";
import Loading from "../ui/Loading";
import UserPanel from "../userPanel/UserPanel";
import SuccessPopup from "../ui/SuccessPopup";
import ErrorPopup from "../ui/ErrorPopup";
import Search from "../searchBar/Search";
import { get, set } from "idb-keyval";

function Collection() {
  const [user, setUser] = useState(null);
  const [collections, setCollections] = useState(null);
  const [isShowingPopup, setIsShowingPopup] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [filteredCollection, setFilteredCollection] = useState(null);

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      setUser(user);
      await set("user", user);
      getCollection(user);
      getUserTasks(user);
    }
  };

  const getCollection = async (user) => {
    const { data, error } = await supabase
      .from("collections")
      .select("*")
      .eq("user_id", user.identities[0].id);

    if (error) {
      setError(error.message);
    } else {
      setCollections(data);
      setFilteredCollection(data);
      await set("collections", data);
    }
  };

  const getUserTasks = async (user) => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user.identities[0].id);
    if (error) {
      setError(error.message);
    } else {
      await set("tasks", data);
    }
  };

  useEffect(() => {
    const getOfflineData = async () => {
      if (!navigator.onLine) {
        const localData = await get("collections");
        const localUser = await get("user");
        if (localUser) {
          setUser(localUser);
        } else {
          setError("user is not saved");
        }
        if (localData) {
          setCollections(localData);
          setFilteredCollection(localData);
        } else {
          setError("You have no saved data.");
        }
      }
    };
    getOfflineData();
    if (navigator.onLine) {
      getUser();
    }
  }, []);

  return (
    <>
      {user ? (
        <div className="p-10 max-sm:p-6 min-h-dvh bg-bg-light dark:bg-bg-dark text-text-primary-light dark:text-text-primary-dark">
          {success && <SuccessPopup msg={success} setSuccess={setSuccess} />}
          {error && <ErrorPopup msg={error} setError={setError} />}
          <UserPanel user={user} />
          <div className="mt-10">
            <Greet user={user} />
          </div>
          <div className="w-full mt-6 ">
            <Search setArray={setFilteredCollection} array={collections} />
          </div>
          <CollectionList
            setError={setError}
            user={user}
            collections={filteredCollection}
            getCollection={getCollection}
            setIsShowingPopup={setIsShowingPopup}
          />
          {isShowingPopup && (
            <CollPopup
              user={user}
              getCollection={getCollection}
              setIsShowingPopup={setIsShowingPopup}
              setSuccess={setSuccess}
              setError={setError}
            />
          )}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Collection;
