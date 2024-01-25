import Footer from "./components/global/Footer";
import Navbar from "./components/global/Navbar";
import LandingPage from "./pages/LandingPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <main className="bg-[#191D26] font-[Inter] text-white">
        <Navbar />
        <LandingPage />
        <Footer />
      </main>
      <ToastContainer />
    </>
  );
};

export default App;
