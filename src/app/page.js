"use client";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { isAuthenticated, user } = useContext(AuthContext);
  return (
    <main
      className={`w-full flex h-screen py-5 flex-col-reverse gap-5 items-center ${
        isAuthenticated
          ? "md:flex-row-reverse"
          : "md:flex-row md:justify-between md:gap-0"
      }`}
    >
      {!isAuthenticated && (
        <>
          <div className="flex flex-1 md:h-max md:py-10 flex-col gap-5 md:gap-10 pt-10 items-center">
            <h1 className="text-[#181E4B] font-extrabold w-full flex leading-tight text-center text-2xl sm:text-4xl md:text-4xl lg:text-6xl">
              &quot;Your Voice, Your Vote: Empowering COMPSSA for a Better
              Future!&quot;
            </h1>
            <h3 className="text-[#5E6282] font-normal w-96 text-center">
              Vote for the 2023/2024 batch of executives for the Computer
              Science Students Association
            </h3>
            <div className="w-full flex flex-row justify-center mt-7">
              <Link
                href={"/login"}
                className="w-36 h-10 flex items-center justify-center rounded-[5px] ring-1 ring-[#212832] font-medium text-base"
              >
                Log In
              </Link>
            </div>
          </div>
          <div className="flex-1 md:h-full object-contain w-full flex relative ">
            <Image
              src={"/hero-img.png"}
              alt="hero-img"
              fill={true}
              className="object-contain img-anim"
            />
          </div>
        </>
      )}

      {isAuthenticated && (
        <>
          <div className="flex flex-1 md:h-max md:py-10 flex-col gap-5 pt-10  items-center md:items-start">
            <h1 className="text-[#181E4B] font-extrabold text-2xl w-full flex leading-tight text-center md:text-left sm:text-4xl lg:text-6xl xl:text-7xl">
              &quot;Your Voice, Your Vote: Empowering COMPSSA for a Better
              Future!&quot;
            </h1>
            <h3 className="text-[#5E6282] font-normal w-96 text-center md:text-left">
              Vote for the 2023/2024 batch of executives for the Computer
              Science Students Association
            </h3>
            <div className="w-full flex flex-row gap-16 items-center mt-7 justify-center md:justify-start">
              <Link
                href={"/candidates"}
                className="w-36 h-10 flex items-center justify-center rounded-[5px] bg-[#F1A501] font-medium text-base text-white"
              >
                Candidates
              </Link>
              {user?.voted === false && isAuthenticated && (
                <Link
                  href={"/vote"}
                  className="w-36 h-[41px] flex items-center justify-center rounded-[5px] ring-1 ring-[#212832] font-medium text-base"
                >
                  Vote
                </Link>
              )}
            </div>
          </div>
          <div className="flex-1 md:h-full object-contain w-full flex relative ">
            <Image
              src={"/hero-alt.png"}
              alt="hero-img"
              fill={true}
              className="object-contain img-anim"
            />
          </div>
        </>
      )}
    </main>
  );
}
