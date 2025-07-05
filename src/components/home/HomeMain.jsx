import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router";

gsap.registerPlugin(useGSAP, TextPlugin, ScrollTrigger);

function HomeMain() {
  const navigate = useNavigate();
  const heading = useRef();
  const paragraph = useRef();
  const button = useRef();
  const overlay = useRef();
  useGSAP(() => {
    const timeline = gsap.timeline({ delay: 1 });
    timeline
      .from(heading.current, {
        y: 200,
        opacity: 0,
        duration: 1.5,
        ease: "power2.inOut",
        delay: 0.5,
      })
      .from(paragraph.current, {
        text: " ",
        duration: 2,
        ease: "power2.inOut",
      })
      .from(button.current, {
        opacity: 0,
        y: -100,
        duration: 1.5,
        ease: "power2.inOut",
      });

    gsap.to(overlay.current, {
      scale: 5,
      duration: 2,
      ease: "power2.inOut",
    });
  });

  useGSAP(() => {
    gsap.to(overlay.current, {
      scale: 1.5,
      duration: 2,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
    });
  });
  return (
    <main className="w-full relative h-dvh flex justify-center items-center flex-col gap-4 px-20 max-sm:px-6 text-center text-text-primary-light dark:text-text-muted-dark z-10">
      <div
        ref={overlay}
        className="h-96 w-96 max-sm:w-48 max-sm:h-48 absolute top-1/2 left-1/2 -translate-1/2 -z-10 rounded-full bg-radial from-[#c25d324a] from-20% to-transparent via-transparent"
      ></div>
      <div className="w-fit h-fit overflow-hidden">
        <h1
          ref={heading}
          className="text-5xl max-sm:text-xl font-extrabold text-white"
        >
          Master Your Learning. One Task at a Time.
        </h1>
      </div>
      <div className="w-fit h-fit overflow-hidden">
        <p
          ref={paragraph}
          className="text-text-muted-light dark:text-text-muted-dark text-base max-sm:text-sm"
        >
          <strong className="text-primary font-mono">Learnary</strong> is your
          personal learning tracker. Create topic-based collections, track
          progress, and stay focused.
        </p>
      </div>
      <div className="w-fit h-fit overflow-hidden">
        <button
          onClick={() => {
            navigate("/signup");
          }}
          ref={button}
          className="bg-primary text-text-primary-dark text-base border-2 border-primary rounded-lg px-6 py-2 cursor-pointer transition-colors duration-300 hover:bg-transparent hover:text-text-primary-light dark:hover:text-text-primary-dark flex justify-center items-center gap-4 max-sm:scale-80"
        >
          Get Started <IoIosArrowForward />
        </button>
      </div>
    </main>
  );
}

export default HomeMain;
