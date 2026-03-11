import { motion } from 'framer-motion';

interface FloatingCoinDecorationProps {
  delay?: number;
  className?: string;
  size?: number;
}

export function FloatingCoinDecoration({ delay = 0, className = "", size = 40 }: FloatingCoinDecorationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0.4, 0.7, 0.4],
        scale: 1,
        y: [0, -15, 0],
        rotate: [0, 10, -10, 0]
      }}
      transition={{
        opacity: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
        y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay },
        rotate: { duration: 6, repeat: Infinity, ease: "easeInOut", delay },
        scale: { duration: 1, delay }
      }}
      className={`absolute pointer-events-none select-none z-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <img 
        src="/coin-platinum.png" 
        alt="Small Coin" 
        className="w-full h-full object-contain filter drop-shadow-lg opacity-60"
      />
    </motion.div>
  );
}
