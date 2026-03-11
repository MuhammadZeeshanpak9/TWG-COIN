import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { FloatingCoinDecoration } from '@/components/FloatingCoinDecoration';

export function FinalCTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    wallet: '',
    interest: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 overflow-hidden z-20 bg-transparent"
    >
      <div className="container px-6 lg:px-16 mx-auto relative z-10">
        <FloatingCoinDecoration className="top-0 left-[30%]" size={40} delay={0.1} />
        <FloatingCoinDecoration className="bottom-10 right-[20%]" size={30} delay={1.1} />
        <div className="max-w-4xl mx-auto flex flex-col lg:flex-row items-center gap-16 bg-white/40 backdrop-blur-3xl p-10 lg:p-16 rounded-[3rem] border border-white shadow-2xl relative overflow-hidden">
          
          {/* Background Highlight */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
          
          {/* Left: Content */}
          <div className="w-full lg:w-1/2 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50, rotate: -15 }}
              whileInView={{ 
                opacity: 1, 
                x: 0, 
                rotate: 0,
                transition: { type: "spring", stiffness: 60, damping: 12 } 
              }}
              viewport={{ once: true }}
              className="w-24 h-24 mb-4"
            >
              <img src="/coin-platinum.png" alt="Coin" className="w-full h-full object-contain" />
            </motion.div>
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-navy-1200 leading-tight">
              READY TO OWN <br /> <span className="text-brand-purple">THE FUTURE?</span>
            </h2>
            <p className="text-lavender-300 text-lg">
              Get updates, early access, and collaboration opportunities in the TWGC ecosystem.
            </p>
          </div>

          {/* Right: Form */}
          <div className="w-full lg:w-1/2">
            {!isSubmitted ? (
              <motion.form
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-navy-1200 font-bold ml-1">Name</Label>
                    <Input
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="bg-white/50 border-brand-purple/10 rounded-2xl h-14 px-6 focus:ring-brand-purple"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-navy-1200 font-bold ml-1">Email</Label>
                    <Input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="bg-white/50 border-brand-purple/10 rounded-2xl h-14 px-6 focus:ring-brand-purple"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-navy-1200 font-bold ml-1">Role / Interest</Label>
                  <Select
                    value={formData.interest}
                    onValueChange={(value) => handleInputChange('interest', value)}
                  >
                    <SelectTrigger className="bg-white/50 border-brand-purple/10 rounded-2xl h-14 px-6">
                      <SelectValue placeholder="How would you like to contribute?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="investor">Early Investor</SelectItem>
                      <SelectItem value="builder">Builder / Developer</SelectItem>
                      <SelectItem value="community">Community Member</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-brand-purple hover:bg-brand-deep text-white font-bold h-16 rounded-2xl shadow-xl transition-all hover:-translate-y-1"
                >
                  Join Movement
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center p-8 rounded-3xl bg-brand-purple/5 border border-brand-purple/20"
              >
                <div className="w-16 h-16 bg-brand-purple rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand-purple/20">
                  <Check className="text-white w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-navy-1200 mb-2">Welcome Aboard!</h3>
                <p className="text-lavender-300">We've received your interest. Stay tuned for updates.</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
