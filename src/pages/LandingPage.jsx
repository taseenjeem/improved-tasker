import Hero from "../components/page-components/landing-page/banner/Hero";
import MainTasksLayout from "../components/page-components/landing-page/tasker-layout/MainTasksLayout";

const LandingPage = () => {
  return (
    <main className="bg-[#191D26] font-[Inter] text-white">
      <Hero />
      <MainTasksLayout />
    </main>
  );
};

export default LandingPage;
