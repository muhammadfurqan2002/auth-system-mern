import { motion } from "framer-motion";
import Input from "./Input";
import { Loader, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const isLoading=false;
  const {login,isLoading,error}=useAuthStore();  
  const handleSignUp = async(e) => {
    e.preventDefault();
    await login(email,password)
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, top: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8 ">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Welcome Back
        </h2>
        <form onSubmit={handleSignUp}>
          <Input
            icon={Mail}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex items-center mb-6">
            <Link
              to={"/forgot-password"}
              className="text-sm text-green-400 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          {error && <p>{error}</p>}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }} disabled={isLoading} 
            className="rounded-lg text-center py-3 px-4 w-full mt-5 font-bold transition duration-200 bg-green-500 hover:from-green-600"
          >
           {isLoading?<Loader className="w-6 h-6 animate-spin  mx-auto text-white"/>:"Login"}
          </motion.button>
        </form>
      </div>
      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
        <p className="tex-sm text-gray-400">
          Don&apos;t have an account? 
          <Link to={"/signup"} className="text-green-400">
            Sign Up
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
