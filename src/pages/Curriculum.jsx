import { useState, useEffect, useRef } from 'react';
import {
  RiCodeSSlashLine,
  RiLightbulbLine,
  RiGlobalLine,
  RiShieldKeyholeLine,
  RiArchiveDrawerLine,
  RiRobot3Line,
  RiBriefcaseLine,
  RiRocket2Line,
  RiCpuLine,
  RiRobot2Line,
  RiRepeatLine,
  RiArrowRightSLine,
  RiUserFollowLine,
  RiAwardLine,
  RiInformationLine
} from 'react-icons/ri';
import { MdMemory } from 'react-icons/md';

function RoadmapItem({ subject, index, isActive }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);
  const isRight = index % 2 !== 0;

  return (
    <div
      ref={cardRef}
      className={`relative w-full min-h-[400px] md:min-h-[500px] flex items-center justify-start md:justify-center py-8 md:py-16 group`}
    >
      {/* Central Node Indicator */}
      <div className="absolute left-[24px] md:left-1/2 -translate-x-1/2 z-20 transition-all duration-700">
        <div className={`w-5 h-5 md:w-8 md:h-8 rounded-full border-4 border-white shadow-xl transition-all duration-700 ${isActive ? 'bg-[#419CB8] scale-125 md:scale-150 shadow-[0_0_30px_rgba(65,156,184,0.8)]' : 'bg-gray-100 scale-100'}`} />
        {isActive && (
          <div className="absolute inset-0 rounded-full bg-[#419CB8] animate-ping opacity-30" />
        )}
      </div>

      {/* Content Card container with Perspective */}
      <div className={`w-full max-w-6xl pl-14 pr-4 md:px-12 flex flex-col ${isRight ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-20 perspective-1000`}>
        {/* Mobile Milestone Number Badge */}


        <div className="hidden md:block w-1/2" />
        
        <div
          className={`w-full md:w-1/2 h-[380px] md:h-[450px] transition-all duration-1000 transform ${isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-24 scale-90'}`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className={`relative w-full h-full transition-all duration-700 preserve-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}>

            {/* FRONT SIDE: SUBJECT IMAGE & TITLE */}
            <div className={`absolute inset-0 backface-hidden bg-white rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.06)] border border-white/40 flex flex-col justify-end overflow-hidden z-10 group/front`}>
              {/* Full-bleed Subject Image */}
              {subject.image && (
                <div className="absolute inset-0">
                  <img
                    src={subject.image}
                    alt={subject.title}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover/card:scale-110"
                  />
                  {/* High-intensity gradient for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent" />
                </div>
              )}

              {/* Flip Hint Icon */}
              <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/40 transition-all duration-300 z-20">
                <RiRepeatLine className="w-5 h-5" />
              </div>

              <div className="relative p-8 md:p-12 z-20">
                <div className={`text-[#419CB8] mb-4 flex ${isRight ? 'justify-start' : 'md:justify-end'}`}>
                  <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20">
                    {subject.icon}
                  </div>
                </div>

                <h3 className={`font-['Space_Grotesk'] font-black text-2xl md:text-4xl text-white mb-2 uppercase tracking-tight ${isRight ? 'text-left' : 'md:text-right'} drop-shadow-lg`}>
                  {subject.title}
                </h3>
                
                <div className={`flex flex-col gap-2 ${isRight ? 'items-start' : 'md:items-end'}`}>
                  <p className={`text-[#419CB8] text-[10px] md:text-xs font-black uppercase tracking-[0.3em]`}>
                    Explore Milestone <span className="text-white opacity-50">/ 0{index + 1}</span>
                  </p>
                  
                  {/* Mobile-only Tap Hint */}
                  <div className="md:hidden flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10 animate-pulse">
                    <RiInformationLine className="w-3 h-3 text-[#419CB8]" />
                    <span className="text-white text-[9px] font-bold uppercase tracking-widest">Tap to reveal info</span>
                  </div>
                </div>
              </div>
            </div>

            {/* BACK SIDE: DESCRIPTION & IMAGE PREVIEW */}
            <div className={`absolute inset-0 backface-hidden rotate-y-180 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-sky-50 flex flex-col justify-center overflow-hidden z-20`}>
              {/* Flip Hint Icon (Back) */}
              <div className="absolute top-6 right-6 text-[#419CB8] opacity-50">
                <RiRepeatLine className="w-5 h-5" />
              </div>

              <div className="h-full flex flex-col justify-center overflow-y-auto scrollbar-hide py-2">
                <h4 className="text-[#419CB8] font-black text-lg md:text-xl uppercase tracking-tighter mb-4 flex items-center gap-2">
                  <RiArrowRightSLine className="w-5 h-5" />
                  Milestone Details
                </h4>
                <p className="text-gray-700 text-sm md:text-lg leading-relaxed font-semibold text-justify hd-text">
                  {subject.description}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function Curriculum() {

  // Preload all subject images to eliminate loading delay in production (Vercel)
  useEffect(() => {
    subjects.forEach((subject) => {
      if (subject.image) {
        const img = new Image();
        img.src = subject.image;
      }
    });
  }, []);

  const subjects = [
    {
      id: "freshman",
      title: "The Freshman",
      description: "Where it all begins. Your first day as a Computer Engineering student (CpE). A step into the world of logic, circuit boards, and the promise of becoming a master architect of technology.",
      icon: <RiUserFollowLine className="w-8 h-8 md:w-10 h-10" />,
      image: "/assets/Freshman.png"
    },
    {
      id: "programming",
      title: "Programming",
      description: "This subject introduces the fundamental logic and syntax used to communicate with computers. You will learn how to write, test, and debug code to solve problems, laying the essential foundation needed for all future software and hardware-interfacing tasks.",
      icon: <RiCodeSSlashLine className="w-8 h-8 md:w-10 h-10" />,
      image: "/assets/Programming.png"
    },
    {
      id: "rnd",
      title: "Research and Development",
      description: "Focuses on the systematic investigation required to innovate, create new technologies, or improve existing systems. It challenges you to apply theoretical knowledge to practical problems, guiding you through the process of designing experiments, prototyping solutions, and documenting your findings.",
      icon: <RiLightbulbLine className="w-8 h-8 md:w-10 h-10" />,
      image: "/assets/RND.png"
    },
    {
      id: "software-eng",
      title: "Software Engineering",
      description: "This covers the systematic methodologies used to design, develop, test, and maintain large-scale software systems. It moves beyond simple coding to focus on project lifecycles, architecture design, and building scalable, reliable applications from the ground up.",
      icon: <RiArchiveDrawerLine className="w-8 h-8 md:w-10 h-10" />,
      image: "/assets/software Engineering.png"
    },
    {
      id: "ai",
      title: "Artificial Intelligence",
      description: "This field explores how to create systems capable of performing tasks that typically require human intelligence. You will study algorithms, machine learning concepts, and data processing to understand how models learn from data, adapt, and make automated decisions.",
      icon: <RiRobot3Line className="w-8 h-8 md:w-10 h-10" />,
      image: "/assets/Artificial Intelligence.png"
    },
    {
      id: "ojt",
      title: "On-the-Job Training",
      description: "This provides practical, real-world experience by placing you in a professional working environment. It bridges the gap between classroom theory and industry practice, allowing you to apply your technical skills to actual workplace projects and understand professional workflows.",
      icon: <RiBriefcaseLine className="w-8 h-8 md:w-10 h-10" />,
      image: "/assets/ojt.png"
    },
    {
      id: "microprocessors",
      title: "Microprocessors",
      description: "This course dives deep into the central processing unit (CPU) of a computer. You will learn about instruction sets, memory interfacing, and how hardware and software interact at the lowest level to execute commands and process data.",
      icon: <MdMemory className="w-8 h-8 md:w-10 h-10" />,
      image: "/assets/microprocessors.png"
    },
    {
      id: "networking",
      title: "Networking and Cyber Security",
      description: "This subject explores how computers connect and communicate, covering essential concepts like the OSI model, data link layers, and network protocols. It also emphasizes the strategies, cryptographic principles, and technologies used to protect these networks and sensitive data from unauthorized access and attacks.",
      icon: <RiShieldKeyholeLine className="w-8 h-8 md:w-10 h-10" />,
      image: "/assets/networking and Cyber Security.png"
    },
    {
      id: "web-design",
      title: "Web Design & Development",
      description: "This covers the creation and maintenance of websites and web applications. You will learn both frontend design for user interfaces and backend logic for server-side operations and database integration, enabling you to build fully functional, interactive web platforms.",
      icon: <RiGlobalLine className="w-8 h-8 md:w-10 h-10" />,
      image: "/assets/Web design and development.png"
    },
    {
      id: "emerging-tech",
      title: "Emerging Technologies in CpE",
      description: "This subject keeps you up-to-date with the latest, rapidly evolving advancements in the tech industry. It explores cutting-edge tools, frameworks, and hardware concepts that are currently shaping the future of computer engineering, preparing you to adapt to new industry trends.",
      icon: <RiRocket2Line className="w-8 h-8 md:w-10 h-10" />,
      image: "/assets/Emerging Technologies in CpE.png"
    },
    {
      id: "computer-arch",
      title: "Computer Architecture & Organization",
      description: "This looks at the internal workings of a computer system, focusing on how its physical components (like memory, ALUs, and control units) are structured and interact. You will learn how digital logic and Boolean algebra translate into the physical computing power that runs software.",
      icon: <RiCpuLine className="w-8 h-8 md:w-10 h-10" />,
      image: "/assets/Computer architechture and organization.png"
    },
    {
      id: "robotics",
      title: "Robotics",
      description: "This interdisciplinary field combines hardware design, electronics, and programming to create automated machines. You will learn how to integrate microcontrollers and sensors with mechanical systems to build robots that can perceive and interact with their physical environment.",
      icon: <RiRobot2Line className="w-8 h-8 md:w-10 h-10" />,
      image: "/assets/Robotics.png"
    },
    {
      id: "certified",
      title: "Certified Computer Engineer",
      description: "Mastery achieved. You are now a licensed and certified Computer Engineer, fully equipped to design, build, and innovate at the intersection of hardware and software.",
      icon: <RiAwardLine className="w-8 h-8 md:w-10 h-10" />,
      image: "/assets/certified.png"
    }
  ];

  const [activeIndices, setActiveIndices] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const index = parseInt(entry.target.getAttribute('data-index'));
        if (entry.isIntersecting) {
          setActiveIndices(prev => [...new Set([...prev, index])].sort((a, b) => a - b));
        }
      });
    }, { threshold: 0.3, rootMargin: "-10% 0px -20% 0px" });

    const items = containerRef.current.querySelectorAll('.roadmap-milestone');
    items.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, []);


  return (
    <div className="bg-[#fcfcfc] min-h-screen py-16 md:py-24 overflow-hidden scroll-smooth">
      {/* Header: CORE SUBJECTS */}
      <div className="max-w-7xl mx-auto px-6 mb-16 md:mb-24 text-center">
        <div className="inline-flex flex-col items-center">
          <h1 className="font-black tracking-tighter uppercase font-['Space_Grotesk'] text-4xl md:text-7xl lg:text-8xl text-[#1e293b] leading-none">
            CORE <span className="text-[#419CB8]">CURRICULUM</span>
          </h1>
          <p className="font-light tracking-[0.4em] uppercase text-gray-400 text-sm md:text-base mt-4">
            The Computer Engineer's Journey
          </p>
        </div>
      </div>

      <div ref={containerRef} className="relative max-w-7xl mx-auto pb-64">
        {/* Central Vertical Road Line (Responsive positioning) */}
        <div className="absolute left-[24px] md:left-1/2 -translate-x-1/2 top-0 h-[calc(100%-480px)] w-[3px] md:w-[6px] bg-gray-100/50 z-0 rounded-full overflow-hidden">
          {/* Animated Glowing Path */}
          <div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#419CB8] via-[#419CB8] to-[#419CB8]/10 shadow-[0_0_20px_rgba(65,156,184,0.4)] transition-all duration-1000 ease-out z-10"
            style={{
              height: activeIndices.length > 0
                ? `${((activeIndices[activeIndices.length - 1] + 1) / subjects.length) * 100}%`
                : '0%'
            }}
          />
        </div>

        {/* Roadmap Items */}
        <div className="relative z-10 flex flex-col">
          {subjects.map((subject, idx) => (
            <div key={subject.id} data-index={idx} className="roadmap-milestone">
              <RoadmapItem
                subject={subject}
                index={idx}
                isActive={activeIndices.includes(idx)}
              />
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .perspective-1000 {
          perspective: 2000px;
          -webkit-perspective: 2000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
          -webkit-transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
          -webkit-transform: rotateY(180deg);
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .hd-text {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          letter-spacing: 0.01em;
        }

        /* Smooth scroll optimization */
        html {
          scroll-behavior: smooth;
        }

        /* Hide scrollbar completely */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}

export default Curriculum;
