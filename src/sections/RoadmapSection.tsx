import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Rocket, ShieldCheck, Landmark, Wallet, TrendingUp } from 'lucide-react';
import { FloatingCoinDecoration } from '@/components/FloatingCoinDecoration';

const phases = [
  {
    phase: 'Phase 1',
    title: 'Token Architecture',
    description: 'Defining the foundation: BNB Smart Chain (BEP-20) network, 1 Billion total supply, and tax structure.',
    icon: Rocket,
  },
  {
    phase: 'Phase 2',
    title: 'Smart Contract Development',
    description: 'Development, security audits, and contract verification on BscScan for total transparency.',
    icon: ShieldCheck,
  },
  {
    phase: 'Phase 3',
    title: 'Liquidity & Public Trading',
    description: 'Creating liquidity pool on PancakeSwap. Making TWGC tradable using MetaMask and Trust Wallet.',
    icon: Landmark,
  },
  {
    phase: 'Phase 4',
    title: 'Website & Purchase System',
    description: 'Full ecosystem platform with wallet connection, direct purchases, and donation tracking.',
    icon: Wallet,
  },
  {
    phase: 'Phase 5',
    title: 'Listing & Expansion',
    description: 'Listing on CoinMarketCap, CoinGecko, and Centralized Exchanges (CEX). Global adoption.',
    icon: TrendingUp,
  },
];

export function RoadmapSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "circOut" as any },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="roadmap"
      className="relative w-full py-32 overflow-hidden z-20 bg-transparent"
    >
      <div className="container px-6 lg:px-16 mx-auto relative z-10">
        <FloatingCoinDecoration className="top-0 left-10" size={30} delay={0.2} />
        <FloatingCoinDecoration className="bottom-40 right-10" size={40} delay={1.2} />
        <FloatingCoinDecoration className="top-1/2 left-[5%]" size={25} delay={2.2} />
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-brand-purple font-mono-label tracking-[0.3em] uppercase text-sm mb-4 block"
          >
            Evolution
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-6xl font-heading font-bold text-navy-1200 mb-6"
          >
            OUR <span className="text-brand-purple italic">ROADMAP</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            className="h-1 bg-brand-purple mx-auto mb-8"
          />
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Desktop Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 hidden md:block -translate-x-1/2" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-12"
          >
            {phases.map((phase, i) => (
              <div key={i} className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                {/* Content Card */}
                <motion.div 
                  variants={cardVariants}
                  className="w-full md:w-[45%]"
                >
                  <div className="bg-white/60 backdrop-blur-xl border border-brand-purple/5 p-8 rounded-[2rem] shadow-lg hover:shadow-xl hover:border-brand-purple/20 transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                      <phase.icon className="w-20 h-20 text-brand-purple" />
                    </div>
                    <span className="text-brand-purple font-mono text-sm mb-2 block">{phase.phase}</span>
                    <h3 className="text-2xl font-heading font-bold text-navy-1200 mb-4">{phase.title}</h3>
                    <p className="text-lavender-300 leading-relaxed">{phase.description}</p>
                  </div>
                </motion.div>

                {/* Center Node */}
                <div className="relative z-10 hidden md:flex items-center justify-center w-[10%]">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-md flex items-center justify-center group">
                    <div className="w-4 h-4 rounded-full bg-brand-purple group-hover:scale-125 transition-transform" />
                  </div>
                </div>

                {/* Empty Spacer */}
                <div className="hidden md:block md:w-[45%]" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
