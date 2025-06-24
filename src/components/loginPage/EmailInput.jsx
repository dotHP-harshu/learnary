import React from "react";

function EmailInput({ email, setEmail }) {
  return (
    <div className="flex flex-col gap-2 my-2">
      <label htmlFor="email">Enter your email</label>
      <input
        className="rounded-sm p-2 outline-none border-2 border-border-light dark:border-border-dark text-text-muted-light dark:text-text-muted-dark"
        value={email}
        type="email"
        name="email"
        id="email"
        placeholder={"Email"}
        required
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
  );
}

export default EmailInput;
