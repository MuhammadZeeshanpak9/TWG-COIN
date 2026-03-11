import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FloatingCoinDecoration } from '@/components/FloatingCoinDecoration';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "circOut" as any },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden z-20 bg-transparent"
    >
      {/* Hero Coin (Floating & Slide-in) */}
      <motion.div
        initial={{ opacity: 0, x: -200, rotate: -20 }}
        animate={{ 
          opacity: 1, 
          x: 0, 
          rotate: 0,
          transition: { 
            type: "spring",
            stiffness: 40,
            damping: 20,
            delay: 0.5 
          } 
        }}
        className="absolute left-[-5%] lg:left-[5%] top-1/2 -translate-y-1/2 w-48 h-48 lg:w-96 lg:h-96 pointer-events-none z-0"
      >
        <motion.img
          src="/coin-platinum.png"
          alt="Coin"
          className="w-full h-full object-contain filter drop-shadow-[0_0_50px_rgba(159,129,185,0.3)]"
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Hero Coin (Right Side - Mirrored) */}
      <motion.div
        initial={{ opacity: 0, x: 200, rotate: 20 }}
        animate={{ 
          opacity: 1, 
          x: 0, 
          rotate: 0,
          transition: { 
            type: "spring",
            stiffness: 40,
            damping: 20,
            delay: 0.7 
          } 
        }}
        className="absolute right-[-5%] lg:right-[5%] top-1/2 -translate-y-1/2 w-48 h-48 lg:w-96 lg:h-96 pointer-events-none z-0"
      >
        <motion.img
          src="/coin-platinum.png"
          alt="Coin"
          className="w-full h-full object-contain filter drop-shadow-[0_0_50px_rgba(159,129,185,0.3)]"
          animate={{ y: [-15, 5, -15], rotate: [0, -5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <FloatingCoinDecoration className="top-[20%] right-[10%]" size={30} delay={0.2} />
      <FloatingCoinDecoration className="bottom-[30%] left-[15%]" size={25} delay={0.8} />
      <FloatingCoinDecoration className="top-[60%] right-[20%]" size={35} delay={1.2} />
      
      {/* Content Container */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full px-6 lg:px-16 xl:px-24 max-w-[1600px] text-center"
      >
        <div className="flex flex-col items-center">
          {/* Phase Badge */}
          <motion.span
            variants={itemVariants}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple font-mono-label mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-brand-purple animate-pulse" />
            PHASE 1: GENESIS LAUNCH
          </motion.span>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-heading font-bold text-navy-1200 text-5xl sm:text-6xl md:text-7xl lg:text-9xl tracking-tight mb-8 max-w-5xl leading-[1.1]"
          >
            TWGC: THE <span className="text-brand-purple italic">WORLD'S</span> <br /> GREATEST COIN
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-lavender-300 text-xl sm:text-2xl md:text-3xl mb-12 max-w-2xl font-light"
          >
            A high-performance ecosystem built for the future of decentralized finance.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto mt-4"
          >
            <Button
              size="lg"
              className="bg-brand-purple hover:bg-brand-deep text-white font-bold px-10 py-8 rounded-full text-lg transition-all hover:-translate-y-1 shadow-xl hover:shadow-brand-purple/20"
            >
              Join Private Sale
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-brand-purple/30 text-brand-purple hover:bg-brand-purple/5 font-semibold px-10 py-8 rounded-full text-lg transition-all hover:-translate-y-1 flex items-center gap-2"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Connect Wallet
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Decorative refined elements */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
        <span className="text-xs font-mono uppercase tracking-widest text-slate-400">Scroll to Explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-brand-purple to-transparent" />
      </div>
    </section>
  );
}
