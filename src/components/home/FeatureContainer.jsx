import React, { useRef } from "react";
import Feature from "./Feature";
import {
  FaBrain,
  FaCheckSquare,
  FaFileAlt,
  FaLock,
  FaMobile,
} from "react-icons/fa";
import { IoIosColorPalette } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";
import { TiExport } from "react-icons/ti";
import { GoGraph } from "react-icons/go";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(useGSAP, ScrollTrigger, TextPlugin);

function FeatureContainer() {
  const heading = useRef();
  useGSAP(() => {
    const chars = heading.current.querySelectorAll(".chars");
    gsap.from(chars, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power3.inOut",
      stagger: 0.1,
      delay: 0.5,
      scrollTrigger: {
        trigger: heading.current,
        start: "top 80% ",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });
  });

  return (
    <section className="w-full min-h-dvh flex flex-col justify-center items-center overflow-hidden">
      <div className="w-fit h-fit overflow-hidden">
        <h1
          ref={heading}
          className="text-3xl max-sm:text-xl  font-bold text-center text-text-primary-light dark:text-text-primary-dark my-6"
        >
          {"Why Learnary?".split("").map((char, index) => (
            <span className="inline-block whitespace-pre chars" key={index}>
              {char}
            </span>
          ))}
        </h1>
      </div>
      <div className="w-full grid grid-cols-3 py-6 gap-6 max-sm:grid-cols-1  place-items-center">
        <Feature
          icon={<FaFileAlt size={24} />}
          heading={"Organize by Topic"}
          description={
            " Group your learning into custom collections like “React”, “Python”, or “Digital Marketing”."
          }
        />
        <Feature
          icon={<FaCheckSquare size={24} />}
          heading={"Track Your Progress"}
          description={
            "Add, complete, and manage learning tasks in a clean and focused interface."
          }
        />
        <Feature
          icon={<FaMobile size={24} />}
          heading={"Installable PWA"}
          description={
            "Works offline and can be added to your device like a native app."
          }
        />
        <Feature
          icon={<IoIosColorPalette size={24} />}
          heading={"Dark Mode Friendly"}
          description={"Beautiful light and dark themes for anytime learning."}
        />
        <Feature
          icon={<IoSearchSharp size={24} />}
          heading={"Search Anything"}
          description={
            "Instantly find any topic or task — no matter how big your list gets."
          }
        />
        <Feature
          icon={<FaLock size={24} />}
          heading={"Secure & Private"}
          description={
            "Built on Supabase, your data is private and synced securely."
          }
        />
        <Feature
          icon={<TiExport size={24} />}
          heading={"Export Your Learning Data"}
          description={
            "Download your collections and tasks as JSON — so your data is portable and future-proof."
          }
        />
        <Feature
          icon={<FaBrain size={24} />}
          heading={"Write Your SkillMap as a Plan"}
          description={
            "Use Learnary as a living roadmap — create a clear, written plan of what to learn, in what order, and why. Like a SkillMap that grows with you."
          }
        />
        <Feature
          icon={<GoGraph size={24} />}
          heading={"See your weekly activity"}
          description={
            "You can see your progress, howmany tasks you have done in a day over time."
          }
        />
      </div>
    </section>
  );
}

export default FeatureContainer;
