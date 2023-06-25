"use client";
import { useContext, useRef, useState } from "react";
import Image from "next/image";
import OtpInput from "react-otp-input";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../context/AuthContext";

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
      return alert('Kindly fill all fields')
    }

    if (!mailRef.current.value.includes("@st.ug.edu.gh")) {
      setLoading('Login')
      return alert("Kindly log in using your student email")
    }

    if (otp.length !== 5) {
      setLoading('Login')
      return alert('Otp needs to be five values')
    }

    let data = {
      email: mailRef.current.value,
      otp
    }
    // alert(`OTP has been sent to your email ${mailRef.current?.value}`);
    const res = await signIn(data)
    // localStorage.setItem('isAuthenticated', 'true')
    if (!res.success) {
      console.log(res.error)
      return alert("There was a problem logging you in. Kindly check your internet connection or credentials")
    }
    setLoading('Logged In')
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
            <h3
              className="text-[#323A46] font-semibold text-base"
            >
              Student Email
            </h3>
            <input
              type="email"
              name="mail"
              id="mail"
              ref={mailRef}
              autoFocus={true}
              className="ring-1 ring-[#5D5E5F] bg-[#F4F4F4] outline-none h-12 rounded-lg px-2"
            />
          </div>
          <div className="w-96 flex flex-col gap-3">
            <h3
              className="text-[#323A46] font-semibold text-base"
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
      <div className="flex-1 object-contain w-full h-[100%] flex relative">
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
