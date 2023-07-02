import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Modal from "@mui/material/Modal";

const LogOutModal = ({ setShow, show }) => {
  const { signOut } = useContext(AuthContext);
  const handleClick = () => {
    setShow(false);
    signOut();
  };
  return (
    <Modal
      open={show}
      className="flex flex-row items-center justify-center"
    >
      <div className="bg-white w-[480px] rounded-2xl flex flex-col items-center px-5 py-5 justify-center space-y-8">
        <h3 className="text-[#E31D1D] font-bold text-4xl">Logging Out</h3>
        <p className="text-[#2D2C2C] font-semibold text-xl text-center">
          Do you really want to log out of your account? You can not vote or see
          results until you log back in{" "}
        </p>
        <div className="flex flex-row gap-5">
          <button onClick={handleClick} className="w-36 h-10 flex items-center justify-center rounded-[5px] bg-[#E31D1D] font-medium text-base text-white">
            Log Out
          </button>
          <button onClick={() => setShow(false)} className="w-36 h-10 flex items-center justify-center rounded-[5px] bg-white ring-1 ring-[#103BD3] font-medium text-base text-[#103BD3]">
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LogOutModal;
