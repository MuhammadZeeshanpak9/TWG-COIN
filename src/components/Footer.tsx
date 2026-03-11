import { Twitter, MessageCircle, Github, Send } from 'lucide-react';

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: MessageCircle, href: '#', label: 'Discord' },
  { icon: Send, href: '#', label: 'Telegram' },
  { icon: Github, href: '#', label: 'GitHub' },
];

const footerLinks = [
  { label: 'Ecosystem', href: '#ecosystem' },
  { label: 'Token', href: '#token' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'Community', href: '#community' },
];

export function Footer() {
  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative w-full py-20 bg-slate-50 border-t border-slate-200 z-30">
      <div className="container px-6 lg:px-16 mx-auto">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-16">
          
          {/* Left: Branding */}
          <div className="space-y-6 max-w-sm">
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-12 h-12 relative">
                <img
                  src="/coin-platinum.png"
                  alt="WGC Logo"
                  className="w-full h-full object-contain drop-shadow-lg"
                />
              </div>
              <span className="font-heading font-bold text-navy-1200 text-lg tracking-wider uppercase">
                THE WORLD&apos;S <br /> GREATEST COIN
              </span>
            </a>
            <p className="text-slate-500 leading-relaxed">
              Redefining the digital economy with AI-driven utility and 
              community-centric growth. The future starts now.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brand-purple hover:border-brand-purple transition-all shadow-sm"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Right: Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 lg:gap-24">
            <div className="space-y-6">
              <h4 className="font-heading font-bold text-navy-1200 uppercase tracking-widest text-sm text-brand-purple">Platform</h4>
              <nav className="flex flex-col gap-4">
                {footerLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => scrollToSection(link.href)}
                    className="text-slate-600 hover:text-brand-purple transition-colors text-left font-medium"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>
            <div className="space-y-6">
              <h4 className="font-heading font-bold text-navy-1200 uppercase tracking-widest text-sm text-brand-purple">Legal</h4>
              <nav className="flex flex-col gap-4">
                <a href="#" className="text-slate-600 hover:text-brand-purple transition-colors font-medium">Privacy Policy</a>
                <a href="#" className="text-slate-600 hover:text-brand-purple transition-colors font-medium">Terms of Use</a>
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-10 border-t border-slate-200 flex flex-col lg:flex-row items-center justify-between gap-6">
          <p className="text-slate-400 text-sm">
            © 2024 THE WORLD&apos;S GREATEST COIN. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-sm font-medium uppercase tracking-widest">Powered by</span>
            <span className="text-brand-purple font-bold tracking-tighter text-lg">ELEV8 INCORPORATION</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
