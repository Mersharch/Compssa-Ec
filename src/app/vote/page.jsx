/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useContext, useEffect, useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AuthContext } from "../../context/AuthContext";
import VoteModal from "../../components/Modals/voteModal";
// import AuthContext from '../../context/AuthContext'

const Vote = () => {
  const { token, vote } = useContext(AuthContext);
  const [data, setData] = useState();
  const [choices, setChoices] = useState([]);
  const [voted, setVoted] = useState(false);
  const [loading, setLoading] = useState("Submit Votes");

  const handleChoice = (index, choice) => {
    setChoices((prevArray) => {
      const newArray = [...prevArray];
      newArray[index] = choice;
      return newArray;
    });
  };

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
      {voted && <VoteModal show={show} />}
      <h1 className="text-[#181E4B] font-extrabold text-3xl w-full leading-tight text-center">
        Vote for your preferred Candidates
      </h1>
      <hr className="h-2 bg-gray-300" />
      {data && (
        <div className="flex-1 flex flex-col gap-10 pb-4">
          {data.map((item, index) => {
            return (
              <div
                key={index}
                className="w-full bg-white flex flex-col items-center gap-4"
              >
                <h3 className="text-[#181E4B] font-semibold text-2xl w-full leading-tight text-center">
                  {item.position}
                </h3>
                <div className="flex flex-row items-center justify-center gap-14 w-full flex-wrap">
                  {Object.keys(item.candidates).map((lb) => {
                    return (
                      <div
                        key={item.candidates[lb].id}
                        className="flex flex-col items-center space-y-4"
                        onClick={() =>
                          handleChoice(index, item.candidates[lb].id)
                        }
                      >
                        <div
                          tabIndex={item.candidates[lb].id}
                          className="relative  focus:ring-4 focus:rounded-xl focus:ring-blue-500 focus:ease-in-out focus:duration-500"
                        >
                          <Image
                            src={item.candidates[lb].image}
                            width={100}
                            height={100}
                            alt="Candidate-Image"
                            className="w-40 h-40 rounded-xl object-cover"
                          />
                          <div className="w-40 h-40 bg-[#9F9F9F] rounded-xl absolute right-0 top-0 opacity-0 hover:opacity-50"></div>
                        </div>
                        <h3 className="text-slate-600 text-lg font-medium italic">
                          {item.candidates[lb].name}
                        </h3>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <button
            onClick={async () => {
              setLoading("Submitting your votes...");
              if (choices.length < data.length) {
                setLoading("Submit Votes");
                return toast.warn("Please make a vote for every position");
              }
              const response = await vote({ candidates: [...choices] });
              if (!response.success) {
                console.log(response.error);
                toast.error(
                  "There was a problem submitting your votes. Kindly check your internet connection or retry submitting"
                );
              }
              setLoading(res.message || "Votes Submitted");
              setChoices([]);
              setVoted(true);
            }}
            className="w-32 py-2 flex flex-row items-center justify-center text-white self-center bg-[#1E1BBE] rounded-md"
          >
            {loading}
          </button>
        </div>
      )}
    </main>
  );
};

export default Vote;
