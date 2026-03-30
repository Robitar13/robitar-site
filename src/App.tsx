import { useEffect, Suspense, lazy } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import sections
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

// Import components
const ParticleBackground = lazy(() => import('./components/three/ParticleBackground'));
const CustomCursor = lazy(() => import('./components/ui-custom/CustomCursor'));

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    // Handle resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* 3D Particle Background */}
      <Suspense fallback={
        <div className="fixed inset-0 bg-[#0a0a1a] flex items-center justify-center">
          <div 
            className="text-xl animate-pulse"
            style={{ 
              fontFamily: "'Press Start 2P', monospace",
              background: 'linear-gradient(135deg, #3B82F6, #EC4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            LOADING...
          </div>
        </div>
      }>
        <ParticleBackground />
      </Suspense>

      {/* Custom Cursor */}
      <Suspense fallback={null}>
        <CustomCursor />
      </Suspense>

      {/* Scanlines Overlay */}
      <div className="scanlines" />

      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Content Layer */}
      <div className="content-layer relative z-10">
        {/* Navigation */}
        <Navigation />

        {/* Main Content */}
        <main>
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default App;
