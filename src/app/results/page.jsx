/* eslint-disable react-hooks/exhaustive-deps */
"use client";
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

ChartJS.register(
    Tooltip,
    Legend,
    Title,
    CategoryScale,
    LinearScale,
    BarElement
)

const Vote = () => {
  const { token } = useContext(AuthContext);
    const [data, setData] = useState();
    const [d,setD] = useState({
        labels: ["president", "vc", "secretary","nnn"],
        datasets: [
            {
                label: "No. Of Votes",
                data: [55, 128, 175,54],
                backgroundColor: "blue",
                borderWidth: 1,
                borderColor: "black"
            }
        ]
    })
    

    const options = {
        responsive: true,
        indexAxis:'y'
    }

  const rs = [
    {
      postion: "President",
      candidates: [
        {
          name: "Howard Walton",
          votes: 5,
        },
        {
          name: "Frederick Pope",
          votes: 100,
        },
        {
          name: "Amanda Webster",
          votes: 24,
        },
      ],
    },
  ];

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
        console.log(dt);
      } catch (error) {
        console.log("Error  ", error);
      }
    };

    getCandidates();
  }, []);
  return (
    <main className="w-full h-screen flex flex-col pt-7 gap-5 relative">
      <h1 className="text-[#181E4B] font-extrabold text-3xl w-full leading-tight text-center">
        The results are here!! These are your new executives
      </h1>
          <hr className="h-2 bg-gray-300" />
          <div className="flex flex-col w-full px-20 gap-4">
          <h3 className="text-[#181E4B] font-semibold text-2xl w-full leading-tight text-center">
          COMPSSA PRESIDENT
        </h3>
              <div className="flex flex-row items-center px-20 h-72">
                  <div></div>
                  
      <Bar data={d} options={options} className="flex-1" />
              </div>
      </div>
      

      <div className="flex flex-col w-full px-20 gap-4">
          <h3 className="text-[#181E4B] font-semibold text-2xl w-full leading-tight text-center">
          COMPSSA PRESIDENT
        </h3>
              <div className="flex flex-row items-center px-20 h-72">
                  <div></div>
                  
      <Bar data={d} options={options} className="flex-1"  />
              </div>
          </div>
    </main>
  );
};

export default Vote;





