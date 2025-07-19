import React from "react";
import { motion } from "framer-motion";

const colors = ["#60a5fa", "#a78bfa", "#34d399", "#f472b6", "#facc15", "#f87171", "#ffffff"];

const sparkles = Array.from({ length: 250 }, (_, i) => {
  const color = colors[Math.floor(Math.random() * colors.length)];
  return {
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    size: Math.random() * 6 + 2,
    color,
  };
});

export default function Layout({ children }) {
  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden text-white flex flex-col">
      {/* Sparkles */}
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          initial={{ opacity: 0.2, scale: 1 }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut",
          }}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${s.size}px`,
            height: `${s.size}px`,
            top: `${s.y}%`,
            left: `${s.x}%`,
            backgroundColor: s.color,
            boxShadow: `0 0 10px ${s.color}`,
          }}
        />
      ))}

      {/* Page content */}
      <div className="relative z-10 flex-1 p-6">{children}</div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-black via-gray-900 to-black text-white py-4 px-6 shadow-lg border-t border-gray-800 text-center relative z-10">
        © {new Date().getFullYear()} SpamShield 
      </footer>
    </div>
  );
}
