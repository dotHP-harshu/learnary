import TaskContainer from "./TaskContainer";
import { useParams } from "react-router";
import BackButton from "../ui/BackButton";
import UserPanel from "../userPanel/UserPanel";
import supabase from "../../supabase/supabase";
import { useEffect, useState } from "react";
import Loading from "../ui/Loading";
import ErrorPopup from "../ui/ErrorPopup";
import SuccessPopup from "../ui/SuccessPopup";

function Tasks() {
  const { collection_name } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      setUser(user);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return user ? (
    <div className="w-full min-h-dvh py-10 px-10 max-sm:px-4 bg-bg-light dark:bg-bg-dark text-text-primary-light dark:text-text-primary-dark">
      {success && <SuccessPopup setSuccess={setSuccess} msg={success} />}
      {error && <ErrorPopup setError={setError} msg={error} />}
      <UserPanel user={user} />
      <BackButton path={"/collection"} />
      <h1 className="text-2xl font-semibold ml-10 max-sm:ml-4 capitalize ">
        {collection_name.replaceAll(":", "").split("-").join(" ")}
      </h1>
      <TaskContainer
        collection_name={collection_name}
        user={user}
        setError={setError}
        setSuccess={setSuccess}
      />
    </div>
  ) : (
    <Loading />
  );
}

export default Tasks;
