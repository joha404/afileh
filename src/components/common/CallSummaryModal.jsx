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
        className="fixed inset-0 z-40 backdrop-blur-sm bg-black/30  flex items-center justify-center"
        onClick={handleBackdropClick}
      >
        <div
          className="bg-white py-6 px-8 rounded-lg left-0 lg:left-2 md:left-5 sm:left-0 shadow-lg w-3/4 max-w-lg relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-3 cursor-pointer right-3 text-gray-500 mt-1.5 pr-1.5 hover:text-gray-800"
            onClick={onClose}
          >
            <IoClose size={30} />
          </button>

          <h2 className="text-xl font-bold mb-4">Call Summary</h2>

          <div className="mb-4">
            <p className="text-base">{data.summary}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CallSummaryModal;
