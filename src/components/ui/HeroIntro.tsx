"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function HeroIntro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 800); // ⏱ أقل من ثانية

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 flex items-center justify-center bg-black"
    >
      <div className="text-center text-white">
        <h1 className="text-3xl md:text-4xl font-bold tracking-wide text-yellow-400">
          Pico Media
        </h1>

        <p className="mt-3 text-sm md:text-base text-white/80">
          Digital Marketing & Creative Agency
        </p>

        <div className="mt-10 flex justify-center animate-bounce">
          <ChevronDown className="text-yellow-400" size={32} />
        </div>
      </div>
    </motion.div>
  );
}
