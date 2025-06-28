import React from "react";
import supabase from "../../supabase/supabase";
import { clear } from "idb-keyval";

function Signout() {
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error.message);
    }
    await clear();
  };
  return (
    <div>
      <p
        onClick={handleSignOut}
        className="text-warning text-base hover:underline cursor-pointer"
      >
        Sign out
      </p>
    </div>
  );
}

export default Signout;
