import React, { useRef } from "react";
import Header from "./Header";
import HomeMain from "./HomeMain";
import FeatureContainer from "./FeatureContainer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function Home() {
  const footerRef = useRef();

  useGSAP(() => {
    gsap.from(footerRef.current, {
      scale: 0,
      duration: 1,
      ease: "power2.out",
      delay: 1.5,
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top bottom",
        toggleActions: "play none none reverse",
      },
    });
  });

  return (
    <div className="bg-bg-light dark:bg-bg-dark text-text-primary-light dark:text-text-primary-dark min-h-screen flex flex-col">
      <Header />
      <HomeMain />
      <FeatureContainer />

      <footer
        ref={footerRef}
        className="bg-bg-secondary-light dark:bg-bg-secondary-dark text-text-secondary-light dark:text-text-secondary-dark p-4 text-center"
      >
        <p className="text-sm">
          Made with ❤️ by <span className="text-primary">DotHP</span>
        </p>
      </footer>
    </div>
  );
}

export default Home;
