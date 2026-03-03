import { useMemo } from "react";
import { motion } from "framer-motion";

type MovingOrbsProps = {
  count?: number;
};

type OrbConfig = {
  size: number;
  top: number;
  left: number;
  blur: number;
  duration: number;
  delay: number;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  colorClass: string;
};

const colorClasses = [
  "bg-[#FED65E]/14",
  "bg-[#7F4BFF]/16",
  "bg-[#4C12BF]/16",
  "bg-[#96A8FF]/14",
  "bg-[#EAD8FF]/10",
];

const MovingOrbs = ({ count = 8 }: MovingOrbsProps) => {
  const orbs = useMemo<OrbConfig[]>(
    () =>
      Array.from({ length: count }, (_, index) => ({
        size: 120 + Math.random() * 220,
        top: Math.random() * 90,
        left: Math.random() * 95,
        blur: 45 + Math.random() * 30,
        duration: 10 + Math.random() * 16,
        delay: Math.random() * 4,
        x1: -80 + Math.random() * 160,
        x2: -100 + Math.random() * 200,
        y1: -70 + Math.random() * 140,
        y2: -90 + Math.random() * 180,
        colorClass: colorClasses[index % colorClasses.length],
      })),
    [count],
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb, index) => (
        <motion.div
          key={`orb-${index}`}
          className={`absolute rounded-full ${orb.colorClass}`}
          style={{
            width: orb.size,
            height: orb.size,
            top: `${orb.top}%`,
            left: `${orb.left}%`,
            filter: `blur(${orb.blur}px)`,
          }}
          animate={{
            x: [0, orb.x1, orb.x2, 0],
            y: [0, orb.y1, orb.y2, 0],
            scale: [1, 1.08, 0.96, 1],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default MovingOrbs;
