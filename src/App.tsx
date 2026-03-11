import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { FinancialGraphBackground } from './components/FinancialGraphBackground';
import { ThreeDCoinsBackground } from './components/ThreeDCoinsBackground';
import { HeroSection } from './sections/HeroSection';
import { CoinStatementSection } from './sections/CoinStatementSection';
import { EcosystemSection } from './sections/EcosystemSection';
import { TokenSection } from './sections/TokenSection';
import { RoadmapSection } from './sections/RoadmapSection';
import { CommunitySection } from './sections/CommunitySection';
import { PurchaseSystemSection } from './sections/PurchaseSystemSection';
import { FinalCTASection } from './sections/FinalCTASection';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Wait for all ScrollTriggers to be created
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);

      if (!maxScroll || pinned.length === 0) return;

      // Build ranges and snap targets from pinned sections
      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Global snap configuration
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (allow small buffer)
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );

            if (!inPinned) return value; // Flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );

            return target;
          },
          duration: { min: 0.25, max: 0.6 },
          delay: 0,
          ease: 'power3.out',
        }

      });
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="relative bg-white min-h-screen">
      {/* Global Background Layer */}
      <FinancialGraphBackground />
      <ThreeDCoinsBackground />

      <Navigation />

      {/* Content Layer - Elevated to show background underneath */}
      <main className="relative z-10">
        <HeroSection />
        <CoinStatementSection />
        <EcosystemSection />
        <TokenSection />
        <RoadmapSection />
        <PurchaseSystemSection />
        <CommunitySection />
        <FinalCTASection />
      </main>

      <Footer />
    </div>
  );
}

export default App;
