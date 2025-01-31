// pages/index.js

import BuilderGame, {
  addLayer,
  clearAllLayers,
  // replaceLayers,
} from "@/components/builder/BuilderGame";
import FAQ from "/components/FAQ"; // or the correct path to the FAQ.js file
import { useState } from "react";
import { MdArrowBack } from "react-icons/md";

const games = [
  { id: 1, name: "Builder" },
  // { id: 2, name: "Interactive Block" },
];

export default function HomePage() {
  const [selectedGame, setSelectedGame] = useState(1);
  const [started, setStarted] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false); // State for controlling FAQ modal

  return (
    <div className="min-h-screen relative font-minecraft">
      <img
        src="/bg_gif.gif"
        style={{
          position: "absolute",
          width: "100%",
          left: "50%",
          top: "50%",
          height: "100%",
          objectFit: "cover",
          transform: "translate(-50%, -50%)",
          zIndex: "-1",
          // make the background blurry
          filter: "blur(8px)",
        }}
        alt="Background"
      />

      {!started && (
        <div className="flex flex-col items-center justify-evenly min-h-screen text-center px-4 sm:px-0">
          <div
            className="landing-card flex flex-col items-center justify-center min-h-[40vh] gap-4 p-4 sm:p-8 
            bg-[#735943] border-4 border-t-[#a38d6d] border-l-[#a38d6d] border-b-[#4a3a23] border-r-[#4a3a23]
            shadow-[inset_0_0_8px_rgba(0,0,0,0.3)] backdrop-blur-2xl"
          >
            <span className="flex flex-col sm:flex-row gap-4 text-center items-center justify-center">
              <h1
                className="text-4xl sm:text-8xl font-bold text-white 
                text-shadow-[2px_2px_0_#4a3a23]"
              >
                {`${"text-2-craft".toUpperCase()}`}
              </h1>
              <img
                src="/t2craft.png"
                className="w-32 sm:w-[200px] bg-[#5b3e2b]
                border-4 border-t-[#a38d6d] border-l-[#a38d6d] border-b-[#4a3a23] border-r-[#4a3a23]"
              />
            </span>

            <button
              className="text-2xl sm:text-3xl p-3 sm:p-4 
                bg-[#5b7c3d] hover:bg-[#6e974a] active:bg-[#4a652f]
                border-4 border-t-[#8db860] border-l-[#8db860] border-b-[#3d5229] border-r-[#3d5229]
                active:border-t-[#3d5229] active:border-l-[#3d5229] active:border-b-[#8db860] active:border-r-[#8db860]
                text-white shadow-lg transition-all"
              onClick={() => setStarted(true)}
            >
              Get Started
            </button>

            <button
              className="text-lg sm:text-xl p-2 
                bg-[#7a7a7a] hover:bg-[#8d8d8d] active:bg-[#656565]
                border-4 border-t-[#a3a3a3] border-l-[#a3a3a3] border-b-[#4a4a4a] border-r-[#4a4a4a]
                active:border-t-[#4a4a4a] active:border-l-[#4a4a4a] active:border-b-[#a3a3a3] active:border-r-[#a3a3a3]
                text-white transition-all"
              onClick={() => setShowFAQ(true)}
            >
              FAQ
            </button>
          </div>
          <div
            className="absolute right-2 bottom-2 sm:right-10 sm:bottom-10 z-10 
            text-white text-shadow-[1px_1px_0_#4a3a23]"
          >
            <span>Created by Preston Kirschner</span>
          </div>
        </div>
      )}

      <FAQ showFAQ={showFAQ} setShowFAQ={setShowFAQ} />

      {started && selectedGame == 2 && (
        <div>
          <button
            onClick={() => setStarted(false)}
            className="
    fixed top-5 left-5
    w-12 h-12
    bg-[#3d4d8f] hover:bg-[#4a5fa7]
    border-4 border-t-[#6b8beb] border-l-[#6b8beb] border-b-[#2a3669] border-r-[#2a3669]
    active:border-t-[#2a3669] active:border-l-[#2a3669] active:border-b-[#6b8beb] active:border-r-[#6b8beb]
    flex items-center justify-center
    transition-all
  "
          >
            <MdArrowBack className="text-2xl text-white" />
          </button>
          <Game />
        </div>
      )}

      {started && selectedGame == 1 && (
        <div>
          <button
            onClick={() => setStarted(false)}
            className="
    fixed top-5 left-5
    w-12 h-12
    bg-[#3d4d8f] hover:bg-[#4a5fa7]
    border-4 border-t-[#6b8beb] border-l-[#6b8beb] border-b-[#2a3669] border-r-[#2a3669]
    active:border-t-[#2a3669] active:border-l-[#2a3669] active:border-b-[#6b8beb] active:border-r-[#6b8beb]
    flex items-center justify-center
    transition-all
  "
          >
            <MdArrowBack className="text-2xl text-white" />
          </button>
          <BuilderGame />
        </div>
      )}
    </div>
  );
}
