"use client";
import { AuthContext } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

export default function Home() {
  const { isAuthenticated } = useContext(AuthContext)
  return (
    <main className={`w-full ${isAuthenticated ? 'flex flex-row-reverse gap-40': 'flex flex-row'} px-32 flex-1 py-5`} >
      {!isAuthenticated && <>
      <div className="flex flex-1 flex-col gap-5 pt-10">
        <h1 className="text-[#181E4B] font-extrabold text-5xl w-full bg-white flex leading-tight">
          &quot;Your Voice,
          <br />
          Your Vote:
          <br />
          Empowering
          <br />
          COMPSSA for a
          <br />
          Better Future!&quot;
        </h1>
        <h3 className="text-[#5E6282] font-normal w-96">
        Vote for the 2023/2024 batch of executives for the Computer Science Students Association
        </h3>
        <div className="w-full flex gap-16 items-center mt-7">
          <Link
            href={"/candidates"}
            className="w-36 h-10 flex items-center justify-center rounded-[5px] bg-[#F1A501] font-medium text-base text-white"
          >
            Candidates
          </Link>
          <Link
            href={"/login"}
            className="w-36 h-10 flex items-center justify-center rounded-[5px] ring-1 ring-[#212832] font-medium text-base"
          >
            Log In
          </Link>
        </div>
      </div>
      <div className="flex-1 object-contain w-full h-[100%] flex relative">
<Image src={'/hero-img.png'} alt="hero-img" fill={true} className="object-cover" />
      </div>
      </>}

      {isAuthenticated && <>
      <div className="flex flex-1 flex-col gap-5 pt-10">
        <h1 className="text-[#181E4B] font-extrabold text-5xl w-full bg-white flex leading-tight">
          &quot;Your Voice,
          <br />
          Your Vote:
          <br />
          Empowering
          <br />
          COMPSSA for a
          <br />
          Better Future!&quot;
        </h1>
        <h3 className="text-[#5E6282] font-normal w-96">
        Vote for the 2023/2024 batch of executives for the Computer Science Students Association
        </h3>
        <div className="w-full flex gap-16 items-center mt-7">
          <Link
            href={"/candidates"}
            className="w-36 h-10 flex items-center justify-center rounded-[5px] bg-[#F1A501] font-medium text-base text-white"
          >
            Candidates
          </Link>
          <Link
            href={"/vote"}
            className="w-36 h-10 flex items-center justify-center rounded-[5px] ring-1 ring-[#212832] font-medium text-base"
          >
            Vote
          </Link>
        </div>
      </div>
      <div className="flex-1 object-contain w-full h-[100%] flex relative">
<Image src={'/hero-img.png'} alt="hero-img" fill={true} className="object-cover" />
      </div>
      </>}
    </main>
  );
}
