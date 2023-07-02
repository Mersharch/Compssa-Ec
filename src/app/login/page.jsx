"use client";
import { useContext, useRef, useState } from "react";
import Image from "next/image";
import OtpInput from "react-otp-input";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../context/AuthContext";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState("Login");
  const mailRef = useRef();
  const router = useRouter();
  const {signIn} = useContext(AuthContext)

  const handleSubmit = async () => {
    setLoading('Logging in...')
    if (!mailRef.current.value || !otp) {
      setLoading('Login')
      return toast.warn('Kindly fill all fields')
    }

    if (!mailRef.current.value.includes("@st.ug.edu.gh")) {
      setLoading('Login')
      return toast.warn("Kindly log in using your student email")
    }

    
    if (otp.length !== 5) {
      setLoading('Login')
      return toast.warn('Otp needs to be five values')
    }

    let data = {
      email: mailRef.current.value,
      otp
    }
    const res = await signIn(data)
    if (!res.success) {
      console.log(res.error)
      setLoading("Login")
      return toast.error("There was a problem logging you in. Kindly check your internet connection or credentials")
    }
    toast.success("Login Successfully")
    setLoading('Logged In')
    router.push('/')
  };

  return (
    <main className="w-full px-10 flex flex-1 flex-row py-5 md:gap-5 md:items-center justify-center xl:pl-40">
      <div className="w-96 flex flex-col justify-center gap-5">
        <div className="flex flex-col gap-5">
          <h1 className="font-bold text-4xl lg:text-5xl text-center">Hey there,</h1>
          <h3 className="text-[#7E8B9E] font-medium text-lg lg:text-2xl text-center">
            Login and choose your candidate
          </h3>
        </div>
        <div className="flex flex-col gap-5 w-full">
          <div className="w-full flex flex-col gap-3">
            <h3
              className="text-[#323A46] font-semibold text-base lg:text-lg"
            >
              Student Email
            </h3>
            <input
              type="email"
              name="mail"
              id="mail"
              ref={mailRef}
              autoFocus={true}
              className="ring-1 ring-[#5D5E5F] bg-[#F4F4F4] w-full outline-none h-12 rounded-lg px-2"
            />
          </div>
          <div className="w-full flex flex-col gap-3">
            <h3
              className="text-[#323A46] font-semibold text-base lg:text-lg"
            >
              OTP
            </h3>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={5}
              inputStyle={{
                width: "48px",
                background: "#F4F4F4",
                border: "1px solid #5d5e5f",
                outline: "none",
                height: "48px",
                textAlign: "center",
                borderRadius: "0.5rem",
              }}
              renderSeparator={
                <span>
                  <pre> </pre>
                </span>
              }
              renderInput={(props) => <input {...props} />}
            />
          </div>
        </div>
        

        <button onClick={handleSubmit} className="flex flex-row items-center justify-center w-full h-10 bg-[#3568FF] text-white rounded-lg">

         { loading}
        </button>
      </div>
      <div className="md:flex-1 object-contain w-full h-full md:flex relative hidden">
        <Image
          src={"/vote.png"}
          alt="hero-img"
          fill={true}
          className="object-contain img-anim"
        />
      </div>
    </main>
  );
};

export default Login;
