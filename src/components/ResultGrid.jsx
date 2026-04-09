import { useDispatch, useSelector } from "react-redux";
import { fetchPhotos, fetchVideos } from "../api/mediaApi";
import {
  setLoading,
  setError,
  setResults,
} from "../redux/features/searchSlice";
import { useEffect, useState } from "react";
import ResultCard from "./ResultCard";
import {
  addCollection,
  addedToast,
  downloadToast,
} from "../redux/features/colletionSlice";

const ResultGrid = () => {
  const dispatch = useDispatch();
  const { query, activeTab, result, loading, error } = useSelector(
    (store) => store.search,
  );

  const [selected, setSelected] = useState(null);

  const addToCollection = (item) => {
    dispatch(addCollection(item));
    dispatch(addedToast());
  };

  useEffect(() => {
    if (!query) return;

    const getData = async () => {
      try {
        dispatch(setLoading());
        let res = [];

        if (activeTab === "photos") {
          let data = await fetchPhotos(query);
          res = data.results.map((ele) => ({
            id: ele.id,
            type: "photo",
            thumbnail: ele.urls.thumb,
            src: ele.urls.full,
            title: ele.alt_description,
          }));
        }

        if (activeTab === "videos") {
          let data = await fetchVideos(query);
          res = data.videos.map((ele) => ({
            id: ele.id,
            type: "video",
            title: ele.user.name || "Video",
            thumbnail: ele.image,
            src: ele.video_files?.[2]?.link || ele.video_files?.[0]?.link,
          }));
        }

        dispatch(setResults(res));
      } catch (err) {
        dispatch(setError(err.message));
      }
    };

    getData();
  }, [activeTab, query, dispatch]);

  if (error) {
    return <h1 className="text-center text-red-500 mt-10">Error: {error}</h1>;
  }

  if (loading) {
    return <h1 className="text-center mt-10">Loading...</h1>;
  }

  if (!query) {
    return <h1 className="text-center mt-10">Type Something...</h1>;
  }

  return (
    <>
      <div className="flex flex-wrap justify-center w-full gap-6 overflow-auto px-5 py-4">
        {result.map((item) => (
          <div key={item.id}>
            <ResultCard item={item} onSelect={setSelected} />
          </div>
        ))}
      </div>

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
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 active:scale-95 transition"
                onClick={() => addToCollection(selected)}
              >
                Save
              </button>
              <button
                onClick={async () => {
                  console.log(downloadToast)
                  dispatch(downloadToast());
                  try {
                    const response = await fetch(selected.src);
                    const blob = await response.blob();
                    const blobUrl = URL.createObjectURL(blob);

                    const link = document.createElement("a");
                    link.href = blobUrl;
                    link.download = selected.title || "media";
                    link.click();

                    URL.revokeObjectURL(blobUrl);
                    console.log(downloadToast, "completed")
                  } catch (error) {
                    console.log("Error in downloading media", error);
                  }
                }}
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 active:scale-95 transition"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResultGrid;
