# 📖 ПОЛНАЯ ИНСТРУКЦИЯ ПО РЕДАКТИРОВАНИЮ САЙТА

## 🚀 Быстрый старт

### 1. Установка программ

1. **VSCode** — скачай с https://code.visualstudio.com/
2. **Node.js** — скачай LTS версию с https://nodejs.org/

### 2. Открытие проекта

```bash
# 1. Распакуй архив с проектом
# 2. Открой VSCode
# 3. File → Open Folder → выбери папку с проектом
# 4. Открой терминал: Terminal → New Terminal (или Ctrl+`)
```

### 3. Установка и запуск

```bash
# Установка зависимостей (один раз)
npm install

# Запуск локального сервера
npm run dev

# Сайт откроется по адресу: http://localhost:5173
```

### 4. Сборка для публикации

```bash
npm run build
# Готовые файлы будут в папке dist/
```

---

## 🖼️ КАК ДОБАВИТЬ СВОИ ФОТО

### Шаг 1: Подготовка фото

**Требования:**
- Формат: `.jpg`, `.jpeg`, `.png` или `.webp`
- Размер: **800×600 пикселей** (или 1200×900)
- Вес файла: **не более 500 КБ**
- Имена файлов: только **латинские буквы**, **без пробелов** (используй `_` или `-`)

**Примеры правильных названий:**
```
✅ robot-v2-main.jpg
✅ ev-photo-1.png
✅ tpp-model.webp
❌ мое фото.jpg
❌ photo 1.jpg
❌ IMG_2024.JPG
```

### Шаг 2: Оптимизация фото

Перед добавлением сожми фото:
1. Зайди на https://tinypng.com/
2. Перетащи фото на сайт
3. Скачай сжатую версию

### Шаг 3: Куда класть фото

```
public/
  images/
    projects/
      robot-v2-1.jpg      ← Фото робота v2 (главное)
      robot-v2-2.jpg      ← Фото робота v2 (дополнительное)
      robot-v2-3.jpg      ← Фото робота v2 (дополнительное)
      robot-v1-1.jpg
            ← Фото робота v1
      ev-1.jpg            ← Фото электротранспорта
      tpp-1.jpg           ← Фото ТЭЦ
      ai-1.jpg            ← Фото для нейросети
      solar-1.jpg         ← Фото для солнечной энергетики
```

### Шаг 4: Привязка фото к проекту

Открой файл `src/sections/Projects.tsx` и найди свой проект:

```tsx
{
  id: 1,
  title: 'НАСТОЛЬНЫЙ РОБОТ V2',
  // ... другие поля ...
  images: [
    '/images/projects/robot-v2-1.jpg',  // ← Главное фото
    '/images/projects/robot-v2-2.jpg',  // ← Дополнительное
    '/images/projects/robot-v2-3.jpg',  // ← Дополнительное
  ],
  // ...
}
```

**Важно:** Путь должен начинаться с `/images/projects/` и совпадать с именем файла!

---

## ✏️ КАК ИЗМЕНИТЬ ТЕКСТ

### 1. Изменить описание проекта

Файл: `src/sections/Projects.tsx`

```tsx
{
  id: 1,
  title: 'НАЗВАНИЕ ПРОЕКТА',
  description: 'Краткое описание для карточки (2-3 строки)',
  fullDescription: `Здесь можно написать ОЧЕНЬ ПОДРОБНОЕ описание.
  
Можно использовать несколько абзацев:
• Пункт 1
• Пункт 2
• Пункт 3

И даже переносы строк!`,
  // ...
}
```

### 2. Добавить новый проект

Скопируй существующий проект и измени:

```tsx
{
  id: 7,  // ← Увеличь номер на 1
  title: 'НОВЫЙ ПРОЕКТ',
  category: 'КАТЕГОРИЯ',  // Должна быть в categoryColors!
  description: 'Краткое описание',
  fullDescription: 'Подробное описание...',
  images: [
    '/images/projects/novy-proekt-1.jpg',
  ],
  tags: ['Тег1', 'Тег2', 'Тег3'],
  links: {
    github: 'https://github.com/Robitar13/repo',
    video: 'https://youtube.com/...',      // опционально
    presentation: 'https://...',            // опционально
    article: 'https://elibrary.ru/...',     // опционально
  },
  features: [
    'Особенность 1',
    'Особенность 2',
    'Особенность 3',
  ],
  emoji: '🚀',  // Иконка проекта
}
```

### 3. Добавить версию проекта (v1, v2)

```tsx
{
  id: 8,
  title: 'ПРОЕКТ V2',
  // ...
  version: {
    id: 'v2',
    name: 'Версия 2.0',
    description: 'Улучшенная версия'
  },
  relatedProjectId: 9,  // ← ID первой версии
}
```

А для первой версии:
```tsx
{
  id: 9,
  title: 'ПРОЕКТ V1',
  // ...
  version: {
    id: 'v1',
    name: 'Версия 1.0',
    description: 'Первоначальная версия'
  },
  relatedProjectId: 8,  // ← ID второй версии
}
```

---

## 👤 КАК ИЗМЕНИТЬ ИНФОРМАЦИЮ "ОБО МНЕ"

Файл: `src/sections/About.tsx`

### Изменить достижения:

```tsx
const achievements = [
  {
    icon: Medal,  // Иконка из lucide-react
    title: 'НАЗВАНИЕ БЛОКА',
    items: [
      'Достижение 1',
      'Достижение 2',
      'Достижение 3',
    ],
    color: '#3B82F6'  // Цвет иконки
  },
  // ...
];
```

### Доступные иконки:
- `Award` — награда
- `BookOpen` — книга/обучение
- `Cpu` — процессор/техника
- `Zap` — молния/энергия
- `FileText` — документ
- `GraduationCap` — образование
- `Medal` — медаль
- `Lightbulb` — лампочка/идеи
- `Star` — звезда
- `Trophy` — кубок

Полный список: https://lucide.dev/icons/

---

## 🎨 КАК ИЗМЕНИТЬ ЦВЕТА

Файл: `src/index.css`

```css
:root {
  --primary-blue: #3B82F6;     ← Основной синий
  --primary-pink: #EC4899;     ← Основной розовый
  --purple-pink: #A855F7;      ← Фиолетовый
  --cyan-blue: #06B6D4;        ← Циановый
}
```

**Где брать цвета:** https://tailwindcss.com/docs/customizing-colors

---

## 📧 КАК ИСПРАВИТЬ КОНТАКТЫ

Файл: `src/sections/Contact.tsx`

```tsx
const contactLinks = [
  { 
    icon: Send, 
    label: 'Telegram', 
    value: '@ТВОЙ_НИК',
    link: 'https://t.me/ТВОЙ_НИК',
    color: '#3B82F6',
    copyable: false
  },
  { 
    icon: Github, 
    label: 'GitHub', 
    value: 'ТВОЙ_NICK',
    link: 'https://github.com/ТВОЙ_NICK',
    color: '#EC4899',
    copyable: false
  },
  { 
    icon: Mail, 
    label: 'Email', 
    value: 'твоя@почта.ru',
    link: '#',  // ← Не работает mailto, просто копируем
    color: '#A855F7',
    copyable: true  // ← Можно скопировать
  },
];
```

---

## 🌐 КАК ОПУБЛИКОВАТЬ САЙТ

### Вариант 1: GitHub Pages (бесплатно)

1. Создай аккаунт на https://github.com
2. Создай репозиторий с именем `ТВОЙ_НИК.github.io`
3. В терминале:

```bash
cd dist
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/ТВОЙ_НИК/ТВОЙ_НИК.github.io.git
git push -u origin main
```

4. Сайт будет доступен: `https://ТВОЙ_НИК.github.io`

### Вариант 2: Netlify Drop (проще)

1. Собери проект: `npm run build`
2. Зайди на https://app.netlify.com/drop
3. Перетащи папку `dist/` в браузер
4. Готово!

---

## ❓ РЕШЕНИЕ ПРОБЛЕМ

### Ошибка "Cannot find module"
```bash
npm install
```

### Ошибка сборки
```bash
rm -rf node_modules dist
npm install
npm run build
```

### Фото не отображаются
1. Проверь путь (должен начинаться с `/`)
2. Проверь формат файла
3. Убедись что файл в папке `public/images/projects/`
4. Перезапусти сервер: `Ctrl+C`, затем `npm run dev`

### Изменения не видны
1. Перезапусти сервер: `Ctrl+C`, затем `npm run dev`
2. Проверь консоль браузера (F12 → Console)
3. Проверь синтаксис (скобки, запятые)

---

## 📁 СТРУКТУРА ПРОЕКТА

```
my-app/
├── public/
│   └── images/
│       └── projects/       ← СЮДА КЛАСТЬ ФОТО
├── src/
│   ├── sections/
│   │   ├── Hero.tsx        ← Главная секция
│   │   ├── About.tsx       ← Обо мне (достижения)
│   │   ├── Projects.tsx    ← Проекты ← ЧАСТО МЕНЯТЬ
│   │   ├── Contact.tsx     ← Контакты
│   │   ├── Navigation.tsx  ← Меню
│   │   └── Footer.tsx      ← Подвал
│   ├── components/
│   │   └── three/
│   │       └── ParticleBackground.tsx  ← 3D фон
│   ├── App.tsx
│   └── index.css           ← Цвета и стили
├── package.json
└── INSTRUCTION.md          ← Эта инструкция
```

---

## 💡 СОВЕТЫ

1. **Всегда делай backup** перед большими изменениями
2. **Проверяй на телефоне** — открой сайт на мобильном
3. **Используй DevTools** — F12 в браузере для отладки
4. **Сохраняй часто** — VSCode автосохранение: `Ctrl+Shift+P` → "Auto Save"
5. **Тестируй после каждого изменения**

---

## 🔗 ПОЛЕЗНЫЕ ССЫЛКИ

- **Иконки**: https://lucide.dev/icons/
- **Цвета**: https://tailwindcss.com/docs/customizing-colors
- **Сжатие фото**: https://tinypng.com/
- **React**: https://react.dev/
- **Tailwind**: https://tailwindcss.com/

---

**Удачи! 🚀 Если что-то не работает — перечитай инструкцию ещё раз 😊**
