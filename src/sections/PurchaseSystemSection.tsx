import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Wallet, CreditCard, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: Wallet,
    title: 'Wallet Connect',
    description: 'Instantly connect via MetaMask, Trust Wallet, or Phantom.',
  },
  {
    icon: CreditCard,
    title: 'Fiat Gateway',
    description: 'Purchase TWGC directly using Credit Card or Bank Transfer.',
  },
  {
    icon: ShieldCheck,
    title: 'Safe Vault',
    description: 'Industrial-grade security for your digital assets.',
  },
];

export function PurchaseSystemSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="purchase"
      className="relative w-full py-24 lg:py-32 overflow-hidden z-20 bg-transparent"
    >
      <div className="container px-6 lg:px-16 mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left: Content */}
          <div className="w-full lg:w-1/2 space-y-8">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="font-mono-label text-brand-purple tracking-widest uppercase"
            >
              Phase 4: Purchase System
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl lg:text-7xl font-heading font-bold text-navy-1200 leading-tight"
            >
              SEAMLESS <br /> <span className="text-brand-purple">ACQUISITION</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lavender-300 text-xl leading-relaxed max-w-lg"
            >
              Bridging the gap between traditional finance and the decentralized world. 
              Our ecosystem is designed for universal accessibility.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="pt-4"
            >
              <Button
                size="lg"
                className="bg-brand-purple hover:bg-brand-deep text-white font-bold px-10 py-8 rounded-full text-lg transition-all shadow-xl"
              >
                Explore Dashboard
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </div>

          {/* Right: Features Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                className={`p-8 rounded-[2rem] bg-white/40 border border-brand-purple/5 backdrop-blur-xl hover:border-brand-purple/30 transition-all group ${i === 0 ? 'sm:col-span-2' : ''}`}
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-purple/10 flex items-center justify-center text-brand-purple mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-navy-1200 mb-4">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed mb-6">{feature.description}</p>
                <div className="flex items-center text-brand-purple text-xs font-bold tracking-widest uppercase gap-2">
                  <Zap className="w-4 h-4" /> Coming Soon
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
