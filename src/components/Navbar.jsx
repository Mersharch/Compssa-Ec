"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";
import LogOutModal from './Modals/LogOutModal'

const Navbar = () => {
  const [show, setShow] = useState(false)
  const { isAuthenticated, signOut, user } = useContext(AuthContext);
  const router = useRouter();
  const handleSubmit = () => {
    setShow(true)
    // signOut();
    // localStorage.setItem('isAuthenticated', 'true')
    // router.push("/");
    // alert("Logged out successfully");
  };
  return (
    <main className="flex items-center justify-between px-32 py-3">
      {show && <LogOutModal setShow={setShow} />}
      <Link
        href={"/"}
        className="leading font-bold italic text-xl text-[#212832]"
      >
        COMPSSA
      </Link>
      <nav className="flex gap-10 items-center">
        <ul className="flex gap-10 items-center">
        {isAuthenticated 
            &&
          <li>
            <Link
              href={"/candidates"}
              className="text-[#181818] font-semibold text-sm"
              >
              Candidates
            </Link>
          </li>
            }
          {(user?.voted === false) && isAuthenticated
            &&
          <li>
            <Link
              href={"/vote"}
              className="text-[#181818] font-semibold text-sm"
              >
              Vote
            </Link>
          </li>
            }
          <li>
            <Link
              href={"/results"}
              className="text-[#181818] font-semibold text-sm"

            >
              Results
            </Link>
          </li>
        </ul>
        {!isAuthenticated && (
          <Link
            href={"/login"}
            className="w-24 h-7  flex items-center justify-center rounded-[5px] ring-2 ring-[#212832] font-semibold text-lg"
          >
            Login
          </Link>
        )}
        {isAuthenticated && (
          <button
            onClick={handleSubmit}
            className="w-24 h-7  flex items-center justify-center rounded-[5px] ring-2 ring-[#212832] font-semibold text-lg"
          >
            Logout
          </button>
        )}
      </nav>
    </main>
  );
};

export default Navbar;
