/* eslint-disable react/prop-types */

import { motion } from "framer-motion";
export default function FloatingSheet({ color, size, top, left, delay }) {
  return (
    <motion.div
      animate={{ 
        y: ["0%", "100%", "0%"], 
        x: ["0%", "100%", "0%"], 
        rotate:[0,360]
      }}
      transition={{
        duration:20,
        ease:"linear",
        repeat:Infinity,
        delay
      }} aria-hidden="true"
      className={`absolute rounded-full ${color} ${size}  opacity-20 blur-xl `} style={{top,left}}
    ></motion.div>
    
  );
}
