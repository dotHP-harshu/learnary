import React, { useContext, useState } from "react";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import supabase from "../../supabase/supabase";
import { NavLink, useNavigate } from "react-router";
import Loading from "../ui/Loading";
import Logo from "../ui/Logo";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [signinError, setSigninError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    setSigninError(null);
    setIsSigningIn(true);
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setSigninError(error.message);
        setIsSigningIn(false);
      } else {
        setIsSigningIn(false);
        navigate("/collection");
      }
    } catch (error) {
      setIsSigningIn(error.message);
      setIsSigningIn(false);
    }
  };
  return (
    <div className=" w-full min-h-dvh flex justify-center items-center bg-bg-light dark:bg-bg-dark text-text-primary-light dark:text-text-primary-dark">
      <form onSubmit={(e) => handleLogin(e)}>
        <div className="w-96 rounded-lg bg-surface-light dark:bg-surface-dark px-6 py-4 border-2 border-border-light dark:border-border-dark">
          <div className="flex justify-center items-center my-6">
            <Logo size={150} />
          </div>
          <h3 className="text-xl font-bold text-center mb-4 text-text-muted-light dark:text-text-muted-dark">
            Sign in
          </h3>
          <EmailInput email={email} setEmail={setEmail} />
          <PasswordInput password={password} setPassword={setPassword} />
          {signinError && (
            <p className="text-warning mt-4 text-sm  pl-4 border-l-4 border-l-warning">
              {signinError}
            </p>
          )}
          <button
            type={"submit"}
            className="bg-primary px-4 py-2 mt-4 rounded-sm capitalize font-semibold cursor-pointer  "
          >
            {isSigningIn ? <Loading /> : "sign in"}
          </button>
          <p className="my-4 text-center text-text-muted-light dark:text-text-muted-dark">
            Sign up for free.
            <NavLink
              className={"text-primary-500 ml-2 hover:text-primary-600"}
              to={"/signup"}
            >
              Sign up
            </NavLink>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
