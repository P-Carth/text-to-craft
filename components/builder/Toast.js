// Toast.js
export default function Toast({ type, content, onClose }) {
  const toastStyles = {
    structure: "bg-[#3d4d8f] border-t-[#6b8beb] border-l-[#6b8beb]",
    conversation: "bg-[#5b7c3d] border-t-[#8db860] border-l-[#8db860]",
  };

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2
        py-3 px-6 min-w-[200px] max-w-[90vw]
        font-minecraft
        border-4 border-t-[#a38d6d] border-l-[#a38d6d] border-b-[#4a3a23] border-r-[#4a3a23]
        shadow-lg
        ${toastStyles[type] || "bg-[#735943]"}
        text-white text-sm sm:text-base
      `}
    >
      <button
        onClick={onClose}
        className="
          absolute top-1 right-1
          w-6 h-6
          flex items-center justify-center
          bg-[#a03737] hover:bg-[#c03939]
          border-2 border-t-[#d86b6b] border-l-[#d86b6b] border-b-[#6b1a1a] border-r-[#6b1a1a]
          active:border-t-[#6b1a1a] active:border-l-[#6b1a1a]
          transition-all
        "
      >
        <span className="mb-0.5">×</span>
      </button>
      {content}
    </div>
  );
}
