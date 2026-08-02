"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type SpringOptions,
} from "motion/react";

import "./TiltedCard.css";

type TiltedCardProps = {
  imageSrc: StaticImageData;
  altText: string;
  sizes: string;
  overlayContent?: ReactNode;
  className?: string;
  scaleOnHover?: number;
  rotateAmplitude?: number;
};

const springValues: SpringOptions = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

export default function TiltedCard({
  imageSrc,
  altText,
  sizes,
  overlayContent,
  className = "",
  scaleOnHover = 1.025,
  rotateAmplitude = 6,
}: TiltedCardProps) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);

  function handleMouseMove(event: React.MouseEvent<HTMLElement>) {
    if (!ref.current || reducedMotion) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;

    rotateX.set((offsetY / (rect.height / 2)) * -rotateAmplitude);
    rotateY.set((offsetX / (rect.width / 2)) * rotateAmplitude);
  }

  function handleMouseEnter() {
    if (!reducedMotion) scale.set(scaleOnHover);
  }

  function handleMouseLeave() {
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <figure
      ref={ref}
      className={`tilted-card-figure ${className}`.trim()}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="tilted-card-inner"
        style={{ rotateX, rotateY, scale }}
      >
        <Image
          src={imageSrc}
          alt={altText}
          className="tilted-card-img"
          fill
          sizes={sizes}
          placeholder="blur"
        />
        {overlayContent ? (
          <div className="tilted-card-overlay">{overlayContent}</div>
        ) : null}
      </motion.div>
    </figure>
  );
}
