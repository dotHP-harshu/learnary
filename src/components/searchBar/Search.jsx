import React, { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

function Search({ array, setArray }) {
  const [value, setValue] = useState("");
  const handleSearch = (e) => {
    const input = e.target.value;
    setValue(input);

    const updatedArr = array.filter((a) =>
      a.title.toLowerCase().includes(input.toLowerCase())
    );

    setArray(updatedArr);
  };
  return (
    <div className="relative w-fit h-fit ">
      <input
        onChange={(e) => handleSearch(e)}
        type="text"
        className="min-w-60 w-auto outline-none border-2 border-border-light dark:border-border-dark rounded-lg px-4 py-1"
        placeholder="Search"
        value={value}
      />
      <FaMagnifyingGlass className="absolute top-1/2 right-2 -translate-y-1/2" />
    </div>
  );
}

export default Search;
