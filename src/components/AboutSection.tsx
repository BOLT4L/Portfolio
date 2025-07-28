import { useState, useRef } from 'react';
import { Briefcase, GraduationCap, Code, FolderOpen, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import a1 from '@/assets/a1.png';
import a2 from '@/assets/a2.png';
import d1 from '@/assets/d1.png';
import f1 from '@/assets/f1.png';
import f2 from '@/assets/f2.png';
import f3 from '@/assets/f3.png';
import f4 from '@/assets/f4.png';
import d2 from '@/assets/d2.mp4';
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

interface AboutFace {
  title: string;
  content: React.ReactNode;
}

const AboutSection = () => {
  const [currentFace, setCurrentFace] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showEssay, setShowEssay] = useState(false);

  const icons = [Briefcase, GraduationCap, Code, FolderOpen];

  const faces: AboutFace[] = [
    {
      title: "Experience",
      content: (
        <div className="space-y-6">
          <div className="border-l-4 border-primary pl-6">
            <h4 className="text-xl font-semibold text-foreground">Mobile Application developer Intern </h4>
            <p className="text-primary">Information Network Security Administration (INSA) • June 2023 - August 2023</p>
            <p className="text-muted-foreground mt-2">Built a job searching mobile application (FreelanceEth) using Flutter and php</p>
          </div>
          <div className="border-l-4 border-accent pl-6">
            <h4 className="text-xl font-semibold text-foreground">ERP System Developer Intern</h4>
            <p className="text-accent">Next General Trading (NGT) • June 2024 - August 2024</p>
            <p className="text-muted-foreground mt-2">Worked as a backend developer to build a ERP system for NGT using Django and postgreSQL</p>
          </div>
        </div>
      )
    },
    {
      title: "Academic Background",
      content: (
        <div className="space-y-6">
          <div className="border-l-4 border-accent pl-6">
            <h4 className="text-xl font-semibold text-foreground">Bachelor of Software Engineering</h4>
            <p className="text-accent">Adama Science and Technology University • 2021 - 2025</p>
          </div>
        </div>
      )
    },
    {
      title: "Skill Set",
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <h4 className="text-lg font-semibold text-primary mb-3">Frontend</h4>
            <div className="space-y-4">
              {[
                { name: 'React', percentage: 90 },
                { name: 'TypeScript', percentage: 85 },
                { name: 'Tailwind CSS', percentage: 95 },
                { name: 'Flutter', percentage: 80 }
              ].map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-foreground font-medium">{skill.name}</span>
                    <span className="text-primary text-sm font-semibold">{skill.percentage}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-accent mb-3">Backend</h4>
            <div className="space-y-4">
              {[
                { name: 'Python', percentage: 90 },
                { name: 'JS', percentage: 87 },
                { name: 'PHP', percentage: 80 },
                { name: 'PostgreSQL & MySQL', percentage: 75 },
                { name: 'AWS', percentage: 70 }
              ].map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-foreground font-medium">{skill.name}</span>
                    <span className="text-accent text-sm font-semibold">{skill.percentage}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-accent h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-accent mb-3">Soft Skills</h4>
            <div className="space-y-4">
              {[
                { name: 'Communication', percentage: 90 },
                { name: 'Team Work', percentage: 95 },
                { name: 'Time Management', percentage: 88 },
                { name: 'Problem Solving', percentage: 85 }
              ].map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-foreground font-medium">{skill.name}</span>
                    <span className="text-accent text-sm font-semibold">{skill.percentage}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-accent h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Projects",
      content: (
        <div className="relative">
          {/* Tuning/knob style scroll buttons */}
          <GalleryScrollButtons />
        </div>
      )
    }
  ];

  const rotateToFace = (faceIndex: number) => {
    setCurrentFace(faceIndex);
  };

  const getRotationStyle = (faceIndex: number) => {
    const rotations = [
      'rotateY(0deg)',     // front
      'rotateY(-90deg)',   // right
      'rotateY(-180deg)',  // back
      'rotateY(-270deg)'   // left
    ];
    return rotations[faceIndex];
  };

  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
              About <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Me</span>
            </h2>
            <button
              aria-label="Show about essay"
              onClick={() => setShowEssay(v => !v)}
              className={`ml-2 p-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${showEssay ? 'bg-primary/20' : 'bg-secondary'}`}
            >
              <ChevronDown className={`w-7 h-7 transition-transform duration-300 ${showEssay ? 'rotate-180' : ''}`} />
            </button>
          </div>
          {showEssay && (
            <div className="mx-auto max-w-2xl bg-card border border-border rounded-lg shadow p-6 text-base text-foreground animate-fadeIn mb-4">
              <p>
                I am Eyob Wasihun, a passionate software engineer with a strong background in full-stack development, backend systems, and mobile applications. I graduated in 2025 from Adama Science and Technology University. My journey in tech has taken me from building robust ERP and finance management systems to crafting seamless user experiences in mobile and web apps. I am especially eager to work in the fields of Artificial Intelligence and Machine Learning, and I am always looking for opportunities to grow in these areas. I thrive on solving complex problems, learning new technologies, and collaborating with teams to deliver impactful solutions. Outside of coding, I enjoy working out and staying active, which helps me maintain a balanced and healthy lifestyle. My work ethic is driven by curiosity, creativity, and a commitment to excellence. Let’s build something amazing together!
              </p>
            </div>
          )}
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover my journey, skills, and projects through this interactive experience
          </p>
        </div>

        {/* Circular Navigation Buttons */}
        <TooltipProvider>
          <div className="flex justify-center gap-6 mb-12 pb-8">
            {faces.map((face, index) => {
              const Icon = icons[index];
              return (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => rotateToFace(index)}
                      className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                        currentFace === index
                          ? 'bg-primary text-primary-foreground shadow-[var(--shadow-glow)] scale-110'
                          : 'bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground hover:scale-105'
                      }`}
                    >
                      <Icon size={24} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{face.title}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </TooltipProvider>

        {/* 3D Rotating Box */}
        <div className="flex justify-center">
          <div className="flex-1 max-w-2xl">
            <div className="perspective-1000 h-[500px]">
              <div 
                className="rotating-box relative w-full h-full"
                style={{ transform: getRotationStyle(currentFace) }}
              >
                {faces.map((face, index) => (
                  <div
                    key={index}
                    className={`face bg-card border border-border rounded-lg p-8 ${
                      index === 0 ? 'face-front' :
                      index === 1 ? 'face-right' :
                      index === 2 ? 'face-back' : 'face-left'
                    }`}
                    style={{ boxShadow: 'var(--shadow-card)' }}
                  >
                    <h3 className="text-2xl font-bold text-foreground mb-6">{face.title}</h3>
                    <div className="overflow-y-auto max-h-[500px] pr-2">
                      {face.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
};

export default AboutSection;

function ProjectModal({ project, onClose }: { project: any, onClose: () => void }) {
  const [mainImgIdx, setMainImgIdx] = useState(0);
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const total = project.images.length + (project.videos ? project.videos.length : 0);
  
  const prevImg = () => {
    if (mainImgIdx > 0) {
      setMainImgIdx(mainImgIdx - 1);
      setMediaType(mainImgIdx - 1 < project.images.length ? 'image' : 'video');
    } else {
      setMainImgIdx(total - 1);
      setMediaType(total - 1 < project.images.length ? 'image' : 'video');
    }
  };
  
  const nextImg = () => {
    if (mainImgIdx < total - 1) {
      setMainImgIdx(mainImgIdx + 1);
      setMediaType(mainImgIdx + 1 < project.images.length ? 'image' : 'video');
    } else {
      setMainImgIdx(0);
      setMediaType('image');
    }
  };

  const handleThumbnailClick = (idx: number) => {
    setMainImgIdx(idx);
    setMediaType(idx < project.images.length ? 'image' : 'video');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
      <div
        className="bg-card rounded-2xl p-6 max-w-md w-full relative shadow-2xl border border-border animate-fadeIn"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-2xl text-muted-foreground hover:text-primary"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        {/* Main media with arrows */}
        <div className="relative mb-4 flex items-center justify-center">
          {total > 1 && (
            <button onClick={prevImg} className="absolute left-0 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-primary/20 text-2xl px-2 py-1 rounded-full z-10">
              &#8592;
            </button>
          )}
          {mediaType === 'image' ? (
            <img
              src={project.images[mainImgIdx]}
              alt={project.name}
              className={`w-full h-48 rounded-xl border border-border ${
                project.name.toLowerCase().includes('freelanceeth') || project.name.toLowerCase().includes('mobile')
                  ? 'object-contain bg-gray-100'
                  : 'object-cover'
              }`}
            />
          ) : (
            <video
              src={project.videos[mainImgIdx - project.images.length]}
              controls
              className="w-full h-48 object-contain rounded-xl border border-border bg-gray-100"
              autoPlay={false}
            >
              Your browser does not support the video tag.
            </video>
          )}
          {total > 1 && (
            <button onClick={nextImg} className="absolute right-0 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-primary/20 text-2xl px-2 py-1 rounded-full z-10">
              &#8594;
            </button>
          )}
        </div>
        {/* Thumbnails */}
        {total > 1 && (
          <div className="flex gap-2 mb-4 justify-center">
            {project.images.map((img: string, idx: number) => (
              <img
                key={idx}
                src={img}
                alt={project.name + ' thumbnail ' + idx}
                className={`w-12 h-12 object-cover rounded border-2 cursor-pointer transition-all ${mainImgIdx === idx ? 'border-primary scale-110' : 'border-border opacity-70 hover:opacity-100'}`}
                onClick={() => handleThumbnailClick(idx)}
              />
            ))}
            {project.videos && project.videos.map((video: string, idx: number) => (
              <div
                key={`video-${idx}`}
                className={`w-12 h-12 bg-gray-800 rounded border-2 cursor-pointer transition-all flex items-center justify-center ${mainImgIdx === project.images.length + idx ? 'border-primary scale-110' : 'border-border opacity-70 hover:opacity-100'}`}
                onClick={() => handleThumbnailClick(project.images.length + idx)}
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            ))}
          </div>
        )}
        <h4 className="text-2xl font-bold text-foreground mb-2 text-center">{project.name}</h4>
        <p className="text-muted-foreground mb-2 text-center">{project.description}</p>
        <p className="mb-4 text-center">{project.details}</p>
        <div className="flex gap-2 flex-wrap justify-center mb-4">
          {project.techStack.map((tech: string) => (
            <span key={tech} className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">{tech}</span>
          ))}
        </div>
        {/* Project Links */}
        <div className="flex gap-3 justify-center">
          {project.webUrl && (
            <a
              href={project.webUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function GalleryScrollButtons() {
  const scrollRef = useRef<HTMLDivElement>(null);
  // Amount to scroll per click (px)
  const SCROLL_AMOUNT = 320;

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' });
    }
  };
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' });
    }
  };

  // The gallery content is the same as before, but now inside scrollRef
  const projects = [
    {
      name: 'Quick Trip',
      images: [q1, q2, q3, q4, q5],
      description: ' Quick Trip offers a robust platform for managing passengers, vehicles, and drivers, ensuring a secure, efficient, and reliable travel experience.',
      techStack: ['React', 'Django','rest framework','postgresql','AWS EC2','AWS S3','Postman'],
      details: 'Role : Backend developer , Integration , Database design and Deployment',
      webUrl: 'https://quicktrip-delta.vercel.app/',
      githubUrl: 'https://github.com/BOLT4L/Quicktrip'
    },
    {
      name: 'Finance Management System',
      images: [f1,f2,f3,f4],
      description: 'FMS is a finance management system that allows users to manage their finances, including income, expenses, and investments.',
      techStack: ['Python', 'Django','React', 'simpleJWT','postgresql','Docker','Postman'],
      details: 'Role : Full stack developer , Ui design and DBs design .',
       webUrl: null,
      githubUrl: 'https://github.com/BOLT4L/FMS'
    },
    {
      name: 'SUQ - Handmade Products E-commerce',
      images: [s1, s2, s3],
      description: 'SUQ is a simple e-commerce web application designed for selling handmade products.',
      techStack: ['PHP', 'MySQL','Bootstrap','phpsocket.io','Docker'],
      details: 'Role : Full stack developer ',
       webUrl: null,
      githubUrl: 'https://github.com/BOLT4L/SUQ'
    },
    {
      name: 'Auto-Inspection ',
      images: [a1,a2],
      description: 'A desktop software application designed to streamline the vehicle inspection process',
      techStack: ['Python', 'Tkinter','pydoc','pytest','Ms access','inno setup','pyinstaller'],
      details: 'Role : Full stack developer , Db design and Testing',
      webUrl: null,
      githubUrl: 'https://github.com/BOLT4L/Auto-Inspection'
    },
    {
      name: 'Freelanceth - Job Searching Mobile App',
      images: [m1,m2,m3,m4],
      description: 'Freelanceth is a mobile application designed to connect job seekers with freelance opportunities specifically within Ethiopia.',
      techStack: ['Flutter', 'Dart','php','mysql','flutter_hooks','flutter_svg','flutter_screenutil','flutter_localization',],
      details: 'Role : Backend developer ',
      webUrl: null,
      githubUrl: 'https://github.com/BOLT4L/FreelanceEth'
    },
    {
      name: 'Dataflow',
      images: [d1],
      videos: [d2],
      description: 'A web scraping service designed to extract data from websites',
      techStack: ['React', 'django','firebase','google oath','postman','Docker'],
      details: 'Role : Backend developer ',
      webUrl: null,
      githubUrl: 'https://github.com/BOLT4L/Dataflow'
    },
    // Add more projects as needed
  ];
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  return (
    <div className="relative flex items-center">
      {/* Left tuning button */}
      <button
        aria-label="Scroll left"
        onClick={scrollLeft}
        className="absolute left-0 z-20 bg-background border border-border shadow-lg w-12 h-12 rounded-full flex items-center justify-center hover:bg-primary/80 hover:text-primary-foreground active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
        style={{ top: '50%', transform: 'translateY(-50%)' }}
      >
        <ChevronLeft size={28} />
      </button>
      {/* Gallery with always-visible black scrollbar */}
      <div
        ref={scrollRef}
        className="overflow-x-auto px-2 visible-black-scrollbar mx-14" // mx-14 for button space
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div className="flex gap-6 min-w-[500px] max-w-[600px] mx-auto">
          {projects.map((project, idx) => (
            <div
              key={project.name + idx}
              className="w-72 flex-shrink-0 bg-card border border-border rounded-xl shadow-md hover:shadow-xl transition-shadow cursor-pointer group relative overflow-hidden"
              onClick={() => { setSelectedProject(project); setModalOpen(true); }}
            >
              <img
                src={project.images[0]}
                alt={project.name}
                className={`w-full h-40 rounded-t-xl group-hover:scale-105 transition-transform duration-300 ${
                  project.name.toLowerCase().includes('freelanceeth') || project.name.toLowerCase().includes('mobile')
                    ? 'object-contain bg-gray-100'
                    : 'object-cover'
                }`}
              />
              <div className="p-4">
                <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{project.name}</h4>
                <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{project.description}</p>
                <div className="flex gap-2 flex-wrap">
                  {project.techStack.map((tech: string) => (
                    <span key={tech} className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Right tuning button */}
      <button
        aria-label="Scroll right"
        onClick={scrollRight}
        className="absolute right-0 z-20 bg-background border border-border shadow-lg w-12 h-12 rounded-full flex items-center justify-center hover:bg-primary/80 hover:text-primary-foreground active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
        style={{ top: '50%', transform: 'translateY(-50%)' }}
      >
        <ChevronRight size={28} />
      </button>
      {/* Modal */}
      {modalOpen && selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setModalOpen(false)} />
      )}
      <style>{`
        .visible-black-scrollbar::-webkit-scrollbar {
          height: 14px;
          background: #222;
        }
        .visible-black-scrollbar::-webkit-scrollbar-thumb {
          background: #111;
          border-radius: 8px;
          border: 2px solid #333;
        }
        .visible-black-scrollbar::-webkit-scrollbar-track {
          background: #222;
        }
        .visible-black-scrollbar {
          scrollbar-color: #111 #222;
          scrollbar-width: thin;
        }
      `}</style>
    </div>
  );
}