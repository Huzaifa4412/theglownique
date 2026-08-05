import Image from "next/image";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const transition = {
  type: "spring" as const,
  mass: 0.4,
  damping: 14,
  stiffness: 120,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      onMouseEnter={() => setActive(item)}
      className="relative py-1 cursor-pointer group"
    >
      <motion.p
        transition={{ duration: 0.2 }}
        className={cn(
          "text-xs sm:text-sm font-extrabold tracking-tight transition-colors flex items-center gap-1.5",
          active === item ? "text-[#ce0754]" : "text-[#1e1a22] hover:text-[#ce0754]"
        )}
      >
        <span>{item}</span>
        <span
          className={cn(
            "text-[9px] transition-transform duration-300 inline-block opacity-60",
            active === item ? "rotate-180 text-[#ce0754]" : "group-hover:translate-y-0.5"
          )}
        >
          ▼
        </span>
      </motion.p>

      {/* Hover Active Indicator Line */}
      {active === item && (
        <motion.div
          layoutId="active-nav-underline"
          className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-[#f40b68] to-[#6d26ff]"
        />
      )}

      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && children && (
            <div className="absolute top-[calc(100%_+_0.8rem)] left-1/2 transform -translate-x-1/2 pt-2 z-50">
              <motion.div
                transition={transition}
                layoutId="active-dropdown"
                className="bg-white/95 backdrop-blur-2xl rounded-2xl overflow-hidden border border-[#eadfe4] shadow-[0_22px_60px_rgba(107,38,67,0.14)]"
              >
                <motion.div layout className="w-max h-full p-4">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
  className,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className={cn(
        "relative flex items-center justify-center space-x-6 py-1",
        className
      )}
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <a
      href={href}
      className="flex space-x-3 p-2 rounded-xl hover:bg-[#fff0f5] transition-colors group border border-transparent hover:border-[#fde2ec]"
    >
      <Image
        src={src}
        width={110}
        height={65}
        alt={title}
        className="shrink-0 rounded-lg object-cover shadow-sm group-hover:scale-105 transition-transform"
        unoptimized
      />
      <div>
        <h4 className="text-xs font-extrabold text-[#1e1a22] group-hover:text-[#ce0754] transition-colors mb-0.5">
          {title}
        </h4>
        <p className="text-[#5e5862] text-[11px] leading-tight max-w-[11rem]">
          {description}
        </p>
      </div>
    </a>
  );
};

export const HoveredLink = ({
  children,
  className,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <a
      {...rest}
      className={cn(
        "text-[#1e1a22] hover:text-[#ce0754] text-xs font-bold transition-colors",
        className
      )}
    >
      {children}
    </a>
  );
};
