import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVk } from '@fortawesome/free-brands-svg-icons';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-title',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo('.contact-card',
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText('ratibor.rob@yandex.ru');
    alert('Email скопирован в буфер обмена!');
  };

  return (
    <section 
      ref={sectionRef}
      id="contact"
      className="relative py-24 sm:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <h2 className="contact-title section-title mb-16 text-center">
          <span className="text-[#3B82F6]">&lt;</span>
          КОНТАКТЫ
          <span className="text-[#EC4899]">/&gt;</span>
        </h2>

        <div className="contact-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* VK карточка */}
          <a 
            href="https://vk.com/id756067906"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card glass-card p-6 relative overflow-hidden group hover:scale-105 transition-transform duration-300"
            style={{ borderColor: 'rgba(0, 119, 255, 0.3)' }}
          >
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ 
                background: 'radial-gradient(circle at 50% 50%, rgba(0, 119, 255, 0.15), transparent 70%)'
              }}
            />
            
            <div className="relative z-10 text-center">
              <div className="flex justify-center items-center mb-4">
                <FontAwesomeIcon icon={faVk} size="4x" style={{ color: '#0077FF' }} />
              </div>
              
              <h3 
                className="text-lg font-bold text-white mb-2"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                VKONTAKTE
              </h3>
              
              <p className="text-white/60 text-sm mb-4">
                Моя страница ВКонтакте
              </p>
              
              <span 
                className="inline-block px-4 py-2 rounded-lg text-sm font-bold"
                style={{ 
                  background: 'linear-gradient(135deg, #0077FF, #3B82F6)',
                  color: '#fff'
                }}
              >
                @robitar13
              </span>
            </div>
          </a>

          {/* Telegram карточка */}
          <a 
            href="https://t.me/Robitar13"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card glass-card p-6 relative overflow-hidden group hover:scale-105 transition-transform duration-300"
            style={{ borderColor: 'rgba(59, 130, 246, 0.3)' }}
          >
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ 
                background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15), transparent 70%)'
              }}
            />
            
            <div className="relative z-10 text-center">
              <div className="flex justify-center items-center mb-4">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ 
                    background: 'rgba(59, 130, 246, 0.2)',
                    border: '2px solid rgba(59, 130, 246, 0.4)'
                  }}
                >
                  <Send size={36} color="#3B82F6" />
                </div>
              </div>
              
              <h3 
                className="text-lg font-bold text-white mb-2"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                TELEGRAM
              </h3>
              
              <p className="text-white/60 text-sm mb-4">
                Быстрая связь в Telegram
              </p>
              
              <span 
                className="inline-block px-4 py-2 rounded-lg text-sm font-bold"
                style={{ 
                  background: 'linear-gradient(135deg, #3B82F6, #60A5FA)',
                  color: '#fff'
                }}
              >
                @Robitar13
              </span>
            </div>
          </a>

          {/* Email карточка */}
          <button 
            onClick={copyEmail}
            className="contact-card glass-card p-6 relative overflow-hidden group hover:scale-105 transition-transform duration-300 w-full"
            style={{ borderColor: 'rgba(236, 72, 153, 0.3)' }}
          >
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ 
                background: 'radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.15), transparent 70%)'
              }}
            />
            
            <div className="relative z-10 text-center">
              <div className="flex justify-center items-center mb-4">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ 
                    background: 'rgba(236, 72, 153, 0.2)',
                    border: '2px solid rgba(236, 72, 153, 0.4)'
                  }}
                >
                  <Mail size={36} color="#EC4899" />
                </div>
              </div>
              
              <h3 
                className="text-lg font-bold text-white mb-2"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                EMAIL
              </h3>
              
              <p className="text-white/60 text-sm mb-4">
                Для официальных запросов
              </p>
              
              <span 
                className="inline-block px-4 py-2 rounded-lg text-sm font-bold"
                style={{ 
                  background: 'linear-gradient(135deg, #EC4899, #F472B6)',
                  color: '#fff'
                }}
              >
                ratibor.rob@yandex.ru
              </span>
            </div>
          </button>
        </div>

        {/* Блок сотрудничества */}
        <div className="mt-16 text-center">
          <div className="glass-card p-8 max-w-2xl mx-auto relative overflow-hidden">
            <div 
              className="absolute inset-0"
              style={{ 
                background: 'linear-gradient(135deg, rgba(0, 119, 255, 0.1), rgba(59, 130, 246, 0.05))'
              }}
            />
            
            <div className="relative z-10">
              <h3 
                className="text-xl font-bold text-white mb-4"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                &lt;ДАВАЙТЕ СОТРУДНИЧАТЬ/&gt;
              </h3>
              
              <p className="text-white/70 mb-6">
                Открыт для интересных проектов и коллабораций в сфере 
                робототехники, программирования и инженерии.
              </p>
              
              <a 
                href="https://vk.com/id756067906"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105"
                style={{ 
                  background: 'linear-gradient(135deg, #0077FF, #3B82F6)',
                  color: '#fff',
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '14px',
                  boxShadow: '0 0 30px rgba(0, 119, 255, 0.4)'
                }}
              >
                <FontAwesomeIcon icon={faVk} size="2x" />
                <span>НАПИСАТЬ В VK</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}