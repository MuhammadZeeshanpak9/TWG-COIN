import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Ecosystem', href: '#ecosystem' },
    { label: 'Token', href: '#token' },
    { label: 'Roadmap', href: '#roadmap' },
    { label: 'Community', href: '#community' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-brand-purple/10 py-4 shadow-sm'
          : 'bg-transparent py-6'
          }`}
      >
        <div className="container px-6 lg:px-12 mx-auto">
          <div className="flex items-center justify-between">
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 relative">
                <img
                  src="/coin-platinum.png"
                  alt="WGC Logo"
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
                />
              </div>
              <span className="font-heading font-bold text-navy-1200 text-sm lg:text-base hidden sm:block tracking-wider uppercase">
                THE WORLD&apos;S GREATEST COIN
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="text-slate-600 hover:text-brand-purple transition-colors text-sm font-bold uppercase tracking-widest"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex items-center gap-4">
              <Button
                className="hidden sm:flex bg-brand-purple hover:bg-brand-deep text-white font-bold px-8 rounded-full transition-all shadow-lg hover:shadow-brand-purple/20"
              >
                Join Now
              </Button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-navy-1200"
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
      >
        <div className="absolute inset-0 bg-white/90 backdrop-blur-2xl" />
        <div className="relative flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.href)}
              className="text-navy-1200 hover:text-brand-purple transition-colors text-2xl font-heading font-bold uppercase tracking-widest"
            >
              {link.label}
            </button>
          ))}

          <Button
            className="mt-4 bg-brand-purple hover:bg-brand-deep text-white font-bold px-12 py-6 rounded-full text-lg shadow-xl"
          >
            Join Now
          </Button>
        </div>
      </div>
    </>
  );
}
