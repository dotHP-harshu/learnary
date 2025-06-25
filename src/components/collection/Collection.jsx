import React, { useEffect, useState } from "react";
import Greet from "./collection-components/Greet";
import CollectionList from "./collection-components/CollectionList";
import supabase from "../../supabase/supabase";
import CollPopup from "../popup/CollPopup";
import Loading from "../ui/Loading";
import UserPanel from "../userPanel/UserPanel";
import SuccessPopup from "../ui/SuccessPopup";
import ErrorPopup from "../ui/ErrorPopup";

function Collection() {
  const [user, setUser] = useState(null);
  const [collections, setCollections] = useState(null);
  const [isShowingPopup, setIsShowingPopup] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      setUser(user);
      getCollection(user);
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
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {user ? (
        <div className="p-10 max-sm:p-6 min-h-dvh bg-bg-light dark:bg-bg-dark text-text-primary-light dark:text-text-primary-dark">
          {success && <SuccessPopup msg={success} setSuccess={setSuccess} />}
          {error && <ErrorPopup msg={error} setError={setError} />}
          <UserPanel user={user} />
          <Greet user={user} />
          <CollectionList
            setError={setError}
            user={user}
            collections={collections}
            setCollections={setCollections}
            setIsShowingPopup={setIsShowingPopup}
          />
          {isShowingPopup && (
            <CollPopup
              user={user}
              setCollections={setCollections}
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
