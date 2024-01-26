import Footer from "./components/global/Footer";
import Navbar from "./components/global/Navbar";
import LandingPage from "./pages/LandingPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useReducer } from "react";
import { TaskReducerContext } from "./context/all-context.js";
import { initialState, taskReducer } from "./reducers/TaskReducer.js";

const App = () => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <>
      <main className="bg-[#191D26] font-[Inter] text-white">
        <TaskReducerContext.Provider value={{ state, dispatch }}>
          <Navbar />
          <LandingPage />
          <Footer />
        </TaskReducerContext.Provider>
      </main>
      <ToastContainer />
    </>
  );
};

export default App;
