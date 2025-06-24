import React, { useEffect, useState } from "react";
import Greet from "./collection-components/Greet";
import CollectionList from "./collection-components/CollectionList";
import supabase from "../../supabase/supabase";
import CollPopup from "../popup/CollPopup";
import Loading from "../ui/Loading";
import UserPanel from "../userPanel/UserPanel";
import ErrorPopup from "../ui/ErrorPopup";

function Collection() {
  const [user, setUser] = useState(null);
  const [collections, setCollections] = useState(null);
  const [isShowingPopup, setIsShowingPopup] = useState(false);
  const [error, setError] = useState(null);

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      setUser(user);
    }
  };

  const getCollection = async () => {
    const { data, error } = await supabase.from("collections").select("*");

    if (error) {
      setError(error.message);
    } else {
      setCollections(data);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    getCollection();
  }, []);

  return (
    <>
      {user ? (
        <div className="p-10 max-sm:p-6 min-h-dvh bg-bg-light dark:bg-bg-dark text-text-primary-light dark:text-text-primary-dark">
          {error && <ErrorPopup msg={error} />}
          <UserPanel user={user} />
          <Greet user={user} />
          <CollectionList
            collections={collections}
            setCollections={setCollections}
            setIsShowingPopup={setIsShowingPopup}
          />
          {isShowingPopup && (
            <CollPopup
              user={user}
              setCollections={setCollections}
              setIsShowingPopup={setIsShowingPopup}
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
