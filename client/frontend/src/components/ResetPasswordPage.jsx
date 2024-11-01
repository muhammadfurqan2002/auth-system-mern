import { motion } from "framer-motion";
import Input from "./Input";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Lock } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { isLoading, resetPassword, error, message } = useAuthStore();
  const navigate = useNavigate();
  const { token } = useParams();
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await resetPassword(token, password);
      toast.success("Password reset successfully, redirecting to login page");
      if (!error) {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.message);
    }
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
        {error && <h3>{error}</h3>}
        {message && <h3>{message}</h3>}
        <br />
        <form onSubmit={handleSignUp}>
          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            type="submit"
            className="rounded-lg text-center py-3 px-4 w-full mt-5 font-bold transition duration-200 bg-green-500 hover:from-green-600"
          >
            {isLoading ? "Resetting" : "Set New Password"}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}
