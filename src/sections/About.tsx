import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Cpu, FileText, GraduationCap, Medal, Lightbulb } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  {
    icon: GraduationCap,
    title: 'ОБРАЗОВАНИЕ',
    items: [
      'Ученик 10 класса',
      'Профильный IT-класс',
      'Политехнический класс ГУАП (2 года)',
      'Политехнический класс СПбПУ (2 года)',
      'Аттестат с отличием за 9 класс'
    ],
    color: '#3B82F6'
  },
  {
    icon: Medal,
    title: 'ОЛИМПИАДЫ И КОНКУРСЫ',
    items: [
      'Призёр олимпиады по физике ГУАП (2024)',
      'Победитель «Энергия успеха — Завалишинские чтения» (2024)',
      'Призёр «Энергия успеха — Завалишинские чтения» (2025)',
      'Участник олимпиад регионального уровня'
    ],
    color: '#EC4899'
  },
  {
    icon: FileText,
    title: 'ПУБЛИКАЦИИ (РИНЦ)',
    items: [
      '«Будущее солнечной энергетики» (2024)',
      '«Искусственная нейросеть для распознавания объектов»'
    ],
    color: '#A855F7'
  },
  {
    icon: Cpu,
    title: 'ТЕХНИЧЕСКИЕ НАВЫКИ',
    items: [
      '3D-моделирование: Fusion 360, SolidWorks, КОМПАС-3D',
      '3D-печать на собственном FDM-принтере',
      'Программирование: Python, C++, C# (Unity)',
      'Электротехника и схемотехника'
    ],
    color: '#06B6D4'
  },
  {
    icon: BookOpen,
    title: 'КУРСЫ И ОБУЧЕНИЕ',
    items: [
      'Яндекс.Лицей — Python',
      'Яндекс.Лицей — Unity C#',
      'Политехнический университет — инженерия'
    ],
    color: '#10B981'
  },
  {
    icon: Lightbulb,
    title: 'ДРУГИЕ ДОСТИЖЕНИЯ',
    items: [
      'Участник выставки-форума «Россия» на ВДНХ',
      'Лектор по истории ВОВ для младших школьников',
      'Углублённое изучение физики, математики, информатики'
    ],
    color: '#F59E0B'
  }
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [avatarLoaded, setAvatarLoaded] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-title',
        { x: -100, opacity: 0 },
        {
          x: 0,
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

      const cards = cardsRef.current?.querySelectorAll('.achievement-card');
      if (cards) {
        gsap.fromTo(cards,
          { y: 60, opacity: 0, rotateY: -15 },
          {
            y: 0,
            opacity: 1,
            rotateY: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      gsap.fromTo('.profile-card',
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about"
      className="relative py-24 sm:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <h2 className="about-title section-title mb-16 text-center">
          <span className="text-[#3B82F6]">&lt;</span>
          ОБО МНЕ
          <span className="text-[#EC4899]">/&gt;</span>
        </h2>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="profile-card lg:col-span-1">
            <div className="glass-card p-6 h-full relative overflow-hidden group">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div 
                  className="absolute inset-0 rounded-full animate-pulse"
                  style={{ background: 'linear-gradient(135deg, #3B82F6, #EC4899)' }}
                />
                <div className="absolute inset-1 rounded-full bg-[#0a0a1a] flex items-center justify-center overflow-hidden">
                  {/* ✅ ПРАВИЛЬНЫЙ ПУТЬ */}
                  <img
                    src="/images/avatar.jpg"
                    alt="Ратибор"
                    className="w-full h-full object-cover"
                    onLoad={() => setAvatarLoaded(true)}
                    onError={() => setAvatarLoaded(false)}
                    style={{ display: avatarLoaded ? 'block' : 'none' }}
                  />
                  {!avatarLoaded && (
                    <div className="text-5xl">
                      👨‍💻
                    </div>
                  )}
                </div>
              </div>

              <h3 
                className="text-xl text-center text-white mb-2"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                РАТИБОР
              </h3>
              <p className="text-center text-white/50 text-sm mb-2">
                @Robitar13
              </p>
              <p className="text-center text-white/40 text-xs mb-6">
                10 класс
              </p>

              <div className="space-y-4 text-white/70 text-sm">
                <p>
                  Инженер-конструктор с раннего возраста. Создаю реальные проекты 
                  — от электротранспорта до нейросетей.
                </p>
                <p>
                  Моя цель — не просто изучать технологии, а создавать их. 
                  Вижу себя в сфере энергетики и робототехники.
                </p>
                <p>
                  Постоянно учусь: политехнические классы, Яндекс.Лицей, 
                  научные исследования и публикации.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: '#3B82F6' }}>6+</div>
                  <div className="text-xs text-white/50">Проектов</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: '#EC4899' }}>2</div>
                  <div className="text-xs text-white/50">Статьи РИНЦ</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: '#A855F7' }}>∞</div>
                  <div className="text-xs text-white/50">Идей</div>
                </div>
              </div>
            </div>
          </div>

          <div ref={cardsRef} className="lg:col-span-2">
            <div className="grid sm:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className="achievement-card glass-card p-5 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
                  style={{ borderColor: `${achievement.color}30` }}
                >
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ 
                      background: `radial-gradient(circle at 50% 50%, ${achievement.color}10, transparent 70%)`
                    }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ 
                          background: `${achievement.color}20`,
                          border: `1px solid ${achievement.color}40`
                        }}
                      >
                        <achievement.icon size={20} style={{ color: achievement.color }} />
                      </div>
                      <h4 
                        className="text-xs font-bold"
                        style={{ 
                          color: achievement.color,
                          fontFamily: "'Press Start 2P', monospace"
                        }}
                      >
                        {achievement.title}
                      </h4>
                    </div>

                    <div className="space-y-2">
                      {achievement.items.map((item, i) => (
                        <div 
                          key={i}
                          className="flex items-start gap-2 text-white/70 text-sm"
                        >
                          <span 
                            className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                            style={{ background: achievement.color }}
                          />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div 
                    className="absolute bottom-0 right-0 w-8 h-8"
                    style={{ 
                      background: `linear-gradient(135deg, transparent 50%, ${achievement.color}30 50%)`
                    }}
                  />
                </div>
              ))}
            </div>

            <div 
              className="mt-6 glass-card p-6 relative"
              style={{ borderColor: 'rgba(59, 130, 246, 0.2)' }}
            >
              <div className="text-4xl opacity-30 absolute top-2 left-4" style={{ color: '#3B82F6' }}>"</div>
              <p className="text-white/70 text-center italic relative z-10 pl-8 pr-8">
                Моя цель — не просто изучать технологии, а создавать их.
              </p>
              <div className="text-4xl opacity-30 absolute bottom-2 right-4" style={{ color: '#EC4899' }}>"</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}