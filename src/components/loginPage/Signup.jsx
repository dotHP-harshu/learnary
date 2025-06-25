import React, { useState } from "react";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import NameInput from "./NameInput";
import supabase from "../../supabase/supabase";
import { NavLink, useNavigate } from "react-router";
import Loading from "../ui/Loading";
import Logo from "../ui/Logo";

function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [signupError, setSignupError] = useState(null);
  const navigate = useNavigate();

  const handleForm = async (e) => {
    setSignupError(null);
    setIsSigningUp(true);
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: { name },
      },
    });
    if (error) {
      setSignupError(error.message);
      setIsSigningUp(false);
    } else {
      setSignupError(null);
      setEmail("");
      setPassword("");
      setName("");
      setIsSigningUp(false);
      navigate("/collection");
    }
  };

  return (
    <div className=" w-full min-h-dvh flex justify-center items-center  bg-bg-light dark:bg-bg-dark text-text-primary-light dark:text-text-primary-dark ">
      <form
        onSubmit={(e) => handleForm(e)}
        className="w-96 max-sm:w-full max-sm:px-4 max-sm:text-sm"
      >
        <div className="w-full rounded-lg bg-surface-light dark:bg-surface-dark px-6 py-4 border-2 border-border-light dark:border-border-dark ">
          <div className="flex justify-center items-center my-6">
            <Logo size={150} />
          </div>
          <h3 className="text-xl font-bold text-center mb-4 text-text-muted-light dark:text-text-muted-dark">
            Sign up
          </h3>
          <NameInput name={name} setName={setName} />
          <EmailInput email={email} setEmail={setEmail} />
          <PasswordInput password={password} setPassword={setPassword} />
          {signupError && <p className="text-warning my-4">{signupError}</p>}
          <button
            type={"submit"}
            className="bg-primary px-4 py-2 mt-4 rounded-sm capitalize font-semibold cursor-pointer  "
          >
            {isSigningUp ? <Loading /> : "sign up"}
          </button>
          <p className="my-4 text-center  text-text-muted-light dark:text-text-muted-dark">
            Have already account.
            <NavLink
              className={"text-primary-500 ml-2 hover:text-primary-600"}
              to={"/signin"}
            >
              Sign in
            </NavLink>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
