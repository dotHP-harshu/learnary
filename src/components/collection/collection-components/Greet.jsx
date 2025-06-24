import { useContext } from "react";

function Greet({ user }) {
  return (
    <h1 className="capitalize text-2xl font-serif max-sm:text-xl">
      Hii, {user.user_metadata.name}👋
    </h1>
  );
}

export default Greet;
