import { useState, useEffect } from 'react';
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
  RiDragMoveLine
} from 'react-icons/ri';
import { MdMemory } from 'react-icons/md';

function Curriculum() {
  const [activeSubject, setActiveSubject] = useState("programming");
  const [isFlipped, setIsFlipped] = useState(false);

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
    }
  ];

  const currentSubject = subjects.find(s => s.id === activeSubject) || subjects[0];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 md:py-12">
      {/* Header: CORE SUBJECTS on one line */}
      <div className="mb-6 md:mb-10 w-full">
        <div className="flex items-baseline gap-4 md:gap-6">
          <h1 className="font-black tracking-tighter uppercase font-['Space_Grotesk'] text-4xl md:text-6xl lg:text-7xl text-[#1e293b]">
            CORE
          </h1>
          <span className="font-light tracking-[0.3em] uppercase text-[#419CB8] text-xl md:text-3xl lg:text-5xl">
            SUBJECTS
          </span>
          <div className="hidden md:block h-[3px] flex-grow bg-gradient-to-r from-[#e8d5c4] via-[#faf0e6] to-transparent rounded-full mt-2" />
        </div>
      </div>

      {/* Two Column Layout Block - Viewport-fit */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-stretch h-auto md:h-[calc(100vh-240px)] min-h-[540px] max-h-[680px] relative">

        {/* Swipe Indicator for Mobile Tabs */}
        <div className="md:hidden flex items-center justify-end gap-2 animate-pulse opacity-50 mb-2 -mt-2">
          <span className="text-[9px] font-bold uppercase text-[#419CB8] tracking-[0.2em]">Swipe List To Browse</span>
          <RiDragMoveLine className="w-4 h-4 text-[#419CB8]" />
        </div>

        {/* Left Side */}
        <div className="w-full md:w-2/5 flex flex-row md:flex-col gap-2 md:gap-3 overflow-x-auto md:overflow-x-visible md:overflow-y-auto pb-4 md:pb-4 md:pr-4 md:pl-1 scrollbar-hide shrink-0">

          {subjects.map((subject) => (
            <button
              key={subject.id}
              onClick={() => {
                setActiveSubject(subject.id);
                setIsFlipped(false);
              }}
              className={`
                whitespace-nowrap md:whitespace-normal
                w-auto md:w-full h-[44px] md:h-[52px] text-left px-5 md:px-7 rounded-xl border transition-all duration-300 font-bold text-sm md:text-base relative group flex items-center shrink-0
                ${activeSubject === subject.id
                  ? 'bg-white text-[#00607a] border-l-4 border-l-[#419CB8] border-t-gray-200 border-r-gray-200 border-b-gray-200 shadow-[0_8px_30px_rgba(65,156,184,0.15)] md:transform md:translate-x-1'
                  : 'bg-white text-gray-500 border border-gray-200 hover:text-gray-700 hover:border-l-2 hover:border-l-[#419CB8]/40 hover:shadow-sm active:scale-95'}
              `}
            >
              <div className="flex items-center gap-3 md:gap-4">
                <span className={`transition-transform duration-300 ${activeSubject === subject.id ? 'scale-110' : 'scale-90 opacity-0 group-hover:opacity-40'}`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#419CB8]" />
                </span>
                {subject.title}
              </div>
            </button>
          ))}
        </div>

        {/* Right Side: Description Area (Flippable Card) */}
        <div className="w-full md:w-3/5 perspective-1000 h-[450px] md:h-full">
          <div
            className={`relative w-full h-full transition-all duration-500 preserve-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {/* Front Side: Picture Placeholder */}
            <div className="absolute inset-0 backface-hidden bg-white rounded-[2rem] p-6 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col items-center justify-center overflow-hidden">
              {currentSubject.image ? (
                <div className="w-full h-full relative group">
                  <img
                    src={currentSubject.image}
                    alt={currentSubject.title}
                    className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500 rounded-2xl" />

                  {/* Flip Indicator (Front) */}
                  <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg text-[#419CB8] opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-0 md:translate-y-2 group-hover:translate-y-0 z-20">
                    <RiRepeatLine className="w-5 h-5" />
                  </div>
                </div>
              ) : (
                <div className="w-full h-full bg-sky-50 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-sky-200 group">
                  <div className="mb-6 text-[#419CB8] p-6 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform duration-500">
                    {currentSubject.icon}
                  </div>
                  <p className="text-[#419CB8] font-bold text-xl tracking-tight uppercase text-center">Subject Preview Image</p>
                  <p className="text-gray-400 text-sm mt-2">Click to reveal details</p>
                </div>
              )}
            </div>

            {/* Back Side: Description Content */}
            <div className="absolute inset-0 backface-hidden back-side-flip bg-white rounded-[2rem] p-6 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col justify-center overflow-hidden group">
              {/* Flip Indicator (Back) */}
              <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-sky-50 p-2 md:p-3 rounded-full shadow-sm text-[#419CB8] group-hover:scale-110 transition-transform duration-300">
                <RiRepeatLine className="w-4 h-4 md:w-5 h-5" />
              </div>

              <div key={`${activeSubject}-${isFlipped}`} className="h-full flex flex-col justify-center max-h-full overflow-y-auto scrollbar-hide py-2">
                <div className="mb-4 md:mb-8 text-[#419CB8] opacity-0 animate-fade-in-up [animation-delay:100ms] [animation-fill-mode:forwards]">
                  <span className="bg-sky-50 p-2 md:p-4 rounded-2xl inline-block">
                    {currentSubject.icon}
                  </span>
                </div>

                <h2 className="text-xl md:text-4xl font-black text-gray-900 mb-3 md:mb-8 uppercase tracking-tight leading-none opacity-0 animate-fade-in-up [animation-delay:200ms] [animation-fill-mode:forwards] hd-text">
                  {currentSubject.title}
                </h2>

                <div className="text-slate-900 font-semibold text-sm md:text-lg leading-relaxed max-w-xl opacity-0 animate-fade-in-up [animation-delay:300ms] [animation-fill-mode:forwards] hd-text antialiased text-justify">
                  {currentSubject.description}
                </div>

                {/* Removed View Course Details per request to keep it purely static/front-end focused */}
              </div>
            </div>
          </div>
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
          /* Force GPU rendering for sharpness */
          transform: translate3d(0, 0, 0);
          -webkit-transform: translate3d(0, 0, 0);
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
          -webkit-transform: rotateY(180deg);
        }
        
        /* High-Definition 3D positioning */
        .back-side-flip {
          transform: rotateY(180deg) translateZ(1px);
          -webkit-transform: rotateY(180deg) translateZ(1px);
          will-change: transform;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(15px) translateZ(0);
          }
          to {
            opacity: 1;
            transform: translateY(0) translateZ(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .hd-text {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: geometricPrecision;
          /* Force Chrome to render text sharply on transformed elements with subpixel positioning */
          transform: translate3d(0, 0, 0) scale(1.0001);
          will-change: transform;
          letter-spacing: 0.01em;
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
