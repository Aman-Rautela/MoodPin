import { useDispatch, useSelector } from "react-redux";
import { setActiveTabs } from "../redux/features/searchSlice";

const Tabs = () => {
  const tabs = ["photos", "videos"];
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.search.activeTab);
  return (
    <div className="flex gap-10 p-10">
      {tabs.map((data, idx) => (
        <button
          onClick={() => {
            dispatch(setActiveTabs(data));
          }}
          className={` px-5 py-3 rounded uppercase outline-none cursor-pointer active:scale-95 ${activeTab === data ? "bg-blue-500" : "bg-gray-700"} transition-colors duration-300`}
          key={idx}
        >
          {data}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
