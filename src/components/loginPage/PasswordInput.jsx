import React, { useRef } from "react";
import { BsEye } from "react-icons/bs";

function PasswordInput({ password, setPassword }) {
  const passwordInput = useRef(null);
  return (
    <div className="flex flex-col gap-2 my-2">
      <label htmlFor="password">Enter your password</label>
      <div className="relative">
        <input
          className="w-full rounded-sm p-2 outline-none border-2 border-border-light dark:border-border-dark text-text-muted-light dark:text-text-muted-dark"
          value={password}
          ref={passwordInput}
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <div
          className="h-full flex justify-center items-center absolute top-1/2 right-4 -translate-y-1/2 border-l-2 border-l-border-light dark:border-border-dark pl-4 cursor-pointer overflow-hidden"
          onClick={() => {
            passwordInput.current.type === "text"
              ? (passwordInput.current.type = "password")
              : (passwordInput.current.type = "text");
          }}
        >
          <BsEye size={20} />
        </div>
      </div>
    </div>
  );
}

export default PasswordInput;
