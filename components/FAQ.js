import React from "react";
import { FaLinkedin, FaEnvelope, FaGithub } from "react-icons/fa"; // Importing the required icons

const FAQ = ({ showFAQ, setShowFAQ }) => (
  <div
    className={
      showFAQ
        ? "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        : "hidden"
    }
  >
    <div className="bg-white p-8 rounded-md shadow-lg max-w-[50%]">
      <h2 className="text-2xl font-bold mb-4 underline">FAQs</h2>
      <p className="mb-2">
        <b>What kind of structures can I build?</b> Buildings, Towers, Houses
      </p>
      <p className="mb-2">
        <b>What materials are available?</b> Wood, Cobblestone, & Glass
      </p>
      <p className="mb-2 break-normal">
        <b>How do I use more materials?</b> Clone the repo and you can add any
        additional materials to the buildMaterials.js file, check readme for
        further instructions
      </p>
      {/* Add more questions and answers as needed */}
      <hr className="border-black mb-4" /> {/* Black line */}
      <p>
        Check out and clone the code repository{" "}
        <a
          href="https://github.com/P-Carth/text-to-craft"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline hover:text-blue-600"
        >
          here
        </a>
      </p>
      {/* Get in contact section */}
      <p className="mt-4">
        Get in contact:
        <a
          href="https://www.linkedin.com/in/preston-kirschner/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="inline mx-2 text-[#0077b5] hover:scale-[1.1]" />
        </a>
        <a href="mailto:prestonkirschner1@gmail.com">
          <FaEnvelope className="inline mx-2 text-blue-400 hover:scale-[1.1]" />
        </a>
        <a
          href="https://github.com/p-carth"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="inline mx-2 text-black hover:scale-[1.1]" />
        </a>
      </p>
      <button
        onClick={() => setShowFAQ(false)}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        Close
      </button>
    </div>
  </div>
);

export default FAQ;
