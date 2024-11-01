/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast"
export default function EmailVerification() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const { error, isLoading, verifyEmail:emailCode } = useAuthStore();
  const handleChange = (index, value) => {
    const newCode = [...code];
    // handle pasted content
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    alert(`Verification code submitted: ${verificationCode}`);
    try {
      await emailCode(verificationCode);
      navigate("/");
      toast.success("Email verified successfully")
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);

  return (
    <div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, top: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full p-8 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden"
      >
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Verify Your Email
        </h2>
        <p className="text-center text-gray-300 mb-6">
          Enter the 6-digit code sent to your email address.
        </p>
        {error && <p>{error}</p>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex justify-between">
            {code.map((digit, index) => (
              <input
                type="text"
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                maxLength="6"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 rounded-lg"
              />
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            className="rounded-lg text-center py-3 px-4 w-full mt-5 font-bold transition duration-200 bg-green-500 hover:from-green-600"
          >
            {isLoading ? (
              <Loader className="w-6 h-6 animate-spin  mx-auto text-white" />
            ) : (
              "Verify Email"
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
