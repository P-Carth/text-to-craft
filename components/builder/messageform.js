import { FiSend } from "react-icons/fi";
import { useState } from "react";

const TextInputWithButton = ({ onSubmit, onChange, status }) => {
  const [textInput, setTextInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // send to parent component
    onSubmit(e.target[0].value);
    // clear the input
    setTextInput("");
  };

  const handleInputChange = (e) => {
    setTextInput(e.target.value);
    // onChange(e.target.value);
  };

  return (
    <form
      // while selected I want it to outline blue
      className="flex items-stretch bg-white rounded-lg shadow-md overflow-hidden md:min-w-[500px] max-sm:max-w-[400px]
      "
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="flex-grow p-4 outline-[2px] outline-blue-500:focus-within rounded-l-lg"
        placeholder="Type your message here..."
        value={textInput}
        onChange={handleInputChange}
      />
      <button
        type="submit"
        className={`bg-blue-500 hover:bg-blue-600 transition-colors duration-100 text-white p-4 px-8 flex items-center justify-center ${
          !textInput || (textInput.trim() === "" && "cursor-not-allowed") // Disable button when textInput is empty
        }`}
        disabled={!textInput || textInput.trim() === ""}
      >
        {status === null ? (
          <span
            className="flex items-center font-semibold text-xl
        "
          >
            Send <FiSend className="translate-y-0.5 ml-2" />
          </span>
        ) : status === "thinking" ? (
          <span className="flex items-center font-semibold text-xl">
            Thinking...
          </span>
        ) : status === "typing" ? (
          <span className="flex items-center font-semibold text-xl">
            Typing...
          </span>
        ) : null}
      </button>
    </form>
  );
};

export default TextInputWithButton;
