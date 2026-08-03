"use client";

import React, { useState } from "react";
import { motion, useSpring, useTransform } from "motion/react";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface CurvedInputProps {
  placeholder?: string;
  buttonText?: string;
  onSubmit?: (email: string) => void;
  className?: string;
}

export function CurvedInput({
  placeholder = "Enter your email address",
  buttonText = "Get my code",
  onSubmit,
  className,
}: CurvedInputProps) {
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Elastic Curve Animation State
  const mouseX = useSpring(0.5, { stiffness: 200, damping: 20 });
  const curveY = useSpring(0, { stiffness: 300, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    mouseX.set(x);
    curveY.set(isFocused ? -6 : -3);
  };

  const handleMouseLeave = () => {
    curveY.set(0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setIsSubmitted(true);
    if (onSubmit) onSubmit(email);
  };

  return (
    <div
      className={cn("relative w-full max-w-xl mx-auto group", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <form onSubmit={handleSubmit} className="relative z-10">
        <div
          className={cn(
            "relative flex items-center bg-white rounded-full p-2 border transition-all duration-500 shadow-xl",
            isFocused
              ? "border-[#f40b68] shadow-[0_12px_40px_rgba(244,11,104,0.22)] scale-[1.01]"
              : "border-[#eadfe4] shadow-[0_10px_30px_rgba(107,38,67,0.08)] hover:border-[#fde2ec]"
          )}
        >
          {/* Animated SVG Curved Border Baseline */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none rounded-full overflow-visible"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="curved-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f40b68" />
                <stop offset="50%" stopColor="#ff3f95" />
                <stop offset="100%" stopColor="#6d26ff" />
              </linearGradient>
            </defs>

            {/* Bottom Elastic Curve Path */}
            <motion.path
              d={useTransform(
                [mouseX, curveY],
                ([x, y]) =>
                  `M 24 100 Q ${Number(x) * 100}% ${100 + Number(y)} ${100 - 24}% 100`
              )}
              fill="none"
              stroke="url(#curved-line-grad)"
              strokeWidth={isFocused ? "3" : "1.5"}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          </svg>

          {/* Email Input */}
          <div className="relative flex-1 px-5 py-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={placeholder}
              required
              className="w-full bg-transparent text-[#1e1a22] placeholder-[#a098a5] text-sm sm:text-base font-medium outline-none border-none focus:outline-none focus:ring-0"
            />
          </div>

          {/* Submit Button inside Pill */}
          <button
            type="submit"
            disabled={isSubmitted}
            className={cn(
              "button button--primary shrink-0 min-h-[48px] px-6 sm:px-8 rounded-full font-extrabold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 flex items-center gap-2 shadow-lg",
              isSubmitted
                ? "bg-emerald-600 hover:bg-emerald-600 text-white"
                : "bg-[#f40b68] hover:bg-[#ce0754] text-white hover:scale-105 active:scale-95"
            )}
          >
            {isSubmitted ? (
              <>
                <span>Code Sent!</span>
                <CheckCircle2 className="w-4 h-4 text-white" />
              </>
            ) : (
              <>
                <span>{buttonText}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Success Notification */}
      {isSubmitted && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 rounded-2xl bg-[#fff0f5] border border-[#fde2ec] text-center text-xs sm:text-sm text-[#f40b68] font-bold flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-[#f40b68]" />
          <span>Success! Your 10% discount code is on its way to {email}.</span>
        </motion.div>
      )}
    </div>
  );
}
