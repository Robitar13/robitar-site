import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'ГЛАВНАЯ', href: '#hero' },
  { label: 'ОБО МНЕ', href: '#about' },
  { label: 'ПРОЕКТЫ', href: '#projects' },
  { label: 'КОНТАКТЫ', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);

      // Detect active section
      const sections = ['hero', 'about', 'projects', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Main Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-[#0a0a1a]/90 backdrop-blur-lg border-b border-[#3B82F6]/20' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a 
              href="#hero"
              onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }}
              className="text-xl font-bold"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              <span className="text-[#3B82F6]">ROB</span>
              <span className="text-[#EC4899]">ITAR</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                  className={`nav-link relative px-4 py-2 text-[10px] transition-colors ${
                    activeSection === link.href.slice(1) 
                      ? 'text-[#3B82F6]' 
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.label}
                  {activeSection === link.href.slice(1) && (
                    <span 
                      className="absolute bottom-0 left-4 right-4 h-0.5"
                      style={{ background: 'linear-gradient(90deg, #3B82F6, #EC4899)' }}
                    />
                  )}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center"
            >
              {isMobileMenuOpen ? (
                <X className="text-[#EC4899]" size={24} />
              ) : (
                <Menu className="text-white" size={24} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 bg-[#0a0a1a]/98 backdrop-blur-xl transition-all duration-500 md:hidden ${
          isMobileMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
              className="text-2xl font-bold text-white hover:text-[#3B82F6] transition-colors"
              style={{ 
                fontFamily: "'Press Start 2P', monospace",
                animationDelay: `${index * 0.1}s`
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Side Navigation Dots (Desktop) */}
      <div className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col gap-4">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
              activeSection === link.href.slice(1)
                ? 'border-[#3B82F6] bg-[#EC4899] scale-125'
                : 'border-white/30 hover:border-[#3B82F6]/60'
            }`}
            title={link.label}
          />
        ))}
      </div>
    </>
  );
}
