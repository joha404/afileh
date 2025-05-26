import { IoClose } from "react-icons/io5";

const CallSummaryModal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;
  const handleBackdropClick = (e) => {
    if (e.target.id === "backdrop") {
      onClose();
    }
  };

  return (
    <>
      <div
        id="backdrop"
        className="fixed inset-0 z-40 backdrop-blur-sm bg-black/30 flex items-center justify-center"
        onClick={handleBackdropClick}
      >
        <div
          className="bg-white py-6 px-6 sm:px-8 rounded-lg shadow-lg w-[90%] sm:w-3/4 md:max-w-lg max-h-[90vh] overflow-y-auto relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="">
            <button
              className="absolute top-3 right-3 text-gray-800 cursor-pointer hover:text-gray-400 transition"
              onClick={onClose}
              aria-label="Close Modal"
            >
              <IoClose size={30} />
            </button>

            <h2 className="text-xl font-semibold mb-4">Call Summary</h2>
          </div>

          <div className="mb-4">
            <p className="text-base leading-relaxed">
              {data?.summary || "No summary available."}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CallSummaryModal;
