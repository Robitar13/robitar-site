import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ChevronLeft, ChevronRight, ExternalLink, Layers, Video } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVk } from '@fortawesome/free-brands-svg-icons';

gsap.registerPlugin(ScrollTrigger);

interface ProjectVersion {
  id: string;
  name: string;
  description: string;
}

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  images: string[];
  tags: string[];
  links: {
    vk?: string;
    video?: string;
    presentation?: string;
    article?: string;
  };
  features: string[];
  emoji: string;
  version?: ProjectVersion;
  relatedProjectId?: number;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'НАСТОЛЬНЫЙ РОБОТ V2',
    category: 'РОБОТОТЕХНИКА',
    description: 'Улучшенная версия интерактивного робота с расширенным функционалом',
    fullDescription: `Вторая версия настольного робота с улучшенным дизайном и расширенным функционалом. 

Основные улучшения по сравнению с первой версией:
• Улучшенная эргономика корпуса
• Дополнительные анимации и эмоции
• Светодиодная RGB лента
• Расширенные игровые возможности

Робот разработан от 3D-моделирования в KOMPAS-3D до программирования микроконтроллера. Корпус напечатан на 3D-принтере. OLED-дисплей отображает анимированные эмоции, погоду и время. Светодиодная RGB лента помогает выражать эмоции и показывает статус заказов на OZON и Wildberries. `,
    // ✅ ИСПРАВЛЕНО
    images: [
      '../images/projects/robot-v2-1.jpg',
      '../images/projects/robot-v2-2.jpg',
    ],
    tags: ['Arduino', 'Super Mini', 'MPU6050', 'OLED 0.96"', '3D Печать', 'KOMPAS-3D', 'C++'],
    links: {
      vk: 'https://vk.com/id756067906',
      video: 'https://disk.yandex.ru/d/D49xchVsZe-3aA',
    },
    features: [
      'OLED-дисплей 0.96" с анимациями',
      'Акселерометр MPU6050',
      'Игра Space Dodger',
      'Прогноз погоды через API',
      'Цифровые часы',
      '8+ анимированных эмоций',
      'Модуль зарядки Li-Po аккумулятора'
    ],
    emoji: '🤖',
    version: {
      id: 'v2',
      name: 'Версия 2.0',
      description: 'Улучшенная версия'
    },
    relatedProjectId: 2
  },
  {
    id: 2,
    title: 'НАСТОЛЬНЫЙ РОБОТ V1',
    category: 'РОБОТОТЕХНИКА',
    description: 'Первая версия интерактивного робота с OLED-дисплеем',
    fullDescription: `Первая версия настольного робота — проект, с которого всё началось. 

Этот прототип стал основой для понимания принципов работы с микроконтроллерами, сенсорами и 3D-печатью. Робот умеет отображать эмоции, показывать время и погоду, а также запускать простую игру.

В процессе создания приобрёл навыки:
• Проектирования в KOMPAS-3D
• 3D-печати на FDM-принтере
• Пайки электронных компонентов
• Программирования Arduino`,
    // ✅ ИСПРАВЛЕНО
    images: [
      '../images/projects/robot-v1-1.jpg',
      '../images/projects/robot-v1-2.jpg',
    ],
    tags: ['Arduino', 'OLED', '3D Печать', 'KOMPAS-3D'],
    links: {
      vk: 'https://vk.com/id756067906',
    },
    features: [
      'Базовые анимации на OLED',
      'Отображение времени',
      'Простая игра',
      '3D-корпус'
    ],
    emoji: '🤖',
    version: {
      id: 'v1',
      name: 'Версия 1.0',
      description: 'Первоначальная версия'
    },
    relatedProjectId: 1
  },
  {
    id: 3,
    title: 'ЭЛЕКТРОТРАНСПОРТ',
    category: 'ЭЛЕКТРОТЕХНИКА',
    description: 'Самодельный электросамокат/электровелосипед с аккумулятором от Nissan Leaf',
    fullDescription: `Самостоятельно спроектированный и собранный электротранспорт — один из самых масштабных проектов.

Что было сделано:
• Спроектирована электрическая схема с нуля
• Подобраны компоненты: мотор, контроллер, BMS
• Адаптирована и интегрирована аккумуляторная батарея от автомобиля Nissan Leaf
• Настроена система управления энергопотреблением
• Проведены испытания и доработки

Этот проект потребовал глубокого погружения в:
• Основы электротехники и схемотехники
• Механику и прочностные расчёты
• Управление энергопотреблением
• Безопасность высоковольтных систем`,
    // ✅ ИСПРАВЛЕНО
    images: [
      '../images/projects/ev-1.jpg',
    ],
    tags: ['Электротехника', 'BMS', 'Li-Ion', 'BLDC', 'Силовая электроника'],
    links: {
      video: 'https://disk.yandex.ru/d/D49xchVsZe-3aA',
    },
    features: [
      'Аккумулятор от Nissan Leaf',
      'Собственная электрическая схема',
      'Система управления питанием',
      'Безопасная интеграция BMS',
      'Регулируемая скорость',
      'Световая индикация'
    ],
    emoji: '⚡'
  },
  {
    id: 4,
    title: 'МАКЕТ КАЛИНИНГРАДСКОЙ ТЭЦ',
    category: '3D МОДЕЛИРОВАНИЕ',
    description: 'Детальный 3D-макет теплоэлектростанции в SolidWorks',
    fullDescription: `Проект по созданию детального виртуального и физического макета Калининградской ТЭЦ для Политехнического университета.

В рамках проекта:
• Создана полная 3D-модель ТЭЦ в SolidWorks
• Смоделированы все ключевые компоненты: турбины, котлы, генераторы, трубопроводы
• Проведены расчёты тепловых потоков
• Напечатаны на 3D-принтере отдельные элементы для физического макета
• Подготовлена презентация с защитой проекта

Проект позволил изучить принципы работы тепловых и энергетических систем, а также получить опыт промышленного проектирования.`,
    // ✅ ИСПРАВЛЕНО
    images: [
      '../images/projects/tpp-1.jpg',
      '../images/projects/tpp-2.jpg',
    ],
    tags: ['SolidWorks', 'CAD', 'BIM', '3D Печать', 'Инженерия', 'Теплотехника'],
    links: {
      presentation: 'https://disk.yandex.ru/i/84J-7c6Ksx3dew',
    },
    features: [
      'Полная 3D-модель в SolidWorks',
      'Детализация всех компонентов',
      'Расчёты тепловых потоков',
      'Физический прототип',
      'Презентация проекта'
    ],
    emoji: '🏭'
  },
  {
    id: 5,
    title: 'НЕЙРОСЕТЬ ДЛЯ РАСПОЗНАВАНИЯ',
    category: 'ИСКУССТВЕННЫЙ ИНТЕЛЛЕКТ',
    description: 'Научная статья о нейросетевых архитектурах для компьютерного зрения',
    fullDescription: `Научно-исследовательская работа, опубликованная в РИНЦ.

В статье рассмотрены:
• Современные архитектуры нейронных сетей для распознавания объектов
• Сверточные нейронные сети (CNN) и их применение
• Алгоритмы YOLO, Faster R-CNN, SSD
• Процесс обучения и тестирования моделей
• Применение в реальном времени

Исследование охватывает теоретические основы и практическое применение технологий компьютерного зрения в различных отраслях: от автономного транспорта до медицинской диагностики.`,
    // ✅ ИСПРАВЛЕНО
    images: [
      '../images/projects/ai-1.jpg',
    ],
    tags: ['CNN', 'YOLO', 'Computer Vision', 'Python', 'Deep Learning', 'AI', 'РИНЦ'],
    links: {
      article: 'https://elibrary.ru',
    },
    features: [
      'Обзор CNN-архитектур',
      'Сравнение YOLO, R-CNN, SSD',
      'Анализ применения в реальном времени',
      'Публикация в РИНЦ',
      'Компьютерное зрение'
    ],
    emoji: '🧠'
  },
  {
    id: 6,
    title: 'СОЛНЕЧНАЯ ЭНЕРГЕТИКА',
    category: 'НАУЧНАЯ СТАТЬЯ',
    description: 'Исследование перспективных фотоэлектрических технологий',
    fullDescription: `Научная статья о перспективах развития солнечной энергетики, опубликованная в РИНЦ.

В работе проанализированы:
• Многослойные панели с КПД до 40%
• Перовскитовые солнечные элементы
• Фотовольтаическая краска
• Углеродные нанотрубки
• Монослои (2D-материалы)

Проведён анализ эффективности, экономической целесообразности и экологических преимуществ различных технологий. Рассмотрен мировой опыт внедрения солнечных технологий в Германии, США, Китае, Индии и других странах.`,
    // ✅ ИСПРАВЛЕНО
    images: [
      '../images/projects/solar-1.jpg',
    ],
    tags: ['Фотовольтаика', 'Перовскиты', 'ВИЭ', 'Исследование', 'РИНЦ', 'Экология'],
    links: {
      article: 'https://elibrary.ru',
    },
    features: [
      'Анализ перовскитовых ячеек',
      'Многослойные панели',
      'Мировой опыт ВИЭ',
      'Экономическая оценка',
      'Публикация в РИНЦ'
    ],
    emoji: '☀️'
  }
];

const categoryColors: Record<string, string> = {
  'РОБОТОТЕХНИКА': '#3B82F6',
  'ЭЛЕКТРОТЕХНИКА': '#06B6D4',
  '3D МОДЕЛИРОВАНИЕ': '#EC4899',
  'ИСКУССТВЕННЫЙ ИНТЕЛЛЕКТ': '#A855F7',
  'НАУЧНАЯ СТАТЬЯ': '#F59E0B'
};

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.projects-title',
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

      gsap.fromTo('.project-item',
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const openProjectModal = (project: Project) => {
    setActiveProject(project);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
      gsap.fromTo('.modal-content',
        { scale: 0.8, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.2)' }
      );
    }, 10);
  };

  const closeProjectModal = () => {
    gsap.to('.modal-content', {
      scale: 0.9,
      opacity: 0,
      y: 30,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setActiveProject(null);
        document.body.style.overflow = 'auto';
      }
    });
  };

  const nextImage = () => {
    if (activeProject) {
      setCurrentImageIndex((prev) => 
        prev === activeProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (activeProject) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? activeProject.images.length - 1 : prev - 1
      );
    }
  };

  const getRelatedProject = (id: number) => {
    return projects.find(p => p.id === id);
  };

  const handleImageLoad = (projectId: number) => {
    setLoadedImages(prev => ({ ...prev, [projectId]: true }));
  };

  const handleImageError = (projectId: number) => {
    setLoadedImages(prev => ({ ...prev, [projectId]: false }));
  };

  return (
    <section 
      ref={sectionRef}
      id="projects"
      className="relative py-24 sm:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-16 gap-4">
          <h2 className="projects-title section-title">
            <span className="text-[#3B82F6]">&lt;</span>
            ПРОЕКТЫ
            <span className="text-[#EC4899]">/&gt;</span>
          </h2>
        </div>

        <div className="projects-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="project-item project-card cursor-pointer group"
              onClick={() => openProjectModal(project)}
            >
              <div className="relative h-52 overflow-hidden">
                {project.images.length > 0 ? (
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onLoad={() => handleImageLoad(project.id)}
                    onError={() => handleImageError(project.id)}
                  />
                ) : null}
                
                {project.images.length === 0 || !loadedImages[project.id] ? (
                  <div 
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ 
                      background: `linear-gradient(135deg, ${categoryColors[project.category]}20, ${categoryColors[project.category]}05)`
                    }}
                  >
                    <div className="text-6xl opacity-60">
                      {project.emoji}
                    </div>
                  </div>
                ) : null}
                
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span 
                    className="px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2"
                    style={{ 
                      background: 'linear-gradient(135deg, #3B82F6, #EC4899)',
                      color: '#fff'
                    }}
                  >
                    <Layers size={16} />
                    ПОДРОБНЕЕ
                  </span>
                </div>

                {project.version && (
                  <div className="absolute top-3 left-3">
                    <span 
                      className="px-2 py-1 text-[9px] font-bold rounded"
                      style={{ 
                        background: project.version.id === 'v2' 
                          ? 'linear-gradient(135deg, #10B981, #06B6D4)'
                          : 'linear-gradient(135deg, #6B7280, #9CA3AF)',
                        color: '#fff',
                        fontFamily: "'Press Start 2P', monospace"
                      }}
                    >
                      {project.version.name}
                    </span>
                  </div>
                )}

                <div className="absolute top-3 right-3">
                  <span 
                    className="px-2 py-1 text-[9px] font-bold rounded"
                    style={{ 
                      background: `${categoryColors[project.category]}30`,
                      color: categoryColors[project.category],
                      fontFamily: "'Press Start 2P', monospace"
                    }}
                  >
                    {project.category}
                  </span>
                </div>

                {project.images.length > 1 && (
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2 py-1 text-[10px] bg-black/50 rounded text-white/80 flex items-center gap-1">
                      📷 {project.images.length}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-5">
                <h3 
                  className="text-sm font-bold text-white mb-2 group-hover:text-[#3B82F6] transition-colors line-clamp-1"
                  style={{ fontFamily: "'Press Start 2P', monospace" }}
                >
                  {project.title}
                </h3>
                
                <p className="text-white/60 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag, i) => (
                    <span 
                      key={i}
                      className="px-2 py-0.5 text-[10px] rounded text-white/60"
                      style={{ 
                        background: i % 2 === 0 
                          ? 'rgba(59, 130, 246, 0.15)' 
                          : 'rgba(236, 72, 153, 0.15)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-2 py-0.5 text-[10px] bg-white/10 rounded text-white/50">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a 
            href="https://disk.yandex.ru/d/D49xchVsZe-3aA"
            target="_blank"
            rel="noopener noreferrer"
            className="cyber-button inline-flex items-center gap-2 !border-[#FFCC00] !text-[#FFCC00] hover:!bg-[#FFCC00] hover:!text-black"
          >
            <ExternalLink size={18} />
            <span>ВСЕ МАТЕРИАЛЫ ТУТ</span>
          </a>
        </div>
      </div>

      {activeProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={closeProjectModal}
        >
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            style={{ pointerEvents: 'auto' }}
          />
          
          <div 
            className="modal-content relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl"
            style={{ 
              background: 'linear-gradient(135deg, rgba(10, 10, 26, 0.98), rgba(26, 26, 62, 0.98))',
              border: `2px solid ${categoryColors[activeProject.category]}40`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={closeProjectModal}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="relative h-80 sm:h-96">
              {activeProject.images.length > 0 ? (
                <img
                  src={activeProject.images[currentImageIndex]}
                  alt={`${activeProject.title} - ${currentImageIndex + 1}`}
                  className="w-full h-full object-contain"
                  onLoad={() => handleImageLoad(activeProject.id)}
                  onError={() => handleImageError(activeProject.id)}
                />
              ) : null}
              
              {(activeProject.images.length === 0 || !loadedImages[activeProject.id]) && (
                <div 
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ 
                    background: `linear-gradient(135deg, ${categoryColors[activeProject.category]}20, ${categoryColors[activeProject.category]}05)`
                  }}
                >
                  <div className="text-9xl animate-float">
                    {activeProject.emoji}
                  </div>
                </div>
              )}

              {activeProject.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors z-10"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors z-10"
                  >
                    <ChevronRight size={24} />
                  </button>
                  
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {activeProject.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentImageIndex(i)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          i === currentImageIndex 
                            ? 'bg-white w-6' 
                            : 'bg-white/40 hover:bg-white/60'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}

              <div className="absolute top-4 left-4 flex gap-2 z-10">
                <span 
                  className="px-3 py-1.5 text-xs font-bold rounded-lg"
                  style={{ 
                    background: `${categoryColors[activeProject.category]}50`,
                    color: '#fff',
                    fontFamily: "'Press Start 2P', monospace"
                  }}
                >
                  {activeProject.category}
                </span>
                {activeProject.version && (
                  <span 
                    className="px-3 py-1.5 text-xs font-bold rounded-lg"
                    style={{ 
                      background: activeProject.version.id === 'v2' 
                        ? 'linear-gradient(135deg, #10B981, #06B6D4)'
                        : 'linear-gradient(135deg, #6B7280, #9CA3AF)',
                      color: '#fff',
                      fontFamily: "'Press Start 2P', monospace"
                    }}
                  >
                    {activeProject.version.name}
                  </span>
                )}
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <h2 
                className="text-2xl sm:text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                {activeProject.title}
              </h2>

              {activeProject.relatedProjectId && (
                <div 
                  className="mb-6 p-4 rounded-xl cursor-pointer hover:scale-[1.02] transition-transform"
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(236, 72, 153, 0.15))',
                    border: '1px solid rgba(59, 130, 246, 0.3)'
                  }}
                  onClick={() => {
                    const related = getRelatedProject(activeProject.relatedProjectId!);
                    if (related) {
                      setActiveProject(related);
                      setCurrentImageIndex(0);
                    }
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Layers size={20} style={{ color: '#3B82F6' }} />
                    <div>
                      <div className="text-sm text-white/60">
                        {activeProject.version?.id === 'v2' ? '← Предыдущая версия:' : '→ Следующая версия:'}
                      </div>
                      <div className="text-white font-medium">
                        {getRelatedProject(activeProject.relatedProjectId)?.title}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mb-8">
                <h4 
                  className="text-sm font-bold mb-3"
                  style={{ 
                    fontFamily: "'Press Start 2P', monospace",
                    color: '#3B82F6'
                  }}
                >
                  О ПРОЕКТЕ:
                </h4>
                <div className="text-white/70 text-base leading-relaxed whitespace-pre-line">
                  {activeProject.fullDescription}
                </div>
              </div>

              <div className="mb-8">
                <h4 
                  className="text-sm font-bold mb-3"
                  style={{ 
                    fontFamily: "'Press Start 2P', monospace",
                    color: '#EC4899'
                  }}
                >
                  ОСОБЕННОСТИ:
                </h4>
                <div className="grid sm:grid-cols-2 gap-2">
                  {activeProject.features.map((feature, i) => (
                    <div 
                      key={i}
                      className="flex items-center gap-2 text-white/70 text-sm p-2 rounded-lg"
                      style={{ 
                        background: i % 2 === 0 
                          ? 'rgba(59, 130, 246, 0.1)' 
                          : 'rgba(236, 72, 153, 0.1)'
                      }}
                    >
                      <span 
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: i % 2 === 0 ? '#3B82F6' : '#EC4899' }}
                      />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h4 
                  className="text-sm font-bold mb-3"
                  style={{ 
                    fontFamily: "'Press Start 2P', monospace",
                    color: '#A855F7'
                  }}
                >
                  ТЕХНОЛОГИИ:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeProject.tags.map((tag, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1.5 text-sm rounded-full text-white/80 border"
                      style={{ 
                        background: i % 3 === 0 
                          ? 'rgba(59, 130, 246, 0.15)' 
                          : i % 3 === 1
                            ? 'rgba(236, 72, 153, 0.15)'
                            : 'rgba(168, 85, 247, 0.15)',
                        borderColor: i % 3 === 0 
                          ? 'rgba(59, 130, 246, 0.3)' 
                          : i % 3 === 1
                            ? 'rgba(236, 72, 153, 0.3)'
                            : 'rgba(168, 85, 247, 0.3)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {activeProject.links.vk && (
                  <a 
                    href={activeProject.links.vk}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl hover:scale-105 transition-transform"
                    style={{ 
                      background: 'rgba(0, 119, 255, 0.2)', 
                      border: '1px solid rgba(0, 119, 255, 0.4)'
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FontAwesomeIcon icon={faVk} size="lg" style={{ color: '#0077FF' }} />
                    <span>VK</span>
                  </a>
                )}
                {activeProject.links.video && (
                  <a 
                    href={activeProject.links.video}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl hover:scale-105 transition-transform"
                    style={{ 
                      background: 'rgba(236, 72, 153, 0.2)', 
                      border: '1px solid rgba(236, 72, 153, 0.4)'
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Video size={18} />
                    <span>Видео</span>
                  </a>
                )}
                {activeProject.links.presentation && (
                  <a 
                    href={activeProject.links.presentation}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl hover:scale-105 transition-transform"
                    style={{ 
                      background: 'rgba(6, 182, 212, 0.2)', 
                      border: '1px solid rgba(6, 182, 212, 0.4)'
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={18} />
                    <span>Презентация</span>
                  </a>
                )}
                {activeProject.links.article && (
                  <a 
                    href={activeProject.links.article}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl hover:scale-105 transition-transform"
                    style={{ 
                      background: 'rgba(245, 158, 11, 0.2)', 
                      border: '1px solid rgba(245, 158, 11, 0.4)'
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={18} />
                    <span>Статья (РИНЦ)</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}