import React from "react";
import Header from "./Header";
import HomeMain from "./HomeMain";
import FeatureContainer from "./FeatureContainer";

function Home() {
  return (
    <div className="bg-bg-light dark:bg-bg-dark text-text-primary-light dark:text-text-primary-dark min-h-screen flex flex-col">
      <Header />
      <HomeMain />
      <FeatureContainer />
    </div>
  );
}

export default Home;
