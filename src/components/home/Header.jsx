import React, { useRef } from "react";
import Logo from "../ui/Logo";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

function Header() {
  const header = useRef();
  useGSAP(() => {
    gsap.from(header.current, {
      y: -100,
      duration: 1,
      ease: "power2.inOut",
      opacity: 0,
      delay: 0.5,
    });
  });
  return (
    <div
      ref={header}
      style={{
        backdropFilter: "blur(10px)",
        background: "#fffff23",
      }}
      className="w-full z-20 flex justify-between items-center pt-4 6 px-20 max-sm:px-6 fixed top-0 left-0 "
    >
      <span className="max-sm:scale-80">
        <Logo size={150} />
      </span>
      <button className="max-sm:scale-80 text-primary text-base border-2 border-primary rounded-lg px-6 py-2 cursor-pointer transition-colors duration-300 hover:bg-primary hover:text-text-primary-dark">
        Login
      </button>
    </div>
  );
}

export default Header;
