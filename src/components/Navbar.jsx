"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";
import LogOutModal from './Modals/LogOutModal'
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";


const Navbar = () => {
  const [show, setShow] = useState(false)
  const [nav, setNav] = useState(false)
  const { isAuthenticated, signOut, user } = useContext(AuthContext);
  const router = useRouter();
  const handleSubmit = () => {
    setShow(true)
  };
  return (
    <main className=" w-full flex items-center justify-between py-3 px-5">
      {show && <LogOutModal setShow={setShow} show={show} />}
      <div className="flex gap-5 items-center">

      <AiOutlineMenu
          onClick={() => setNav(!nav)}
          size={30}
          className="md:hidden"
        />
      <Link
        href={"/"}
        className="leading font-bold italic text-xl text-[#212832]"
      >
        COMPSSA
      </Link>
      </div>
      <nav className="gap-10 items-center flex flex-row">
        <ul className="hidden md:flex gap-10 items-center">
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


      {/* MOBILE MENU */}
      <div
        className={
          nav
            ? "fixed top-0 left-0 w-full z-20 px-3 bg-white duration-500 block border-b-2"
            : "hidden"
        }
      >
        <AiOutlineClose
          onClick={() => setNav(false)}
          size={30}
          className="absolute right-4 top-4 cursor-pointer"
        />

        <Link href={"/"} onClick={() => setNav(false)} className="leading font-bold italic text-xl text-[#212832]">
          COMPSSA EC
        </Link>

        <nav>
          <ul className="flex flex-col p-4">
          {isAuthenticated 
            &&
          <li>
            <Link
                  href={"/candidates"}
                  onClick={() => setNav(false)}
              className="text-[#181818] font-semibold text-lg"
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
                  onClick={() => setNav(false)}
              className="text-[#181818] font-semibold text-lg"
              >
              Vote
            </Link>
          </li>
            }
          <li>
            <Link
                href={"/results"}
                onClick={() => setNav(false)}
              className="text-[#181818] font-semibold text-lg"

            >
              Results
            </Link>
          </li>
          </ul>
        </nav>
      </div>
    </main>
  );
};

export default Navbar;
