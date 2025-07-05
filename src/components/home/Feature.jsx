import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
gsap.registerPlugin(useGSAP, TextPlugin);

function Feature({ icon, heading, description }) {
  const cardRef = useRef();

  useGSAP(() => {
    gsap.from(cardRef.current, {
      y: 100,
      duration: 1,
      opacity: 0,
      ease: "power1.inOut",
      stagger: 0.1,
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 100%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });
  });

  return (
    <div className="w-fit h-fit overflow-hidden">
      <div
        ref={cardRef}
        className="relative overflow-hidden flex justify-evenly items-center  p-4 flex-col w-72 h-40 bg-surface-light dark:bg-surface-dark rounded-lg text-center border-2 border-border-light dark:border-border-dark group transition-colors duration-300 hover:shadow-xl hover:shadow-border-light dark:hover:shadow-bg-dark cursor-cell"
      >
        <span className=" text-text-primary-light dark:text-text-primary-dark transition-colors duration-300">
          {icon}
        </span>
        <h1 className="text-xl max-sm:text-base font-bold text-text-primary-light dark:text-text-primary-dark">
          {heading}
        </h1>
        <p className="w-full h-full flex justify-center items-center p-4 text-base max-sm:text-sm font-light tracking-tight bg-primary-500 text-text-primary-dark absolute top-full left-0 group-hover:top-0 duration-300 transition-all ">
          {description}
        </p>
      </div>
    </div>
  );
}

export default Feature;
