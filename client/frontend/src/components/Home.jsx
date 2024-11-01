import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";

export const formData = (date) => {
  const _date = new Date(date);
  if (isNaN(_date.getTime())) {
    return "Invalid Date";
  }
  return _date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
export default function Home() {

  const { user ,logout} = useAuthStore();
  const handleLogOut=()=>{
    logout();
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, top: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full tex-center bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <h2 className="">Dashboard</h2>
      <br />
      <div className="p-10">
        <h2>{user.name}</h2>
        <h2>{user.email}</h2>

        <p>
            <span>
                joined: {new Date(user.createdAt).toLocaleDateString("en-US",{
                    year:"numeric",
                    month:"long",
                    day:"numeric"
                })}
            </span>
        </p>
        <p>
          <span>Last Login:</span>
          {user.lastLogin ? formData(user.lastLogin) : "You just signed up"}
        </p>
      </div>
      <div>
        <button type="button" onClick={handleLogOut}>Logout</button>
      </div>
    </motion.div>
  );
}
