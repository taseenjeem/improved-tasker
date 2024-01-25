import Footer from "./components/global/Footer";
import Navbar from "./components/global/Navbar";
import LandingPage from "./pages/LandingPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { initialTaskData } from "./data/task-data.js";
import { useState } from "react";
import { TaskDataContext } from "./context/all-context.js";

const App = () => {
  const [taskData, setTaskData] = useState(initialTaskData);

  return (
    <>
      <main className="bg-[#191D26] font-[Inter] text-white">
        <TaskDataContext.Provider value={{ taskData, setTaskData }}>
          <Navbar />
          <LandingPage />
          <Footer />
        </TaskDataContext.Provider>
      </main>
      <ToastContainer />
    </>
  );
};

export default App;
