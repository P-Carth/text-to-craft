import React from "react";
import { FaLinkedin, FaEnvelope, FaGithub } from "react-icons/fa"; // Importing the required icons

// FAQ.js
const FAQ = ({ showFAQ, setShowFAQ }) => (
  <div
    className={
      showFAQ
        ? "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        : "hidden"
    }
  >
    <div
      className="bg-[#735943] p-6 rounded 
      border-4 border-t-[#a38d6d] border-l-[#a38d6d] border-b-[#4a3a23] border-r-[#4a3a23]
      shadow-[inset_0_0_8px_rgba(0,0,0,0.3)]
      max-w-[600px] max-sm:max-w-[90vw] text-white"
    >
      <h2 className="text-2xl font-bold mb-4 text-shadow-[2px_2px_0_#4a3a23]">
        FAQs
      </h2>

      <div className="space-y-4 text-sm sm:text-base">
        <p>
          <span className="text-[#8db860]">
            ◆ What kind of structures can I build?
          </span>
          <br />
          Buildings, Towers, Houses
        </p>
        <p>
          <span className="text-[#8db860]">
            ◆ What materials are available?
          </span>
          <br />
          Wood, Cobblestone, & Glass
        </p>
        <p>
          <span className="text-[#8db860]">◆ How do I use more materials?</span>
          <br />
          Clone the repo and add materials to buildMaterials.js
        </p>
      </div>

      <hr className="my-4 border-[#4a3a23]" />

      <div className="space-y-2">
        <p className="text-[#8db860]">Code Repository:</p>
        <a
          href="https://github.com/P-Carth/text-to-craft"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#5b7c3d] px-3 py-1 
            border-2 border-t-[#8db860] border-l-[#8db860] border-b-[#3d5229] border-r-[#3d5229]
            hover:bg-[#6e974a] transition-all"
        >
          GitHub Link
        </a>
      </div>

      <div className="mt-4">
        <p className="text-[#8db860] mb-2">Get in contact:</p>
        <div className="flex justify-center space-x-4">
          {/* Icons with Minecraft-style hover effects */}
          <a
            href="https://www.linkedin.com/in/preston-kirschner/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-[#3d4d8f] hover:bg-[#4a5fa7] 
              border-2 border-t-[#6b8beb] border-l-[#6b8beb] border-b-[#2a3669] border-r-[#2a3669]
              transition-all"
          >
            <FaLinkedin className="text-xl text-white" />
          </a>
          <a
            href="mailto:prestonkirschner1@gmail.com"
            className="p-2 bg-[#5b7c3d] hover:bg-[#6e974a] 
              border-2 border-t-[#8db860] border-l-[#8db860] border-b-[#3d5229] border-r-[#3d5229]
              transition-all"
          >
            <FaEnvelope className="text-xl text-white" />
          </a>
          <a
            href="https://github.com/p-carth"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-[#7a7a7a] hover:bg-[#8d8d8d] 
              border-2 border-t-[#a3a3a3] border-l-[#a3a3a3] border-b-[#4a4a4a] border-r-[#4a4a4a]
              transition-all"
          >
            <FaGithub className="text-xl text-white" />
          </a>
        </div>
      </div>

      <button
        onClick={() => setShowFAQ(false)}
        className="mt-4 px-4 py-2 
          bg-[#a03737] hover:bg-[#c03939] active:bg-[#8a2e2e]
          border-4 border-t-[#d86b6b] border-l-[#d86b6b] border-b-[#6b1a1a] border-r-[#6b1a1a]
          active:border-t-[#6b1a1a] active:border-l-[#6b1a1a]
          text-white transition-all"
      >
        Close
      </button>
    </div>
  </div>
);

export default FAQ;
