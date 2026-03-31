import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ChevronDown, Send, Mail } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVk } from '@fortawesome/free-brands-svg-icons';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleChars = titleRef.current?.querySelectorAll('.char');
      if (titleChars) {
        gsap.fromTo(titleChars,
          { y: 100, opacity: 0, skewY: 20 },
          { 
            y: 0, 
            opacity: 1, 
            skewY: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: 'power4.out',
            delay: 0.5
          }
        );
      }

      gsap.fromTo(subtitleRef.current,
        { width: 0, opacity: 1 },
        { 
          width: '100%', 
          duration: 1.5,
          ease: 'steps(30)',
          delay: 1.2
        }
      );

      gsap.fromTo(descRef.current,
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          ease: 'power2.out',
          delay: 1.5
        }
      );

      const ctaButtons = ctaRef.current?.querySelectorAll('button, a');
      if (ctaButtons) {
        gsap.fromTo(ctaButtons,
          { scale: 0, opacity: 0 },
          { 
            scale: 1, 
            opacity: 1, 
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            delay: 1.8
          }
        );
      }

      gsap.fromTo('.main-project-card',
        { x: 100, opacity: 0, rotateY: -30 },
        { 
          x: 0, 
          opacity: 1, 
          rotateY: 0,
          duration: 1,
          ease: 'power3.out',
          delay: 2
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const titleText = 'ROBITAR';

  return (
    <section 
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 
              ref={titleRef}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 glitch-text"
              data-text="ROBITAR"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              {titleText.split('').map((char, i) => (
                <span 
                  key={i} 
                  className="char inline-block"
                  style={{ 
                    background: i < 3 
                      ? 'linear-gradient(135deg, #3B82F6, #60A5FA)' 
                      : 'linear-gradient(135deg, #EC4899, #F472B6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: i < 3 
                      ? '0 0 30px rgba(59, 130, 246, 0.5)' 
                      : '0 0 30px rgba(236, 72, 153, 0.5)'
                  }}
                >
                  {char}
                </span>
              ))}
            </h1>

            <div className="overflow-hidden mb-6">
              <p 
                ref={subtitleRef}
                className="text-lg sm:text-xl md:text-2xl whitespace-nowrap overflow-hidden border-r-2 border-[#3B82F6] inline-block"
                style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 'clamp(10px, 2vw, 14px)', color: 'rgba(255,255,255,0.8)' }}
              >
                Разработчик, инженер и программист
              </p>
            </div>

            <p 
              ref={descRef}
              className="text-base sm:text-lg text-white/60 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Создаю инновационные проекты на стыке программирования, 
              3D-моделирования и робототехники. От настольных роботов 
              до исследований нейросетей — каждый проект это шаг в будущее.
            </p>

            <div ref={ctaRef} className="flex flex-wrap gap-4 justify-center lg:justify-start mb-12">
              <button 
                onClick={scrollToProjects}
                className="cyber-button flex items-center gap-2"
              >
                <span>МОИ ПРОЕКТЫ</span>
                <ChevronDown size={16} />
              </button>
              
              <a 
                href="https://vk.com/id756067906"
                target="_blank"
                rel="noopener noreferrer"
                className="cyber-button flex items-center gap-2 !border-[#0077FF] !text-[#0077FF] hover:!bg-[#0077FF] hover:!text-white"
              >
                <FontAwesomeIcon icon={faVk} size="lg" style={{ color: '#0077FF' }} />
                <span>VKONTAKTE</span>
              </a>
            </div>

            <div className="flex gap-4 justify-center lg:justify-start">
              <a 
                href="https://t.me/Robitar13"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#3B82F6]/50 flex items-center justify-center hover:border-[#3B82F6] hover:text-[#3B82F6] transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
              >
                <Send size={18} />
              </a>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText('ratibor.rob@yandex.ru');
                  alert('Email скопирован в буфер обмена!');
                }}
                className="w-10 h-10 rounded-full border border-[#EC4899]/50 flex items-center justify-center hover:border-[#EC4899] hover:text-[#EC4899] transition-all hover:shadow-[0_0_20px_rgba(236,72,153,0.5)]"
              >
                <Mail size={18} />
              </button>
            </div>
          </div>

          <div className="main-project-card perspective-1000">
            <div 
              className="glass-card p-6 relative overflow-hidden group"
              style={{ 
                transformStyle: 'preserve-3d',
                boxShadow: '0 0 40px rgba(59, 130, 246, 0.2)'
              }}
            >
              <div className="absolute top-4 right-4 z-10">
                <span 
                  className="px-3 py-1 text-xs font-bold rounded"
                  style={{ 
                    background: 'linear-gradient(135deg, #3B82F6, #EC4899)',
                    color: '#fff',
                    fontFamily: "'Press Start 2P', monospace"
                  }}
                >
                  ГЛАВНЫЙ ПРОЕКТ
                </span>
              </div>

              <div className="relative h-64 sm:h-80 mb-6 overflow-hidden rounded-lg">
                {/* ✅ ИСПРАВЛЕНО */}
                <img
                  src="images/hero-robot.jpg"
                  alt="Настольный робот"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#3B82F6]/10 to-transparent h-4 animate-scan" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="category-badge category-robot">
                    РОБОТОТЕХНИКА
                  </span>
                </div>

{/* ацу */}
                <h3 
                  className="text-2xl sm:text-3xl font-bold text-white"
                  style={{ fontFamily: "'Press Start 2P', monospace" }}
                >
                  НАСТОЛЬНЫЙ РОБОТ
                </h3>

                <p className="text-white/60 text-sm leading-relaxed">
                  Интерактивный робот с OLED-дисплеем, акселерометром MPU6050 
                  и игрой Space Dodger. Показывает эмоции, прогноз погоды 
                  и работает как часы. Полностью разработан в KOMPAS-3D 
                  и напечатан на 3D-принтере.
                </p>

                <div className="flex flex-wrap gap-2">
                  {['Arduino', '3D Печать', 'OLED', 'MPU6050', 'Игры'].map((tag, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 text-xs rounded-full text-white/70"
                      style={{ 
                        background: i % 2 === 0 
                          ? 'rgba(59, 130, 246, 0.2)' 
                          : 'rgba(236, 72, 153, 0.2)',
                        border: i % 2 === 0 
                          ? '1px solid rgba(59, 130, 246, 0.3)' 
                          : '1px solid rgba(236, 72, 153, 0.3)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button 
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full py-3 mt-4 rounded-lg font-bold transition-all duration-300 text-sm"
                  style={{ 
                    fontFamily: "'Press Start 2P', monospace",
                    background: 'linear-gradient(135deg, #3B82F6, #EC4899)',
                    color: '#fff'
                  }}
                >
                  ПОДРОБНЕЕ →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-[#3B82F6]" size={32} />
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(400%); }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
}