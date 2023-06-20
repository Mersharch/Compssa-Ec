/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const Candidates = () => {
  const { token } = useContext(AuthContext);
  const [data, setData] = useState();

  useEffect(() => {
    const getCandidates = async () => {
      try {
        const res = await fetch(
          "https://dcsvoting.pythonanywhere.com/api/v1/candidates/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const dt = await res.json();
        setData(dt);
      } catch (error) {
        console.log("Error  ", error);
      }
    };

    getCandidates();
  }, []);
  return (
    <main className="flex-1 flex flex-col pt-7 gap-5">
      <h1 className="text-[#181E4B] font-extrabold text-3xl w-full leading-tight text-center">
        Candidates
      </h1>
      <hr className="h-2 bg-gray-300" />
      {data && console.log(data[0].candidates[0].id)}
      {data && (
        <div className="flex-1 flex flex-col gap-10">
          {data.map((item, index) => {
            return (
              <div
                key={index}
                className="w-full bg-white flex flex-col items-center gap-4"
              >
                <h3 className="text-[#181E4B] font-semibold text-2xl w-full leading-tight text-center">
                  {item.position}
                </h3>
                <div className="flex flex-row items-center justify-evenly w-full">
                  {Object.keys(item.candidates).map((lb, index) => {
                    return (
                      <div key={index} className="flex flex-col items-center space-y-4">
                        <Image
                          src={item.candidates[lb].image }
                          width={100}
                          height={100}
                          alt="Candidate-Image"
                          className="w-40 h-40 rounded-xl"
                        />
                        <h3 className="text-slate-600 text-lg font-medium italic">{item.candidates[lb].name}</h3>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default Candidates;
