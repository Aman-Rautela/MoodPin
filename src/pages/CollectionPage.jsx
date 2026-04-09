import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CollectionCard from "../components/CollectionCard";
import { clearCollection } from "../redux/features/colletionSlice";

const CollectionPage = () => {
  const collection = useSelector((state) => state.collection.items);
  const [selected, setSelected] = useState(null);

  const dispatch = useDispatch();

  const removeAll = () => {
    dispatch(clearCollection());
  };

  return (
    <div className="flex flex-col gap-5 py5">
      {clearCollection.length > 0 ? (
        <h1 className="flex items-center justify-center text-2xl font-semibold py-5">
          Your Collections
        </h1>
      ) : (
        <h1 className="flex items-center justify-center text-2xl font-semibold py-5">
          Empty Collections
        </h1>
      )}
      <div className="flex flex-wrap justify-center w-full gap-6 overflow-auto px-5 py-4">
        {collection.map((data, idx) => (
          <div key={idx}>
            <CollectionCard item={data} onSelect={setSelected} />
          </div>
        ))}
        {selected && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50"
            onClick={() => setSelected(null)}
          >
            <div
              className="relative bg-white/5 p-4 rounded-2xl max-w-4xl w-full flex flex-col items-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-white text-2xl hover:scale-125 transition cursor-pointer hover:text-red-500"
                onClick={() => setSelected(null)}
              >
                ✕
              </button>

              {selected.type === "photo" && (
                <img
                  className="w-full max-h-[80vh] object-contain rounded-lg"
                  src={selected.src}
                  alt={selected.title}
                />
              )}

              {selected.type === "video" && (
                <video
                  className="max-w-[100vh] max-h-[80vh] object-contain rounded-lg"
                  src={selected.src}
                  autoPlay
                  muted
                  loop
                  controls
                />
              )}

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = selected.src;
                    link.download = "media";
                    link.click();
                  }}
                  className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 active:scale-95 transition cursor-pointer"
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-center rounded-lg">
        {" "}
        <button
          onClick={() => removeAll()}
          className="cursor-pointer px-4 py-2 bg-red-500 rounded-lg active:scale-95 hover:bg-red-800 transition duration-300 outline-none border-none"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default CollectionPage;
