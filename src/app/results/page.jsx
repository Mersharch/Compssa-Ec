/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import useSWR from 'swr'
import { useContext, useEffect, useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AuthContext } from "../../context/AuthContext";
import VoteModal from "../../components/Modals/voteModal";
import {
    Chart as ChartJS,
    Tooltip,
    Legend,
    Title,
    CategoryScale,
    LinearScale,
    BarElement
} from 'chart.js';
import { Bar } from "react-chartjs-2";
import { ClipLoader } from 'react-spinners';

ChartJS.register(
    Tooltip,
    Legend,
    Title,
    CategoryScale,
    LinearScale,
    BarElement
)
const fetcher = (...args) => fetch(...args).then(res => res.json())


const Results = () => {
  const { token } = useContext(AuthContext);
  const { data, error, isLoading } = useSWR('https://dcsvoting.pythonanywhere.com/api/v1/results/', fetcher, {refreshInterval:1500})

    // const [data, setData] = useState();
    

    const options = {
        responsive: true,
        indexAxis:'y'
    }

  return (
    <main className="w-full h-screen flex flex-col pt-7 gap-5 relative">
      <h1 className="text-[#181E4B] font-extrabold text-3xl w-full leading-tight text-center">
        The results are here!! These are your new executives
      </h1>
      <hr className="h-2 bg-gray-300" />
      {isLoading && <div className='flex-1 h-screen flex flex-row items-center justify-center'>
        {/* <ClipLoader color="#36d7b7" size={75} aria-label="Loading Spinner" /> */}
        <h3 className='font-semibold text-2xl'>Loading...</h3>
      </div>}
      {error && <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-[#8B8B8B] font-extrabold text-9xl">404</h1>
        <h3 className="text-[#8B8B8B] font-semibold text-4xl">New executives not found!</h3>
        <h3 className="text-[#8B8B8B] font-semibold text-4xl">voting is not yet over</h3>
      </div>}
      {data && 
        <div className="flex-1 w-scree pb-10 self-center grid-cols-2 gap-10 grid items-center justify-items-center">
          {data.map((item, index) => {
            return (
          <div className="flex flex-col items-center w-max gap-4" key={index}>
          <h3 className="text-[#181E4B] font-semibold text-2xl w-full leading-tight text-center">
          COMPSSA {item.position.toUpperCase()}
        </h3>
              <div className="flex flex-row w-[550px] items-center justify-center px-10 h-72 ring-1 ring-slate-300 py-4 bg-white">
                  
      <Bar data={item.data} options={options} className="w-full" />
              </div>
      </div>

            )
          })}
      </div>
      }
    
    </main>
  );
};

export default Results;





