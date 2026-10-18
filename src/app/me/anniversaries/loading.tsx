import { FaSpinner } from "react-icons/fa";

const AnniversariesLoading = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <FaSpinner className="animate-spin text-4xl text-pink-500" />
    </div>
  );
};

export default AnniversariesLoading;
