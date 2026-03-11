import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { FloatingCoinDecoration } from '@/components/FloatingCoinDecoration';

export function CoinStatementSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen py-24 flex items-center justify-center overflow-hidden z-20 bg-transparent"
    >
      <div className="container px-6 lg:px-16 mx-auto relative z-10">
        <FloatingCoinDecoration className="top-[10%] right-[15%]" size={30} delay={0.3} />
        <FloatingCoinDecoration className="bottom-[15%] left-[30%]" size={20} delay={1.3} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Visual Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -100, rotate: -20 }}
            whileInView={{ 
              opacity: 1, 
              x: 0, 
              rotate: 0,
              transition: { 
                type: "spring",
                stiffness: 40,
                damping: 18,
                delay: 0.1
              }
            }}
            viewport={{ once: true }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative w-72 h-72 md:w-[32rem] md:h-[32rem]">
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotateZ: [0, 5, 0]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <img
                  src="/coin-platinum.png"
                  alt="The Coin"
                  className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(159,129,185,0.3)]"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <div className="space-y-8">
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="font-mono-label text-brand-purple tracking-widest uppercase"
            >
              The Vision
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl lg:text-7xl font-heading font-bold text-navy-1200 leading-tight"
            >
              NOT JUST A <br />
              <span className="text-brand-purple italic">TOKEN.</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lavender-300 text-xl leading-relaxed max-w-xl"
            >
              WGC powers a multi-dimensional ecosystem, from AI-driven utilities 
              to exclusive digital experiences. It is the fuel for our shared future.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="pt-4 flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                className="bg-navy-1200 hover:bg-brand-purple text-white font-bold px-10 py-8 rounded-full text-lg transition-all shadow-xl"
              >
                Explore Ecosystem
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
