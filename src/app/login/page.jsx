"use client";
import { useContext, useRef, useState } from "react";
import Image from "next/image";
import OtpInput from "react-otp-input";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

const Login = () => {
  const [otp, setOtp] = useState("");
  const mailRef = useRef();
  const router = useRouter();
  const {signIn} = useContext(AuthContext)

  const handleSubmit = () => {
    if (!mailRef.current.value) {
      return alert('Kindly enter your student mail to login')
    }
    alert(`OTP has been sent to your email ${mailRef.current?.value}`);
    signIn()
    // localStorage.setItem('isAuthenticated', 'true')
    router.push('/')
    
  };

  return (
    <main className="w-full flex px-32 flex-1 py-5 gap-44 items-center">
      <div className="w-96 flex flex-col h-max justify-center gap-10">
        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-4xl">Hey there,</h1>
          <h3 className="text-[#7E8B9E] font-medium text-lg">
            Login and choose your candidate
          </h3>
        </div>
        <div className="flex flex-col gap-3">
          <div className="w-96 flex flex-col gap-3">
            <label
              htmlFor="mail"
              className="text-[#323A46] font-semibold text-base"
            >
              Student Email
            </label>
            <input
              type="email"
              name="mail"
              id="mail"
              ref={mailRef}
              className="ring-1 ring-[#5D5E5F] bg-[#F4F4F4] outline-none h-12 rounded-lg px-2"
            />
          </div>
          <div className="w-96 flex flex-col gap-3">
            <label
              htmlFor="otp"
              className="text-[#323A46] font-semibold text-base"
            >
              OTP
            </label>
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
          Login
        </button>
      </div>
      <div className="flex-1 object-contain w-full h-[100%] flex relative">
        <Image
          src={"/hero-img.png"}
          alt="hero-img"
          fill={true}
          className="object-cover"
        />
      </div>
    </main>
  );
};

export default Login;
