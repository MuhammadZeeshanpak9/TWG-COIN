import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ShieldCheck, Landmark, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';
import { FloatingCoinDecoration } from '@/components/FloatingCoinDecoration';

gsap.registerPlugin(ScrollTrigger);

const tokenData = [
  { label: 'Blockchain Network', value: 'BNB Smart Chain (BEP-20)', icon: <Landmark className="w-5 h-5" /> },
  { label: 'Total Token Supply', value: '1,000,000,000 WGC', icon: <Wallet className="w-5 h-5" /> },
  { label: 'Security Status', value: 'Verified & Audited', icon: <ShieldCheck className="w-5 h-5" /> },
];

const distributionData = [
  { label: 'Liquidity Pool', value: '40%', color: 'bg-brand-purple' },
  { label: 'Ecosystem Growth', value: '25%', color: 'bg-indigo-400' },
  { label: 'Marketing', value: '15%', color: 'bg-indigo-300' },
  { label: 'Team & Reserve', value: '20%', color: 'bg-brand-purple/40' },
];

export function TokenSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="token"
      className="relative w-full min-h-screen py-24 flex items-center justify-center overflow-hidden z-20 bg-transparent"
    >
      <div className="container px-6 lg:px-16 mx-auto relative z-10">
        <FloatingCoinDecoration className="top-10 left-[40%]" size={30} delay={0.5} />
        <FloatingCoinDecoration className="bottom-20 right-[30%]" size={25} delay={1.5} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Interactive 3D Coin Visualization Placeholders / Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <span className="font-mono-label text-brand-purple tracking-[0.2em] mb-4 block">ARCHITECTURE</span>
            <h2 className="text-5xl lg:text-7xl font-heading font-bold text-navy-1200 leading-tight">
              THE <span className="text-brand-purple italic">WGC</span> <br /> FOUNDATION
            </h2>
            <p className="text-lavender-300 text-xl max-w-xl leading-relaxed">
              Engineered for scalability and security on the BNB Smart Chain, 
              providing a robust infrastructure for the global WGC ecosystem.
            </p>
            
            <div className="space-y-6 pt-8">
              {tokenData.map((item, i) => (
                <div key={i} className="flex items-center gap-6 p-6 rounded-3xl bg-white/40 border border-brand-purple/10 backdrop-blur-xl hover:border-brand-purple/30 transition-all shadow-sm">
                  <div className="w-12 h-12 rounded-2xl bg-brand-purple/10 flex items-center justify-center text-brand-purple">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-1">{item.label}</p>
                    <p className="text-xl font-heading font-semibold text-navy-1200">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Distribution Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white/60 backdrop-blur-2xl border border-white p-8 lg:p-12 rounded-[2.5rem] shadow-2xl overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/5 rounded-bl-full pointer-events-none" />
              
              <h3 className="text-3xl font-heading font-bold mb-10 text-navy-1200">Token Allocation</h3>
              
              <div className="space-y-8">
                {distributionData.map((item, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex justify-between items-end">
                      <span className="text-sm font-semibold text-slate-500 uppercase tracking-widest">{item.label}</span>
                      <span className="text-2xl font-heading font-bold text-brand-purple">{item.value}</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: item.value }}
                        transition={{ duration: 1.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        className={`h-full ${item.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <Button
                className="w-full mt-12 bg-navy-1200 hover:bg-brand-purple text-white py-8 rounded-3xl text-lg font-bold transition-all shadow-xl group"
              >
                Scan on BscScan
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
