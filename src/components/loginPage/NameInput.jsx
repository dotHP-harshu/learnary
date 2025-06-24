import React, { useState } from "react";

function NameInput({ name, setName }) {
  return (
    <div className="flex flex-col gap-2 my-2">
      <label htmlFor="name">Enter your Name</label>
      <input
        className="rounded-sm p-2 outline-none border-2 border-border-light dark:border-border-dark text-text-muted-light dark:text-text-muted-dark "
        value={name}
        type="text"
        name="name"
        id="name"
        placeholder={"Name"}
        required
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
}

export default NameInput;
