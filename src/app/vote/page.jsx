/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useContext, useEffect, useState } from 'react';
import React from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { AuthContext } from '../../context/AuthContext';
// import AuthContext from '../../context/AuthContext'


const Vote = () => {
  const { token } = useContext(AuthContext)
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
        Vote for your preferred Candidates
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
                <div>
                  {Object.keys(item.candidates).map((lb, index) => {
                    return (
                      <div key={index} className="flex flex-col items-center space-y-4" onClick={() => alert(item.candidates[lb].name)}>
                        <div className='relative'>
                          
                        <Image
                          src={item.candidates[lb].image }
                          width={100}
                          height={100}
                          alt="Candidate-Image"
                          className="w-40 h-40 rounded-xl object-fill"
                          />
                          <div className='w-40 h-40 bg-[#9F9F9F] rounded-xl absolute right-0 top-0 opacity-0 hover:opacity-50'></div>
                          </div>
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

export default Vote