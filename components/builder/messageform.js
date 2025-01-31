import { FiSend } from "react-icons/fi";
import { BsTrash3Fill } from "react-icons/bs";
import { useState } from "react";

const TextInputWithButton = ({ onSubmit, onClear, status }) => {
  const [textInput, setTextInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(textInput);
    setTextInput("");
  };

  const handleInputChange = (e) => {
    setTextInput(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        flex flex-col sm:flex-row
        bg-[#735943] // Minecraft dirt color
        border-4 border-t-[#a38d6d] border-l-[#a38d6d] border-b-[#4a3a23] border-r-[#4a3a23]
        shadow-[inset_0_0_8px_rgba(0,0,0,0.3)]
        w-full max-w-[500px]
        px-2 py-2
        font-minecraft
        transition-all
      "
    >
      <input
        type="text"
        value={textInput}
        onChange={handleInputChange}
        placeholder="Type your message here..."
        className="
        flex-grow w-full
        bg-[#2e2b2b]
        text-white placeholder-[#7a7a7a]
        px-4 py-2
        focus:outline-none
        border-4 border-t-[#4a3a23] border-l-[#4a3a23] border-b-[#a38d6d] border-r-[#a38d6d]
        shadow-[inset_0_0_8px_rgba(0,0,0,0.3)]
        sm:border-r-0
        text-base  /* Force at least 16px on all mobile devices */
      "
      />

      <div className="flex gap-2 mt-2 sm:mt-0">
        <button
          type="button"
          onClick={() => {
            setTextInput("");
            onClear();
          }}
          className="
            flex items-center justify-center
            bg-[#a03737] hover:bg-[#c03939] active:bg-[#8a2e2e]
            border-4 border-t-[#d86b6b] border-l-[#d86b6b] border-b-[#6b1a1a] border-r-[#6b1a1a]
            active:border-t-[#6b1a1a] active:border-l-[#6b1a1a] active:border-b-[#d86b6b] active:border-r-[#d86b6b]
            text-white
            px-4 py-2
            min-w-[100px]
            transition-all
          "
        >
          <BsTrash3Fill className="mr-2" />
          Clear
        </button>

        <button
          type="submit"
          disabled={!textInput.trim()}
          className="
            flex items-center justify-center
            bg-[#5b7c3d] hover:bg-[#6e974a] active:bg-[#4a652f]
            border-4 border-t-[#8db860] border-l-[#8db860] border-b-[#3d5229] border-r-[#3d5229]
            active:border-t-[#3d5229] active:border-l-[#3d5229] active:border-b-[#8db860] active:border-r-[#8db860]
            text-white
            px-4 py-2
            min-w-[100px]
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all
          "
        >
          {status === null ? (
            <>
              Send <FiSend className="ml-2" />
            </>
          ) : status === "thinking" ? (
            <>Thinking...</>
          ) : status === "typing" ? (
            <>Typing...</>
          ) : null}
        </button>
      </div>
    </form>
  );
};

export default TextInputWithButton;
