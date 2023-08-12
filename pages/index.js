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
    <div className="min-h-screen relative">
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
          <div className="landing-card flex flex-col items-center justify-center min-h-[40vh] gap-4 p-4 sm:p-8 rounded-xl shadow-lg bg-yellow-950 border-[10px] border-gray-500 bg-opacity-50 backdrop-blur-2xl">
            <span className="flex flex-col sm:flex-row gap-4 text-center items-center justify-center">
              <h1 className="text-4xl sm:text-8xl font-bold text-white font-vt">{`${"text-2-craft".toUpperCase()}`}</h1>
              <img src="/t2craft.png" className="w-32 sm:w-[200px]" />
            </span>

            <button
              className="btn font-minecraft text-2xl sm:text-3xl p-3 sm:p-4 rounded-md bg-green-500 hover:bg-green-700 text-white shadow-lg border-4 border-green-800"
              onClick={() => setStarted(true)}
            >
              Get Started
            </button>

            {/* FAQ Button */}
            <button
              className="btn font-minecraft text-lg sm:text-xl p-2 rounded-md bg-gray-300 hover:bg-gray-400 text-black shadow-md border-2 border-gray-500"
              onClick={() => setShowFAQ(true)}
            >
              FAQ
            </button>
          </div>
          <div className="absolute right-2 bottom-2 sm:right-10 sm:bottom-10 z-10">
            <span>Created by Preston Kirschner</span>
          </div>
        </div>
      )}

      {/* FAQ Modal */}
      <FAQ showFAQ={showFAQ} setShowFAQ={setShowFAQ} />

      {started && selectedGame == 2 && (
        <div>
          <button
            onClick={() => setStarted(false)}
            className="btn btn-primary ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded fixed top-5 left-5"
          >
            <MdArrowBack className="text-2xl" />
          </button>
          <Game />
        </div>
      )}

      {started && selectedGame == 1 && (
        <div>
          <button
            onClick={() => setStarted(false)}
            className="btn btn-primary ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded fixed top-5 left-5"
          >
            <MdArrowBack className="text-2xl" />
          </button>
          <BuilderGame />
        </div>
      )}
    </div>
  );
}
