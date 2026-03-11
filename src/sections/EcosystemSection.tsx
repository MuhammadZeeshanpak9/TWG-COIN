import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Ticket, Zap, Users, ArrowRight } from 'lucide-react';
import { FloatingCoinDecoration } from '@/components/FloatingCoinDecoration';

const benefits = [
  {
    icon: Ticket,
    title: 'Event Access',
    description: 'Unlock tickets, drops, and exclusive experiences.',
  },
  {
    icon: Zap,
    title: 'Premium Features',
    description: 'Boosts, badges, and early releases.',
  },
  {
    icon: Users,
    title: 'Community Collaborations',
    description: 'Vote, propose, and shape what\'s next.',
  },
];

export function EcosystemSection() {
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
      id="ecosystem"
      className="relative w-full py-24 lg:py-32 flex items-center justify-center overflow-hidden z-20 bg-transparent"
    >
      <div className="container px-6 lg:px-16 mx-auto relative z-10">
        <FloatingCoinDecoration className="top-20 right-[5%]" size={35} delay={0.4} />
        <FloatingCoinDecoration className="bottom-10 left-[10%]" size={25} delay={1.4} />
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-brand-purple font-mono-label tracking-[0.3em] uppercase text-sm mb-4 block"
          >
            Capabilities
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-heading font-bold text-navy-1200 mb-6"
          >
            POWERING THE <br /><span className="text-brand-purple">ECOSYSTEM</span>
          </motion.h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="bg-white/50 backdrop-blur-2xl border border-white p-10 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <benefit.icon className="w-16 h-16 text-brand-purple" />
              </div>
              <div className="w-16 h-16 rounded-3xl bg-brand-purple/10 flex items-center justify-center text-brand-purple mb-8 group-hover:bg-brand-purple group-hover:text-white transition-all duration-500">
                <benefit.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-navy-1200 mb-4">{benefit.title}</h3>
              <p className="text-lavender-300 leading-relaxed text-lg">{benefit.description}</p>
              
              <motion.div 
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                className="absolute bottom-0 left-0 h-1 bg-brand-purple"
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <Button
            variant="ghost"
            className="text-brand-purple font-bold text-lg hover:bg-brand-purple/5 px-8 py-4 rounded-full group"
          >
            Explore all benefits
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
