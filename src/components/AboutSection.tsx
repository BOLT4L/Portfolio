import { useState, useRef, useEffect, useCallback } from 'react';
import { Briefcase, Code, FolderOpen, ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';

/* ── Assets ── */
import a1 from '@/assets/a1.png';
import a2 from '@/assets/a2.png';
import m1 from '@/assets/m1.png';
import m2 from '@/assets/m2.png';
import m3 from '@/assets/m3.png';
import m4 from '@/assets/m4.png';
import q1 from '@/assets/q1.png';
import q2 from '@/assets/q2.png';
import q3 from '@/assets/q3.png';
import q4 from '@/assets/q4.png';
import q5 from '@/assets/q5.png';
import s1 from '@/assets/s1.png';
import s2 from '@/assets/s2.png';
import s3 from '@/assets/s3.png';
import ot1 from '@/assets/ot1 (1).png';
import ot2 from '@/assets/ot2.png';
import ot3 from '@/assets/ot3.png';
import gymtrack from '@/assets/gymtrack.png';

/* ================================================================
   PROJECTS DATA
   ================================================================ */
const PROJECTS = [
  {
    name: 'Quick Trip',
    images: [q1, q2, q3, q4, q5],
    description: 'Robust platform for managing passengers, vehicles, and drivers — ensuring a secure, efficient, and reliable travel experience.',
    techStack: ['React', 'Django', 'REST Framework', 'PostgreSQL', 'AWS EC2', 'AWS S3'],
    details: 'Role: Backend developer — Integration, Database design and Deployment',
    webUrl: 'https://quicktrip-delta.vercel.app/',
    githubUrl: 'https://github.com/BOLT4L/Quicktrip',
    color: '#F5C518',
  },
  {
    name: 'OptimoTransit',
    images: [ot1, ot2, ot3],
    description: 'Intercity transportation platform with ticket booking, vehicle scheduling, route management, Redis caching, and Celery task processing.',
    techStack: ['Django', 'Django Ninja', 'PostgreSQL', 'Redis', 'Celery', 'Docker'],
    details: 'Role: Backend Developer (Remote Contract) at OptimoTech Co — Jan 2026 to Apr 2026',
    webUrl: null,
    githubUrl: null,
    color: '#FF6B35',
  },
  {
    name: 'SUQ — Handmade E-commerce',
    images: [s1, s2, s3],
    description: 'E-commerce platform for selling handmade products with real-time chat support via phpsocket.io.',
    techStack: ['PHP', 'MySQL', 'Bootstrap', 'phpsocket.io', 'Docker'],
    details: 'Role: Full stack developer',
    webUrl: null,
    githubUrl: 'https://github.com/BOLT4L/SUQ',
    color: '#7C3AED',
  },
  {
    name: 'Auto-Inspection',
    images: [a1, a2],
    description: 'Python-based vehicle inspection system with authentication, digital checklists, reporting features, and Windows deployment.',
    techStack: ['Python', 'Tkinter', 'SQLite', 'Inno Setup', 'PyInstaller'],
    details: 'Role: Python Developer (Contract) at MM Vehicle Inspection — Aug 2025 to Dec 2025',
    webUrl: null,
    githubUrl: 'https://github.com/BOLT4L/Auto-Inspection',
    color: '#06B6D4',
  },
  {
    name: 'FreelanceEth',
    images: [m1, m2, m3, m4],
    description: 'Flutter-based freelance marketplace connecting job seekers with opportunities in Ethiopia — localized UX with Firebase backend.',
    techStack: ['Flutter', 'Dart', 'PHP', 'Firebase', 'flutter_localization'],
    details: 'Role: Full-stack Developer Intern at INSA — Jun 2023 to Sep 2023',
    webUrl: null,
    githubUrl: 'https://github.com/BOLT4L/FreelanceEth',
    color: '#10B981',
  },
  {
    name: 'Flex Gym Tracker',
    images: [gymtrack],
    description: 'Smart gym & fitness tracking application to log workouts, track progress, and visualize performance metrics over time.',
    techStack: ['React', 'Django', 'PostgreSQL', 'Docker'],
    details: 'Role: Full stack developer',
    webUrl: null,
    githubUrl: null,
    color: '#F59E0B',
  },
];

/* ================================================================
   SKILLS DATA
   ================================================================ */
const FRONTEND_SKILLS = [
  { name: 'React',        pct: 88 },
  { name: 'TypeScript',   pct: 82 },
  { name: 'Tailwind CSS', pct: 90 },
  { name: 'Flutter',      pct: 80 },
  { name: 'Node.js',      pct: 75 },
];

const BACKEND_SKILLS = [
  { name: 'Python / Django',     pct: 95 },
  { name: 'Django Ninja',        pct: 88 },
  { name: 'JavaScript',          pct: 85 },
  { name: 'PostgreSQL / SQLite', pct: 82 },
  { name: 'Redis + Celery',      pct: 78 },
  { name: 'AWS / Docker',        pct: 75 },
];

const SOFT_SKILLS = [
  { name: 'Communication',   pct: 90 },
  { name: 'Teamwork',        pct: 95 },
  { name: 'Time Management', pct: 88 },
  { name: 'Problem Solving', pct: 92 },
];

/* ================================================================
   TECH STACK ICONS (SVG inline — zero extra deps)
   ================================================================ */
interface TechIcon { name: string; color: string; svg: string; }

const TECH_ICONS: TechIcon[] = [
  {
    name: 'Python',
    color: '#3B82F6',
    svg: 'M12 0C5.373 0 6.5 2.887 6.5 2.887L6.495 5.87H12.1v.878H4.313S1 6.396 1 12.06c0 5.664 3.134 5.461 3.134 5.461h1.87v-2.624s-.1-3.134 3.083-3.134h5.315s2.981.048 2.981-2.88V3.461S17.83 0 12 0zm-1.652 1.895a.97.97 0 1 1 0 1.941.97.97 0 0 1 0-1.941z M12 24c6.627 0 5.5-2.887 5.5-2.887l.005-2.983H11.9v-.878h7.787S23 17.604 23 11.94c0-5.664-3.134-5.461-3.134-5.461h-1.87v2.624s.1 3.134-3.083 3.134H9.598S6.617 12.189 6.617 15.117V20.54S6.17 24 12 24zm1.652-1.895a.97.97 0 1 1 0-1.941.97.97 0 0 1 0 1.941z',
  },
  {
    name: 'Django',
    color: '#10B981',
    svg: 'M11.146 0h3.924v18.165c-2.013.382-3.491.535-5.096.535-4.791 0-7.288-2.166-7.288-6.32 0-4.002 2.65-6.6 6.753-6.6.637 0 1.121.05 1.707.203zm0 9.143a3.894 3.894 0 0 0-1.325-.204c-1.988 0-3.134 1.223-3.134 3.364 0 2.090 1.096 3.236 3.109 3.236.433 0 .79-.025 1.35-.102V9.142zM21.314 6.06v9.098c0 3.134-.229 4.638-.917 5.937-.637 1.249-1.478 2.039-3.211 2.903l-3.644-1.733c1.733-.815 2.574-1.529 3.109-2.625.561-1.121.739-2.421.739-5.834V6.06h3.924zM17.39.021h3.924v3.95H17.39z',
  },
  {
    name: 'PostgreSQL',
    color: '#336791',
    svg: 'M17.128 0a10.134 10.134 0 0 0-2.755.403l-.063.02A10.922 10.922 0 0 0 12.6.258C11.422.238 10.41.524 9.594 1.009A9.294 9.294 0 0 0 7.7.667c-2.537 0-4.317 1.67-5.137 3.2a10.444 10.444 0 0 0-1.138 4.148c-.1 1.263.047 2.489.417 3.395.244.594.656 1.283 1.362 1.307h.072c.376 0 .74-.152 1.052-.347.012.22.024.441.042.662.015.175.148.36.33.36.115 0 .22-.065.32-.142l.024-.018c.055.264.086.54.086.826 0 .783-.17 1.607-.3 2.27-.087.434-.16.814-.174 1.115-.015.326.08.622.352.795.302.19.77.138 1.215.045.398-.085.798-.217 1.193-.264.03.366.067.797.102 1.15.061.625.245 1.384.755 1.536.139.04.276.049.418.02.52-.102.893-.567 1.196-1.009.196-.283.347-.545.547-.75.203.232.42.464.648.682.374.355.785.517 1.175.505.318-.01.617-.132.877-.325.292-.214.56-.504.787-.84.197-.294.38-.611.524-.937.5.162 1.012.227 1.526.202.535-.025 1.06-.146 1.531-.334.456-.18.842-.42 1.094-.653.255-.237.416-.487.44-.724.025-.24-.085-.467-.293-.601-.153-.098-.33-.133-.505-.148.073-.077.14-.158.2-.242.3-.42.48-.888.586-1.355.103-.458.13-.924.13-1.37 0-.37-.02-.74-.05-1.11l-.009-.095c-.016-.189-.027-.386-.037-.577.362.105.677.102.929-.004.377-.158.591-.504.714-.898.128-.406.162-.882.159-1.36a7.444 7.444 0 0 0-.144-1.37 4.05 4.05 0 0 0-.093-.381c.341.003.644-.022.88-.113.523-.2.79-.645.864-1.153.075-.515-.03-1.091-.278-1.64-.249-.55-.641-1.073-1.134-1.433A2.968 2.968 0 0 0 20.294.7a5.013 5.013 0 0 0-2.377-.699h-.002l-.787-.001z',
  },
  {
    name: 'Redis',
    color: '#DC382D',
    svg: 'M0 13.866v-2.776l6.546-2.74 6.466 2.74 6.559-2.74L24 11.09v2.776l-4.429-1.864v3.514l-4.559 1.906-4.56-1.906v-3.514L8.16 12.886v3.514L3.601 18.306-.001 16.4V12.886L0 13.866zm11.88-3.72L4.32 7.396l7.56-3.164 7.56 3.164-7.56 3.75z',
  },
  {
    name: 'Docker',
    color: '#2496ED',
    svg: 'M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.186.186 0 0 0-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.186.186 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.186.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 0 0-.75.748 11.376 11.376 0 0 0 .692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 0 0 3.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288z',
  },
  {
    name: 'AWS',
    color: '#FF9900',
    svg: 'M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.064.056.128.056.184 0 .08-.048.16-.152.24l-.504.336a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.24-.112a2.47 2.47 0 0 1-.288-.376 6.18 6.18 0 0 1-.248-.472c-.624.736-1.408 1.104-2.352 1.104-.672 0-1.208-.192-1.6-.576-.392-.384-.592-.896-.592-1.536 0-.68.24-1.232.728-1.648.488-.416 1.136-.624 1.96-.624.272 0 .552.024.848.064.296.04.6.104.920.176v-.584c0-.608-.128-1.032-.376-1.28-.256-.248-.688-.368-1.304-.368-.28 0-.568.032-.864.104-.296.072-.584.16-.864.272-.128.056-.224.088-.28.104a.484.484 0 0 1-.128.024c-.112 0-.168-.08-.168-.248v-.392c0-.128.016-.224.056-.28.04-.056.112-.112.224-.168.28-.144.616-.264 1.008-.36A4.82 4.82 0 0 1 4.8 5.2c.936 0 1.616.208 2.056.632.432.424.656 1.08.656 1.96v2.244zm-3.24 1.2c.264 0 .536-.048.824-.144.288-.096.544-.272.76-.512.128-.152.224-.32.272-.512.048-.184.08-.408.08-.664v-.32a6.8 6.8 0 0 0-.736-.056 6.68 6.68 0 0 0-.72-.016c-.512 0-.888.1-1.136.304-.248.2-.368.488-.368.872 0 .36.092.632.28.824.184.2.456.224.744.224zm6.152.824c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.312L7.48 6.448a1.4 1.4 0 0 1-.072-.32c0-.128.064-.2.192-.2h.784c.152 0 .256.024.312.08.064.048.112.16.16.312l1.4 5.528 1.3-5.528c.04-.16.088-.264.152-.312a.56.56 0 0 1 .32-.08h.64c.152 0 .256.024.32.08.064.048.12.16.152.312l1.312 5.6 1.44-5.6c.048-.16.104-.264.16-.312a.52.52 0 0 1 .312-.08h.744c.128 0 .2.064.2.2 0 .04-.008.08-.016.128-.016.048-.04.12-.08.224l-2.016 6.12c-.048.16-.104.264-.168.312-.064.048-.168.08-.304.08h-.688c-.152 0-.256-.024-.32-.08-.064-.056-.12-.16-.152-.32l-1.296-5.376-1.288 5.368c-.04.16-.088.264-.152.32-.064.056-.176.08-.32.08zm10.716.184a5.6 5.6 0 0 1-1.304-.152 3.84 3.84 0 0 1-.976-.368c-.136-.08-.232-.168-.272-.248a.624.624 0 0 1-.056-.248v-.408c0-.168.064-.248.184-.248.048 0 .096.008.144.024.048.016.12.048.2.08.272.12.568.216.888.28.328.064.648.096.976.096.52 0 .92-.088 1.2-.272a.896.896 0 0 0 .416-.8.808.808 0 0 0-.224-.584c-.152-.16-.44-.304-.864-.44l-1.24-.384c-.624-.2-1.088-.488-1.376-.872a2.116 2.116 0 0 1-.432-1.272c0-.368.08-.696.24-.976s.376-.52.64-.712c.264-.2.568-.344.92-.44a3.92 3.92 0 0 1 1.072-.144c.188 0 .376.008.56.032.192.024.368.056.536.096.16.048.312.096.456.152.144.056.256.112.336.168.112.072.192.144.24.224.048.072.072.168.072.296v.376c0 .168-.064.256-.184.256a.84.84 0 0 1-.304-.096 3.664 3.664 0 0 0-1.52-.312c-.472 0-.84.08-1.096.24-.256.16-.384.4-.384.736 0 .232.08.432.24.592.16.16.456.32.888.464l1.216.384c.616.2 1.064.48 1.336.84.272.36.4.776.4 1.24 0 .376-.072.712-.216 1.008-.152.296-.36.552-.632.76-.272.216-.592.376-.968.488a4.184 4.184 0 0 1-1.232.176z',
  },
  {
    name: 'React',
    color: '#61DAFB',
    svg: 'M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.375-.793 1.683-3.265.973-6.366C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.292zM5.132 5.331C6.154 5.331 7.646 6.14 9.24 7.615 8.55 8.34 7.857 9.159 7.2 10.065c-1.102.117-2.15.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.702.15-.09.337-.13.585-.13zm6.554 5.208c.404.783.814 1.622 1.19 2.512-.374.89-.78 1.731-1.19 2.514C11.29 15.565 10.787 15.56 10.28 15.56c-.506 0-1.006.005-1.5.015-.41-.783-.82-1.622-1.194-2.512.374-.89.78-1.731 1.194-2.512.493.007.994.015 1.5.015.507 0 1.01-.005 1.306-.018zm1.932.552c1.1.117 2.145.298 3.106.538-.112.49-.195.964-.254 1.42.023-.002-.023 1.865-.714 3.702-.15.09-.34.13-.585.13-1.02 0-2.513-.808-4.105-2.293.694-.72 1.38-1.542 2.04-2.448.656-.9 1.343-.716 2-.535a.077.077 0 0 1-.002-.002z',
  },
  {
    name: 'Flutter',
    color: '#54C5F8',
    svg: 'M14.314 0L2.3 12 6 15.7 21.684.013h-7.357zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-6.46-6.468 6.46-6.46h-7.37z',
  },
  {
    name: 'Git',
    color: '#F05032',
    svg: 'M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187',
  },
  {
    name: 'JavaScript',
    color: '#F7DF1E',
    svg: 'M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z',
  },
];

/* ================================================================
   REVEAL HELPER
   ================================================================ */
function observeRevealElements(container: Element): () => void {
  const targets = container.querySelectorAll<HTMLElement>(
    '.reveal:not(.visible), .reveal-left:not(.visible), .reveal-scale:not(.visible)'
  );
  if (!targets.length) return () => {};
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    },
    { threshold: 0.08 }
  );
  targets.forEach((t) => io.observe(t));
  return () => io.disconnect();
}

/* ================================================================
   SKILL BAR
   ================================================================ */
function SkillBar({ name, pct, color = 'gold' }: { name: string; pct: number; color?: 'gold' | 'ember' }) {
  const barRef    = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  const animate = useCallback(() => {
    if (triggered.current || !barRef.current) return;
    triggered.current = true;
    barRef.current.style.width = `${pct}%`;
  }, [pct]);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { animate(); io.disconnect(); } },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [animate]);

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium" style={{ color: 'hsl(var(--foreground))', fontFamily: 'Inter, sans-serif' }}>
          {name}
        </span>
        <span className="text-xs font-semibold" style={{ color: color === 'gold' ? 'hsl(var(--primary))' : 'hsl(var(--accent))' }}>
          {pct}%
        </span>
      </div>
      <div className="skill-bar-track">
        <div
          ref={barRef}
          style={{
            height: '100%', width: '0%', borderRadius: '2px',
            background: color === 'gold' ? 'var(--gradient-gold)' : 'hsl(var(--accent))',
            transition: 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </div>
    </div>
  );
}

/* ================================================================
   PROJECT MODAL
   ================================================================ */
function ProjectModal({ project, onClose }: { project: (typeof PROJECTS)[0]; onClose: () => void }) {
  const [idx, setIdx] = useState(0);
  const allMedia = [...project.images, ...(('videos' in project && project.videos) ? (project as any).videos : [])];
  const total    = allMedia.length;
  const isVideo  = (i: number) => ('videos' in project) && (project as any).videos && i >= project.images.length;

  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={project.name}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-[hsl(var(--secondary))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
          aria-label="Close modal"
        >✕</button>

        <div className="relative mb-4 overflow-hidden rounded-xl bg-[hsl(var(--secondary))]" style={{ height: '220px' }}>
          {isVideo(idx) ? (
            <video src={(project as any).videos[idx - project.images.length]} controls className="w-full h-full object-contain" />
          ) : (
            <img
              src={project.images[idx]}
              alt={`${project.name} screenshot ${idx + 1}`}
              className="w-full h-full"
              style={{ objectFit: project.name.toLowerCase().includes('freelance') ? 'contain' : 'cover' }}
            />
          )}
          {total > 1 && (
            <>
              <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/80" aria-label="Previous"><ChevronLeft size={18} color="white" /></button>
              <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/80" aria-label="Next"><ChevronRight size={18} color="white" /></button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                {Array.from({ length: total }).map((_, i) => (
                  <button key={i} onClick={() => setIdx(i)} className="rounded-full transition-all"
                    style={{ width: i === idx ? '20px' : '6px', height: '6px', background: i === idx ? 'hsl(var(--primary))' : 'hsl(var(--foreground)/0.35)' }}
                    aria-label={`Media ${i + 1}`} />
                ))}
              </div>
            </>
          )}
        </div>

        <h4 className="text-xl font-bold mb-2" style={{ fontFamily: 'Syne, sans-serif', color: 'hsl(var(--foreground))' }}>{project.name}</h4>
        <p className="text-sm mb-2" style={{ color: 'hsl(var(--muted-foreground))' }}>{project.description}</p>
        <p className="text-xs mb-4" style={{ color: 'hsl(var(--muted-foreground))' }}>{project.details}</p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.techStack.map((t) => (
            <span key={t} className="px-2.5 py-1 text-xs font-medium rounded-full border"
              style={{ borderColor: `${project.color}40`, color: project.color, background: `${project.color}15` }}>
              {t}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          {project.webUrl && (
            <a href={project.webUrl} target="_blank" rel="noopener noreferrer"
              className="btn-primary flex-1 justify-center" style={{ padding: '0.6rem 1rem', fontSize: '0.8rem' }}>
              <ExternalLink size={14} /> Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              className="btn-outline flex-1 justify-center" style={{ padding: '0.6rem 1rem', fontSize: '0.8rem' }}>
              <Github size={14} /> GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   SKILLS PANEL — bars + tech icon grid
   ================================================================ */
function SkillsPanel() {
  return (
    <div className="space-y-14">
      {/* Bar charts */}
      <div id="skills" className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="reveal p-6 rounded-2xl border space-y-5"
          style={{ background: 'var(--gradient-card)', borderColor: 'hsl(var(--border))' }}>
          <h4 className="text-sm font-bold tracking-widest uppercase" style={{ color: 'hsl(var(--primary))', fontFamily: 'Syne, sans-serif' }}>Frontend</h4>
          {FRONTEND_SKILLS.map((s) => <SkillBar key={s.name} name={s.name} pct={s.pct} color="gold" />)}
        </div>
        <div className="reveal p-6 rounded-2xl border space-y-5"
          style={{ background: 'var(--gradient-card)', borderColor: 'hsl(var(--border))', transitionDelay: '80ms' }}>
          <h4 className="text-sm font-bold tracking-widest uppercase" style={{ color: 'hsl(var(--accent))', fontFamily: 'Syne, sans-serif' }}>Backend & Infra</h4>
          {BACKEND_SKILLS.map((s) => <SkillBar key={s.name} name={s.name} pct={s.pct} color="ember" />)}
        </div>
        <div className="reveal p-6 rounded-2xl border space-y-5"
          style={{ background: 'var(--gradient-card)', borderColor: 'hsl(var(--border))', transitionDelay: '160ms' }}>
          <h4 className="text-sm font-bold tracking-widest uppercase" style={{ color: 'hsl(var(--accent))', fontFamily: 'Syne, sans-serif' }}>Soft Skills</h4>
          {SOFT_SKILLS.map((s) => <SkillBar key={s.name} name={s.name} pct={s.pct} color="ember" />)}
        </div>
      </div>

      {/* Tech icon grid */}
      <div className="reveal" style={{ transitionDelay: '200ms' }}>
        <span className="section-label mb-6 block">Tech Stack</span>
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 gap-4">
          {TECH_ICONS.map(({ name, color, svg }, i) => (
            <div
              key={name}
              className="reveal flex flex-col items-center gap-2 p-3 rounded-xl border transition-all duration-300 hover:scale-105 group"
              style={{
                background: 'var(--gradient-card)',
                borderColor: 'hsl(var(--border))',
                transitionDelay: `${i * 40}ms`,
              }}
              title={name}
            >
              <svg viewBox="0 0 24 24" className="w-8 h-8 transition-all duration-300 group-hover:drop-shadow-[0_0_6px_currentColor]"
                style={{ fill: color }}>
                <path d={svg} />
              </svg>
              <span className="text-xs font-medium text-center leading-tight"
                style={{ color: 'hsl(var(--muted-foreground))', fontFamily: 'Inter, sans-serif', fontSize: '0.65rem' }}>
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   EXPERIENCE PANEL
   ================================================================ */
function ExperiencePanel() {
  const EXPERIENCE = [
    {
      role: 'Backend Developer',
      type: 'Remote Contract',
      company: 'OptimoTech Co',
      period: 'Jan 2026 – Apr 2026',
      color: 'hsl(var(--primary))',
      bullets: [
        'Designed backend architecture for an intercity transportation platform.',
        'Developed APIs for ticket booking, vehicle scheduling, route management, and passenger operations.',
        'Implemented Redis caching to reduce database load.',
        'Integrated Celery for background task processing and notifications.',
        'Collaborated with frontend developers on booking and admin dashboards.',
      ],
      tech: 'Django · Django Ninja · PostgreSQL · Redis · Celery · Docker',
    },
    {
      role: 'Python Developer',
      type: 'Contract',
      company: 'MM Vehicle Inspection Software',
      period: 'Aug 2025 – Dec 2025',
      color: 'hsl(var(--accent))',
      bullets: [
        'Developed a Python-based vehicle inspection system with authentication, digital checklists, and reporting.',
        'Implemented persistent inspection record storage and report generation.',
        'Deployed across 32-bit and 64-bit Windows environments.',
      ],
      tech: 'Python · Tkinter · SQLite · Inno Setup',
    },
    {
      role: 'Backend Developer',
      type: 'Intern',
      company: 'Next General Trading (NGT)',
      period: 'Jun 2024 – Oct 2024',
      color: 'hsl(var(--primary))',
      bullets: [
        'Developed Django backend modules for an ERP platform focused on employee benefit management.',
        'Designed RESTful APIs for internal business workflows.',
        'Participated in database schema design and service integration.',
      ],
      tech: 'Django · RESTful API · React · SQLite',
    },
    {
      role: 'Full-stack Developer',
      type: 'Intern',
      company: 'INSA — Information Network Security Administration',
      period: 'Jun 2023 – Sep 2023',
      color: 'hsl(var(--accent))',
      bullets: [
        'Designed and developed FreelanceEth, a Flutter-based freelance marketplace platform.',
        'Built job posting and browsing functionalities for freelancers and clients.',
        'Integrated backend APIs and Firebase to support core platform operations.',
      ],
      tech: 'Flutter · API Integration · Firebase · PHP',
    },
    {
      role: 'Co-founder & Full-stack Developer',
      type: 'Startup',
      company: 'SmartTech — Smart Sales Forecasting System',
      period: 'May 2023 – Present',
      color: 'hsl(var(--primary))',
      bullets: [
        'Built a machine learning-powered platform to forecast sales trends using historical data.',
        'Developed backend APIs and frontend dashboards to visualize forecasts and performance metrics.',
      ],
      tech: 'MERN · Docker · ML Models · Render',
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
      {/* Timeline */}
      <div className="lg:col-span-3">
        <span className="section-label mb-8 block">Work Experience</span>
        <div className="relative pl-8 space-y-6">
          <div className="timeline-line" />
          {EXPERIENCE.map((exp, i) => (
            <div key={exp.company} className="relative reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="timeline-dot" style={{ background: exp.color, boxShadow: `0 0 10px ${exp.color}60` }} />
              <div className="p-5 rounded-xl border" style={{ background: 'var(--gradient-card)', borderColor: 'hsl(var(--border))' }}>
                <div className="flex items-start justify-between gap-2 mb-1 flex-wrap">
                  <div>
                    <h4 className="text-base font-bold" style={{ fontFamily: 'Syne, sans-serif', color: 'hsl(var(--foreground))' }}>
                      {exp.role}
                      <span className="ml-2 text-xs font-normal px-2 py-0.5 rounded-full"
                        style={{ background: `${exp.color.replace(')', '/0.15)').replace('hsl', 'hsl')}`, color: exp.color }}>
                        {exp.type}
                      </span>
                    </h4>
                    <p className="text-sm font-medium mt-0.5" style={{ color: exp.color }}>{exp.company}</p>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full shrink-0"
                    style={{ background: 'hsl(var(--secondary))', color: 'hsl(var(--muted-foreground))' }}>
                    {exp.period}
                  </span>
                </div>
                <ul className="mt-3 space-y-1">
                  {exp.bullets.map((b) => (
                    <li key={b} className="text-xs flex gap-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
                      <span style={{ color: exp.color, marginTop: '2px', flexShrink: 0 }}>›</span>{b}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs" style={{ color: 'hsl(var(--muted-foreground))', fontStyle: 'italic' }}>
                  {exp.tech}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education + Bio */}
      <div className="lg:col-span-2 space-y-8">
        <span className="section-label mb-8 block">Education</span>
        <div className="relative pl-8">
          <div className="timeline-line" />
          <div className="relative reveal">
            <div className="timeline-dot" />
            <div className="p-5 rounded-xl border" style={{ background: 'var(--gradient-card)', borderColor: 'hsl(var(--border))' }}>
              <div className="flex items-start justify-between gap-2 mb-1 flex-wrap">
                <h4 className="text-base font-bold" style={{ fontFamily: 'Syne, sans-serif', color: 'hsl(var(--foreground))' }}>
                  B.Sc. Software Engineering
                </h4>
                <span className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: 'hsl(var(--primary)/0.12)', color: 'hsl(var(--primary))' }}>
                  2021–2025
                </span>
              </div>
              <p className="text-sm font-medium" style={{ color: 'hsl(var(--primary))' }}>
                Adama Science and Technology University
              </p>
            </div>
          </div>
        </div>

        {/* Bio card */}
        <div className="reveal p-6 rounded-2xl border relative overflow-hidden"
          style={{ background: 'var(--gradient-card)', borderColor: 'hsl(var(--border))' }}>
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-10 blur-2xl"
            style={{ background: 'hsl(var(--primary))' }} aria-hidden="true" />
          <h4 className="text-sm font-bold tracking-widest uppercase mb-3"
            style={{ color: 'hsl(var(--primary))', fontFamily: 'Syne, sans-serif' }}>
            Profile
          </h4>
          <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Backend Software Engineer specializing in <span style={{ color: 'hsl(var(--foreground))' }}>Django</span> and scalable API development.
            Experienced in REST API design, PostgreSQL, Redis caching, Celery, and cloud deployment using Docker and AWS.
            Seeking opportunities in <span style={{ color: 'hsl(var(--foreground))' }}>distributed systems and high-scale applications</span>.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {['English', 'Amharic'].map((lang) => (
              <span key={lang} className="text-xs px-2.5 py-1 rounded-full border"
                style={{ borderColor: 'hsl(var(--border))', color: 'hsl(var(--muted-foreground))' }}>
                🌐 {lang}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   PROJECTS PANEL
   ================================================================ */
function ProjectsPanel() {
  const [selected, setSelected] = useState<(typeof PROJECTS)[0] | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PROJECTS.map((project, i) => (
          <div
            key={project.name}
            className="project-card reveal"
            style={{ height: '260px', transitionDelay: `${i * 60}ms` }}
            onClick={() => setSelected(project)}
            role="button" tabIndex={0} aria-label={`View ${project.name} details`}
            onKeyDown={(e) => e.key === 'Enter' && setSelected(project)}
          >
            <img
              src={project.images[0]}
              alt={project.name}
              className="project-card-img absolute inset-0 w-full h-full"
              style={{ objectFit: project.name.toLowerCase().includes('freelance') ? 'contain' : 'cover',
                       background: project.name.toLowerCase().includes('freelance') ? '#111' : undefined }}
              loading="lazy"
            />
            {/* Always-visible bottom bar */}
            <div className="absolute inset-0 flex flex-col justify-end p-4"
              style={{ background: 'linear-gradient(to top, hsl(222 20% 5% / 0.93) 0%, transparent 55%)' }}>
              <h4 className="text-sm font-bold text-white mb-1 line-clamp-1" style={{ fontFamily: 'Syne, sans-serif' }}>
                {project.name}
              </h4>
              <div className="flex gap-1.5 flex-wrap">
                {project.techStack.slice(0, 3).map((t) => (
                  <span key={t} className="text-xs px-1.5 py-0.5 rounded"
                    style={{ background: `${project.color}25`, color: project.color }}>{t}</span>
                ))}
                {project.techStack.length > 3 && (
                  <span className="text-xs px-1.5 py-0.5 rounded bg-white/10 text-white/60">+{project.techStack.length - 3}</span>
                )}
              </div>
            </div>
            {/* Hover overlay */}
            <div className="project-card-overlay">
              <p className="text-xs text-white/80 line-clamp-2 mb-3">{project.description}</p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color: project.color }}>
                View Details →
              </span>
            </div>
          </div>
        ))}
      </div>
      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </>
  );
}

/* ================================================================
   MAIN ABOUT SECTION
   ================================================================ */
type TabId = 'experience' | 'skills' | 'projects';

const TABS: { id: TabId; label: string; icon: typeof Briefcase }[] = [
  { id: 'experience', label: 'Experience', icon: Briefcase  },
  { id: 'skills',     label: 'Skills',     icon: Code       },
  { id: 'projects',   label: 'Projects',   icon: FolderOpen },
];

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState<TabId>('experience');
  const sectionRef = useRef<HTMLElement>(null);
  const panelRefs  = useRef<Record<TabId, HTMLDivElement | null>>({
    experience: null, skills: null, projects: null,
  });

  /* Observe new panel on tab switch */
  useEffect(() => {
    const panel = panelRefs.current[activeTab];
    if (!panel) return;
    const timer = setTimeout(() => observeRevealElements(panel), 60);
    return () => clearTimeout(timer);
  }, [activeTab]);

  /* Observe section header on mount */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    return observeRevealElements(section);
  }, []);

  const switchTab = useCallback((id: TabId) => setActiveTab(id), []);

  return (
    <section id="about" ref={sectionRef} className="py-24 lg:py-32"
      style={{ background: 'hsl(var(--background))' }} aria-label="About me">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="mb-16 reveal">
          <span className="section-label mb-4 block">Get to know me</span>
          <h2 className="text-5xl lg:text-6xl font-extrabold"
            style={{ fontFamily: 'Syne, sans-serif', color: 'hsl(var(--foreground))' }}>
            About <span className="gradient-text">Me</span>
          </h2>
        </div>

        <div className="flex gap-2 flex-wrap mb-10 reveal" role="tablist" aria-label="About sections">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} role="tab" aria-selected={activeTab === id}
              aria-controls={`tab-panel-${id}`} id={`tab-${id}`}
              onClick={() => switchTab(id)}
              className={`about-tab-btn flex items-center gap-2 ${activeTab === id ? 'active' : ''}`}>
              <Icon size={15} />{label}
            </button>
          ))}
        </div>

        <div id="tab-panel-experience" role="tabpanel" aria-labelledby="tab-experience"
          ref={(el) => { panelRefs.current.experience = el; }}
          style={{ display: activeTab === 'experience' ? 'block' : 'none' }}>
          <ExperiencePanel />
        </div>

        <div id="tab-panel-skills" role="tabpanel" aria-labelledby="tab-skills"
          ref={(el) => { panelRefs.current.skills = el; }}
          style={{ display: activeTab === 'skills' ? 'block' : 'none' }}>
          <SkillsPanel />
        </div>

        <div id="tab-panel-projects" role="tabpanel" aria-labelledby="tab-projects"
          ref={(el) => { panelRefs.current.projects = el; }}
          style={{ display: activeTab === 'projects' ? 'block' : 'none' }}>
          <ProjectsPanel />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
