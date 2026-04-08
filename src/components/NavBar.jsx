import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="flex justify-between items-center px-10 py-4 border-b border-gray-500 mx-8">
      <h2 className="text-2xl font-semibold"><Link to='/'>MoodPin</Link></h2>
      <div className="flex justify-between items-center gap-4">
        <Link
          className="bg-blue-500 text-white font-medium text-base active:scale-95 px-3 py-0.5 rounded"
          to="/"
        >
          Search
        </Link>
        <Link
          className="bg-blue-500 text-white font-medium text-base active:scale-95 px-3 py-0.5 rounded"
          to="/collections"
        >
          Collection
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
