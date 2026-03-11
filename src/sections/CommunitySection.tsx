import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Globe, MessageSquare } from 'lucide-react';
import { FloatingCoinDecoration } from '@/components/FloatingCoinDecoration';

const stats = [
  { value: '12K+', label: 'Holders', icon: Users },
  { value: '40+', label: 'Countries', icon: Globe },
  { value: '24/7', label: 'Support', icon: MessageSquare },
];

export function CommunitySection() {
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

  const itemVariants = {
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
      id="community"
      className="relative w-full py-24 lg:py-32 overflow-hidden z-20 bg-transparent"
    >
      <div className="container px-6 lg:px-16 mx-auto relative z-10">
        <FloatingCoinDecoration className="top-10 left-[20%]" size={35} delay={0.6} />
        <FloatingCoinDecoration className="bottom-0 right-[40%]" size={25} delay={1.6} />
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left: Content */}
          <div className="w-full lg:w-1/2 space-y-8">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="font-mono-label text-brand-purple tracking-widest uppercase"
            >
              Our Movement
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl lg:text-7xl font-heading font-bold text-navy-1200 leading-tight"
            >
              JOIN THE <br /> <span className="text-brand-purple">GLOBAL VYBE.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lavender-300 text-xl leading-relaxed max-w-lg"
            >
              Early collaborators shape the roadmap. Holders unlock access. 
              The community builds the future together.
            </motion.p>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="p-6 rounded-3xl bg-white/40 border border-brand-purple/5 backdrop-blur-lg"
                >
                  <div className="text-brand-purple mb-2">
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-bold text-navy-1200">{stat.value}</div>
                  <div className="text-slate-500 text-sm font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="pt-4"
            >
              <Button
                size="lg"
                className="bg-brand-purple hover:bg-brand-deep text-white font-bold px-10 py-8 rounded-full text-lg transition-all shadow-xl"
              >
                Join Discord
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </div>

          {/* Right: Abstract Visual */}
          <motion.div
            initial={{ opacity: 0, x: 100, rotate: 10 }}
            whileInView={{ 
              opacity: 1, 
              x: 0, 
              rotate: 0,
              transition: { 
                type: "spring",
                stiffness: 50,
                damping: 15,
                delay: 0.2
              }
            }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 flex justify-center relative invisible lg:visible"
          >
            <div className="relative w-full max-w-lg aspect-square">
               {/* Decorative rings */}
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-0 border-2 border-brand-purple/10 rounded-full" 
               />
               <motion.div 
                 animate={{ rotate: -360 }}
                 transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-8 border border-brand-purple/5 rounded-full" 
               />
               <div className="absolute inset-0 flex items-center justify-center">
                 <motion.img 
                   src="/coin-platinum.png" 
                   alt="Coin" 
                   className="w-3/4 h-3/4 object-contain drop-shadow-2xl"
                   animate={{ y: [0, -15, 0] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 />
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
