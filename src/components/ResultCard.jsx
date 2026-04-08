import { useDispatch } from "react-redux";
import { addCollection, addedToast } from "../redux/features/colletionSlice";

const ResultCard = ({ item, onSelect }) => {

  const dispatch = useDispatch();

  const addToCollection = (item) => {
    dispatch(addCollection(item))
    dispatch(addedToast())
  };
  return (
    <div className="w-[20vw] h-80 bg-white rounded-md overflow-hidden relative hover:scale-95 transition-transform duration-500">
      <div className="h-full w-full">
        {item.type === "photo" && (
          <img
            onClick={() => onSelect(item)}
            className="h-full w-full object-cover object-center outline-none"
            src={item.thumbnail}
            alt={item.title}
          />
        )}
        {item.type === "video" && (
          <video
            onClick={() => onSelect(item)}
            className="h-full w-full object-cover outline-none"
            src={item.src}
            muted
            loop
            autoPlay
          />
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 px-6 py-8 gap-4 capitalize bg-linear-to-t from-black/70 to-transparent text-white text-md font-semibold flex flex-col items-start">
        {item.title}
        <button
          onClick={() => addToCollection(item)}
          className="text-md rounded-md bg-blue-500 text-white py-0.5 px-1.5 hover:scale-125 transition duration-500 cursor-pointer "
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ResultCard;
