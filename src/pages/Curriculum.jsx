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

function RoadmapItem({ subject, index, isActive, isFirst, isLast, progress = 0, showTip }) {
  const isEven = index % 2 === 0;

  // Calculate segment fills based on progress (0-1)
  // Progress 0-0.5 fills top half, 0.5-1 fills bottom half
  const topFill = Math.min(100, progress * 200);
  const bottomFill = Math.max(0, (progress - 0.5) * 200);

  return (
    <div className="relative w-full min-h-[400px] md:min-h-[600px] flex items-center justify-center py-12 md:py-24 group">
      
      {/* Connector Lines (Vertical) */}
      <div className={`absolute left-[24px] md:left-1/2 -translate-x-1/2 w-[4px] md:w-[8px] z-0 ${isFirst ? 'top-1/2 bottom-0' : isLast ? 'top-0 h-1/2' : 'top-0 bottom-0'}`}>
        {/* Gray Background Line */}
        <div className="absolute inset-0 bg-gray-100/50" />
        
        {/* Blue Progress Line (Smooth + Neon Glow) */}
        <div 
          className="absolute top-0 left-0 right-0 bg-[#419CB8] transition-all duration-300 ease-out z-10 shadow-[0_0_20px_rgba(65,156,184,0.6)]" 
          style={{ height: progress >= 0.99 ? '101%' : `${progress * 100}%` }}
        />

        {/* Glowing Tip (Neon Circle - Improved Visibility) */}
        {showTip && (
          <div 
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 bg-white rounded-full z-30 shadow-[0_0_15px_#419CB8,0_0_30px_#419CB8,0_0_50px_#419CB8] border-2 border-white"
            style={{ 
              top: `${progress * 100}%`,
              filter: 'drop-shadow(0 0 10px #419CB8)'
            }}
          />
        )}
      </div>

      {/* Central Road Node (Neon Enhanced) */}
      <div className="absolute left-[24px] md:left-1/2 -translate-x-1/2 z-30 transition-all duration-700">
        <div className={`w-6 h-6 md:w-10 md:h-10 rounded-full border-4 transition-all duration-700 
          ${(isFirst && progress > 0) || (isLast && progress > 0.9) || (!isFirst && !isLast && progress > 0.5) 
            ? 'bg-[#419CB8] border-white scale-125 md:scale-150 shadow-[0_0_30px_rgba(65,156,184,0.8),0_0_60px_rgba(65,156,184,0.4)]' 
            : 'bg-gray-200 border-white shadow-none'}`} 
        />
        {((isFirst && progress > 0) || (isLast && progress > 0.9) || (!isFirst && !isLast && progress > 0.5)) && (
          <div className="absolute inset-0 rounded-full bg-[#419CB8] animate-ping opacity-30 blur-[2px]" />
        )}
      </div>

      {/* MOBILE VIEW - UNIFIED CARD (Reference Design) */}
      <div className="md:hidden w-full px-6 relative z-10 pl-16">
        {/* Horizontal Connection Line for Mobile */}
        <div className={`absolute left-[24px] top-1/2 -translate-y-1/2 w-10 h-[2px] bg-[#419CB8] transition-all duration-700 ${isActive ? 'opacity-100' : 'opacity-0'}`} />

        <div className={`w-full bg-white rounded-md shadow-[0_30px_60px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden transition-all duration-1000 transform ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'} min-h-[480px] flex flex-col`}>
          {/* Mobile Image (Top) */}
          <div className="relative w-full h-[220px] overflow-hidden">
            {subject.image && (
              <img
                src={subject.image}
                alt={subject.title}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-xl p-3 rounded-md border border-white/30 text-white shadow-2xl z-20">
              {subject.icon}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
          </div>

          {/* Mobile Content (Bottom) */}
          <div className="p-8 flex flex-col gap-4 flex-grow">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[2px] bg-[#419CB8] rounded-full" />
              <span className="text-[#419CB8] font-black tracking-[0.4em] uppercase text-[9px]">
                Step 0{index + 1}
              </span>
            </div>
            <h3 className="font-['Space_Grotesk'] font-black text-2xl text-[#1e293b] uppercase tracking-tighter leading-none">
              {subject.title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed font-medium text-justify opacity-90">
              {subject.description}
            </p>
          </div>
        </div>
      </div>

      {/* DESKTOP VIEW - SPLIT ALTERNATING LAYOUT */}
      <div className="hidden md:flex w-full max-w-7xl px-6 md:px-12 lg:px-16 flex-row items-stretch md:justify-between relative z-10 pl-16 md:pl-0">

        {/* Left Side (Description for Even, Image for Odd) */}
        <div className={`w-full md:w-[44%] transition-all duration-1000 transform ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16 md:-translate-x-32'} order-2 md:order-1`}>
          {isEven ? (
            /* Description Panel on Left */
            <div className="bg-white p-8 md:p-12 lg:p-14 rounded-md shadow-[0_40px_80px_rgba(0,0,0,0.06)] border border-gray-100/50 flex flex-col justify-center h-full md:min-h-[550px]">
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-[2px] bg-[#419CB8] rounded-full" />
                  <span className="text-[#419CB8] font-black tracking-[0.4em] uppercase text-[10px] md:text-xs">
                    Step 0{index + 1}
                  </span>
                </div>
                <h3 className="font-['Space_Grotesk'] font-black text-2xl md:text-3xl lg:text-5xl text-[#1e293b] uppercase tracking-tighter leading-none mb-2">
                  {subject.title}
                </h3>
                <p className="text-gray-500 text-sm md:text-lg lg:text-xl leading-relaxed font-medium text-justify opacity-90">
                  {subject.description}
                </p>
              </div>
            </div>
          ) : (
            /* Image Panel on Left */
            <div className="relative w-full md:min-h-[550px] h-full overflow-hidden rounded-md shadow-[0_40px_80px_rgba(0,0,0,0.08)] border border-gray-100">
              {subject.image && (
                <div className="absolute inset-0">
                  <img
                    src={subject.image}
                    alt={subject.title}
                    className="w-full h-full object-cover transition-transform duration-[5s] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                </div>
              )}
              <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-xl p-4 rounded-md border border-white/30 text-white shadow-2xl z-20">
                {subject.icon}
              </div>
            </div>
          )}
        </div>

        {/* Right Side (Image for Even, Description for Odd) */}
        <div className={`w-full md:w-[44%] transition-all duration-1000 transform ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16 md:translate-x-32'} order-1 md:order-3`}>
          {!isEven ? (
            /* Description Panel on Right */
            <div className="bg-white p-8 md:p-12 lg:p-14 rounded-md shadow-[0_40px_80px_rgba(0,0,0,0.06)] border border-gray-100/50 flex flex-col justify-center h-full md:min-h-[550px]">
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-[2px] bg-[#419CB8] rounded-full" />
                  <span className="text-[#419CB8] font-black tracking-[0.4em] uppercase text-[10px] md:text-xs">
                    Step 0{index + 1}
                  </span>
                </div>
                <h3 className="font-['Space_Grotesk'] font-black text-2xl md:text-3xl lg:text-5xl text-[#1e293b] uppercase tracking-tighter leading-none mb-2">
                  {subject.title}
                </h3>
                <p className="text-gray-500 text-sm md:text-lg lg:text-xl leading-relaxed font-medium text-justify opacity-90">
                  {subject.description}
                </p>
              </div>
            </div>
          ) : (
            /* Image Panel on Right */
            <div className="relative w-full md:min-h-[550px] h-full overflow-hidden rounded-md shadow-[0_40px_80px_rgba(0,0,0,0.08)] border border-gray-100">
              {subject.image && (
                <div className="absolute inset-0">
                  <img
                    src={subject.image}
                    alt={subject.title}
                    className="w-full h-full object-cover transition-transform duration-[5s] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                </div>
              )}
              <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-xl p-4 rounded-md border border-white/30 text-white shadow-2xl z-20">
                {subject.icon}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}



function Curriculum() {
  const [activeIndices, setActiveIndices] = useState([]);
  const [milestoneRatios, setMilestoneRatios] = useState({});
  const containerRef = useRef(null);

  const subjects = [
    {
      id: "freshman",
      title: "The Freshman",
      description: "Where it all begins. Your first day as a Computer Engineering student (CpE). A step into the world of logic, circuit boards, and the promise of becoming a master architect of technology.",
      icon: <RiUserFollowLine className="w-8 h-8 md:w-10 md:h-10" />,
      image: "/assets/Freshman.png"
    },
    {
      id: "programming",
      title: "Programming",
      description: "This subject introduces the fundamental logic and syntax used to communicate with computers. You will learn how to write, test, and debug code to solve problems, laying the essential foundation needed for all future software and hardware-interfacing tasks.",
      icon: <RiCodeSSlashLine className="w-8 h-8 md:w-10 md:h-10" />,
      image: "/assets/Programming.png"
    },
    {
      id: "rnd",
      title: "Research and Development",
      description: "Focuses on the systematic investigation required to innovate, create new technologies, or improve existing systems. It challenges you to apply theoretical knowledge to practical problems, guiding you through the process of designing experiments, prototyping solutions, and documenting your findings.",
      icon: <RiLightbulbLine className="w-8 h-8 md:w-10 md:h-10" />,
      image: "/assets/RND.png"
    },
    {
      id: "software-eng",
      title: "Software Engineering",
      description: "This covers the systematic methodologies used to design, develop, test, and maintain large-scale software systems. It moves beyond simple coding to focus on project lifecycles, architecture design, and building scalable, reliable applications from the ground up.",
      icon: <RiArchiveDrawerLine className="w-8 h-8 md:w-10 md:h-10" />,
      image: "/assets/software Engineering.png"
    },
    {
      id: "ai",
      title: "Artificial Intelligence",
      description: "This field explores how to create systems capable of performing tasks that typically require human intelligence. You will study algorithms, machine learning concepts, and data processing to understand how models learn from data, adapt, and make automated decisions.",
      icon: <RiRobot3Line className="w-8 h-8 md:w-10 md:h-10" />,
      image: "/assets/Artificial Intelligence.png"
    },
    {
      id: "ojt",
      title: "On-the-Job Training",
      description: "This provides practical, real-world experience by placing you in a professional working environment. It bridges the gap between classroom theory and industry practice, allowing you to apply your technical skills to actual workplace projects and understand professional workflows.",
      icon: <RiBriefcaseLine className="w-8 h-8 md:w-10 md:h-10" />,
      image: "/assets/ojt.png"
    },
    {
      id: "microprocessors",
      title: "Microprocessors",
      description: "This course dives deep into the central processing unit (CPU) of a computer. You will learn about instruction sets, memory interfacing, and how hardware and software interact at the lowest level to execute commands and process data.",
      icon: <MdMemory className="w-8 h-8 md:w-10 md:h-10" />,
      image: "/assets/microprocessors.png"
    },
    {
      id: "networking",
      title: "Networking and Cyber Security",
      description: "This subject explores how computers connect and communicate, covering essential concepts like the OSI model, data link layers, and network protocols. It also emphasizes the strategies, cryptographic principles, and technologies used to protect these networks and sensitive data from unauthorized access and attacks.",
      icon: <RiShieldKeyholeLine className="w-8 h-8 md:w-10 md:h-10" />,
      image: "/assets/networking and Cyber Security.png"
    },
    {
      id: "web-design",
      title: "Web Design & Development",
      description: "This covers the creation and maintenance of websites and web applications. You will learn both frontend design for user interfaces and backend logic for server-side operations and database integration, enabling you to build fully functional, interactive web platforms.",
      icon: <RiGlobalLine className="w-8 h-8 md:w-10 md:h-10" />,
      image: "/assets/Web design and development.png"
    },
    {
      id: "emerging-tech",
      title: "Emerging Technologies in CpE",
      description: "This subject keeps you up-to-date with the latest, rapidly evolving advancements in the tech industry. It explores cutting-edge tools, frameworks, and hardware concepts that are currently shaping the future of computer engineering, preparing you to adapt to new industry trends.",
      icon: <RiRocket2Line className="w-8 h-8 md:w-10 md:h-10" />,
      image: "/assets/Emerging Technologies in CpE.png"
    },
    {
      id: "computer-arch",
      title: "Computer Architecture & Organization",
      description: "This looks at the internal workings of a computer system, focusing on how its physical components (like memory, ALUs, and control units) are structured and interact. You will learn how digital logic and Boolean algebra translate into the physical computing power that runs software.",
      icon: <RiCpuLine className="w-8 h-8 md:w-10 md:h-10" />,
      image: "/assets/Computer architechture and organization.png"
    },
    {
      id: "robotics",
      title: "Robotics",
      description: "This interdisciplinary field combines hardware design, electronics, and programming to create automated machines. You will learn how to integrate microcontrollers and sensors with mechanical systems to build robots that can perceive and interact with their physical environment.",
      icon: <RiRobot2Line className="w-8 h-8 md:w-10 md:h-10" />,
      image: "/assets/Robotics.png"
    },
    {
      id: "certified",
      title: "Certified Computer Engineer",
      description: "Mastery achieved. You are now a licensed and certified Computer Engineer, fully equipped to design, build, and innovate at the intersection of hardware and software.",
      icon: <RiAwardLine className="w-8 h-8 md:w-10 md:h-10" />,
      image: "/assets/certified.png"
    }
  ];

  useEffect(() => {
    // Preload images
    subjects.forEach((subject) => {
      if (subject.image) {
        const img = new Image();
        img.src = subject.image;
      }
    });

    // High-Precision Scroll Tracking for Roadmap Line
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const viewportCenter = window.innerHeight / 2;
      const milestoneElements = containerRef.current.querySelectorAll('.roadmap-milestone');
      
      milestoneElements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        
        // Calculate progress based on screen center (0 to 1)
        // 0 when the milestone top enters center screen
        // 1 when the milestone bottom reaches center screen
        let progress = (viewportCenter - rect.top) / rect.height;
        progress = Math.max(0, Math.min(1, progress));

        // Update discrete reveal state for cards
        if (progress > 0.1) {
          setActiveIndices(prev => [...new Set([...prev, index])].sort((a, b) => a - b));
        }

        // Update continuous ratio state - keeping MAX seen for "one-way" progress
        setMilestoneRatios(prev => {
          if ((prev[index] || 0) >= progress) return prev;
          return { ...prev, [index]: progress };
        });
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [subjects.length]);

  return (
    <div className="bg-[#fcfcfc] min-h-screen pt-20 md:pt-40 overflow-hidden scroll-smooth">
      {/* Cinematic Header Section */}
      <div className="max-w-7xl mx-auto px-6 mb-16 md:mb-32 text-center relative z-10">
        <div className="inline-flex flex-col items-center relative py-10 md:py-20 w-full">
          {/* Background Image Container with Gradient Fade */}
          <div className="absolute inset-0 -z-10 w-full h-full overflow-hidden">
            <img
              src="/assets/bg.png"
              alt=""
              className="w-full h-full object-cover opacity-30 mix-blend-multiply transition-opacity duration-1000"
              id="header-bg-image"
            />
            {/* Radial Gradient to clear the center for text */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-white/80 via-white/40 to-transparent" />
          </div>
          
          <div className="mb-6 flex items-center justify-center gap-4 bg-white/80 px-6 py-2.5 rounded-full border border-[#419CB8]/20 text-[#419CB8] backdrop-blur-xl shadow-sm z-20">
            <RiInformationLine className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em]">Curriculum Roadmap</span>
          </div>
          <h1 className="font-black tracking-tighter uppercase font-['Space_Grotesk'] text-4xl md:text-8xl lg:text-[10rem] text-[#1e293b] leading-[0.85] mb-6 drop-shadow-[0_4px_12px_rgba(255,255,255,0.8)] z-20">
            CORE <span className="text-[#419CB8]">JOURNEY</span>
          </h1>
          <p className="font-medium tracking-[0.2em] md:tracking-[0.4em] uppercase text-gray-500 text-xs md:text-xl max-w-2xl text-center bg-white/30 backdrop-blur-sm rounded-lg px-4 py-1 z-20">
            Bridging Academic Excellence with Professional Mastery
          </p>
        </div>
      </div>

      <div ref={containerRef} className="relative w-full max-w-screen-2xl mx-auto pb-48 md:pb-96">
        <div className="relative z-10 flex flex-col">
          {subjects.map((subject, idx) => {
            const ratio = milestoneRatios[idx] || 0;
            // A simple logic: if a milestone *after* this one has any progress, this one is 100% full
            const isCompleted = Object.entries(milestoneRatios).some(([id, r]) => parseInt(id) > idx && r > 0);
            const progress = isCompleted ? 1 : ratio;

            // Only show glow-tip on the CURRENT front of the line
            const isLastActive = idx === (activeIndices.length > 0 ? Math.max(...activeIndices) : -1);

            return (
              <div key={subject.id} data-index={idx} className="roadmap-milestone">
                <RoadmapItem
                  subject={subject}
                  index={idx}
                  isActive={activeIndices.includes(idx)}
                  isFirst={idx === 0}
                  isLast={idx === subjects.length - 1}
                  progress={progress}
                  showTip={isLastActive && progress < 1 && progress > 0}
                />
              </div>
            );
          })}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .hd-text {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          letter-spacing: -0.01em;
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