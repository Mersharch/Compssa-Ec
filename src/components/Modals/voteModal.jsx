import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import Modal from "@mui/material/Modal";


const VoteModal = ({ show }) => {
  const router = useRouter()
  return (
<Modal
      open={show}
      className="flex flex-row items-center justify-center"
    >
      <div className="custom-bg w-[480px] rounded-2xl flex flex-col items-center px-5 py-5 justify-center space-y-5">
        <h3 className="text-[#284DD2] font-bold text-3xl">Thank You!!</h3>
        <p className="text-[#2D2C2C] font-semibold text-lg text-center">
          Your votes have been recorded. You can check the results on the
          results page.
        </p>
        <div className="flex flex-row gap-5">
          <button
            onClick={() => router.push('/results')}
            className="px-10 py-2 flex items-center justify-center rounded-[5px] bg-[#103BD3] font-medium text-base text-white"
          >
            Results
          </button>
          <button
            onClick={() => router.push('/')}
            className="px-10 py-2 flex items-center justify-center rounded-[5px] bg-white ring-1 ring-[#E31D1D] font-medium text-base text-[#E31D1D]"
          >
            Back
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default VoteModal;
