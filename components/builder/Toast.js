export default function Toast({ type, content, onClose }) {
  let toastStyle = "";
  if (type === "structure") {
    toastStyle = "bg-blue-500 text-white";
  } else if (type === "conversation") {
    toastStyle = "bg-green-400";
  }

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 text-center py-4 px-4 rounded ${toastStyle} max-w-sm pr-8`}
      style={{ wordWrap: "break-word" }}
    >
      <button
        onClick={onClose}
        className="absolute top-1 right-1 bg-white rounded-full p-1 bg-transparent"
      >
        ×
      </button>
      {content}
    </div>
  );
}
