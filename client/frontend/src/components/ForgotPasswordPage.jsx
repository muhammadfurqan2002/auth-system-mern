import { motion } from "framer-motion";
import Input from "./Input";
import { Loader, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { isLoading, forgotPassword } = useAuthStore();
  const handleSignUp = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setIsSubmitted(true)
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
          Forgot Password
        </h2>
        {!isSubmitted ? (
          <form onSubmit={handleSignUp}>
            <Input
              icon={Mail}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className="rounded-lg text-center py-3 px-4 w-full mt-5 font-bold transition duration-200 bg-green-500 hover:from-green-600"
            >
              {isLoading ? (
                <Loader className="w-6 h-6 animate-spin  mx-auto text-white" />
              ) : (
                "Send Reset Link"
              )}
            </motion.button>
          </form>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            className="rounded-lg text-center py-3 px-4 w-full mt-5 font-bold transition duration-200 bg-green-500 hover:from-green-600"
          >
            <h1>Forgot Password</h1>
            <h3>
              if an account exit {email},you will receive a password reset link
              shortly
            </h3>
            <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading}
          className="rounded-lg text-center py-3 px-4 w-full mt-5 font-bold transition duration-200 bg-green-200 hover:from-green-100"
        >
          <Link to={'/login'}>
          Back to login
          </Link>
        </motion.button>
          </motion.button>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading}
          className="rounded-lg text-center py-3 px-4 w-full mt-5 font-bold transition duration-200 bg-green-500 hover:from-green-600"
        >
            <Link to={'/login'}>
            Back to login
            </Link>
          
        </motion.button>
      </div>
    </motion.div>
  );
}
