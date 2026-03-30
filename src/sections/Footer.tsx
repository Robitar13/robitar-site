import { Send, Mail, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const copyEmail = () => {
    navigator.clipboard.writeText('ratibor.rob@yandex.ru');
    alert('Email скопирован в буфер обмена!');
  };

  return (
    <footer className="relative py-12 border-t border-[#3B82F6]/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div 
            className="text-lg"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            <span className="text-[#3B82F6]">ROB</span>
            <span className="text-[#EC4899]">ITAR</span>
          </div>

          <nav className="flex flex-wrap justify-center gap-6">
            <a href="#hero" className="text-sm text-white/60 hover:text-[#3B82F6] transition-colors">
              Главная
            </a>
            <a href="#about" className="text-sm text-white/60 hover:text-[#EC4899] transition-colors">
              Обо мне
            </a>
            <a href="#projects" className="text-sm text-white/60 hover:text-[#A855F7] transition-colors">
              Проекты
            </a>
            <a href="#contact" className="text-sm text-white/60 hover:text-[#06B6D4] transition-colors">
              Контакты
            </a>
          </nav>

          <div className="flex gap-4">
            <a 
              href="https://t.me/Robitar13"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-[#3B82F6]/30 flex items-center justify-center hover:border-[#3B82F6] hover:text-[#3B82F6] transition-all hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]"
            >
              <Send size={18} />
            </a>
            <button 
              onClick={copyEmail}
              className="w-10 h-10 rounded-full border border-[#A855F7]/30 flex items-center justify-center hover:border-[#A855F7] hover:text-[#A855F7] transition-all hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]"
            >
              <Mail size={18} />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-white/40 text-sm flex items-center justify-center gap-2 flex-wrap">
            <span>© {currentYear} Robitar. Made with</span>
            <Heart size={14} className="text-[#EC4899] fill-[#EC4899]" />
            <span>and</span>
            <span className="text-[#3B82F6]">⚡</span>
            <span>by Ratibor</span>
          </p>
          <p className="text-white/30 text-xs mt-2">
            Built with React + Three.js + Tailwind CSS
          </p>
        </div>
      </div>

      <div 
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #3B82F6, #EC4899, transparent)' }}
      />
    </footer>
  );
}