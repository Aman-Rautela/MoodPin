import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CollectionPage from "./pages/CollectionPage";
import NavBar from "./components/NavBar";
import { ToastContainer } from "react-toastify";

export const App = () => {
  return (
    <div className="min-h-screen w-full bg-gray-950 text-white py-6">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections" element={<CollectionPage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};
