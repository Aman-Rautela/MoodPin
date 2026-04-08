import { useState } from "react";
import { useDispatch } from "react-redux";
import { setQuery } from "../redux/features/searchSlice";

const SearchBar = () => {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(setQuery(search));
    setSearch("");
  };

  return (
    <div>
      <form onSubmit={submitHandler} className="flex p-10 gap-5">
        <input
          className="w-full border-2 px-4 py-2 text-xl rounded outline-none gap-5"
          type="text"
          placeholder="Search anything ...."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          required
        />
        <button
          type="submit"
          className="active:scale-95 border-2 px-4 py-2 text-xl rounded outline-none gap-5 cursor-pointer"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
