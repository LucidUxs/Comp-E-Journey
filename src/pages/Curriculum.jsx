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
  const isEven = index % 2 === 0;

  return (
    <div className={`relative w-full min-h-[400px] md:min-h-[600px] flex items-center justify-center py-16 md:py-28 group`}>
      
      {/* Central Road Node */}
      <div className="absolute left-[24px] md:left-1/2 -translate-x-1/2 z-30 transition-all duration-700">
        <div className={`w-6 h-6 md:w-10 md:h-10 rounded-full border-4 border-white shadow-2xl transition-all duration-700 ${isActive ? 'bg-[#419CB8] scale-125 md:scale-150 shadow-[0_0_40px_rgba(65,156,184,0.8)]' : 'bg-gray-200'}`} />
        {isActive && (
          <div className="absolute inset-0 rounded-full bg-[#419CB8] animate-ping opacity-20" />
        )}
      </div>

      {/* Horizontal Connection Stem (Connecting Road to Content) */}
      <div 
        className={`absolute left-[24px] md:left-1/2 top-1/2 -translate-y-1/2 z-20 transition-all duration-1000 origin-left ease-out ${isActive ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          width: 'calc(10% + 20px)', // Gap + offset
          transform: isEven ? 'translateX(20px)' : 'translateX(-100%) translateX(-20px)'
        }}
      >
        <div className={`h-[2px] bg-gradient-to-r from-[#419CB8] to-[#419CB8]/20 w-full`} />
      </div>

      {/* Spacious Side-by-Side Content Container */}
      <div className={`w-full max-w-screen-2xl px-12 md:px-24 flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-32 relative z-10`}>
        
        {/* Spacer for the Road Area (Ensuring a gap) */}
        <div className="hidden md:block w-1/2" />

        {/* COMPACT SIDE-BY-SIDE CARD */}
        <div className={`w-full md:w-1/2 transition-all duration-1000 transform ${isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-48 scale-90'}`}>
          <div className="relative w-full bg-white rounded-[3.5rem] shadow-[0_60px_120px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden flex flex-col lg:flex-row items-stretch min-h-[420px]">
            
            {/* Image Side (Balanced 50%) */}
            <div className={`w-full lg:w-1/2 h-[220px] lg:h-auto relative overflow-hidden shrink-0 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
              {subject.image && (
                <div className="absolute inset-0">
                  <img
                    src={subject.image}
                    alt={subject.title}
                    className="w-full h-full object-cover transition-transform duration-[5s] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-30" />
                </div>
              )}
              <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-xl p-4 rounded-2xl border border-white/30 text-white shadow-2xl z-20">
                {subject.icon}
              </div>
            </div>

            {/* Description Side (Balanced 50%) */}
            <div className={`w-full lg:w-1/2 p-10 md:p-12 flex flex-col justify-center bg-white ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-[3px] bg-[#419CB8] rounded-full shadow-[0_0_15px_rgba(65,156,184,0.4)]" />
                  <span className="text-[#419CB8] font-black tracking-[0.7em] uppercase text-[10px] md:text-[11px]">
                    Step 0{index + 1}
                  </span>
                </div>

                <h3 className="font-['Space_Grotesk'] font-black text-3xl md:text-5xl text-[#1e293b] uppercase tracking-tighter leading-[0.85] mb-2">
                  {subject.title}
                </h3>
                
                <p className="text-gray-500 text-sm md:text-xl leading-relaxed font-medium text-justify hd-text opacity-95 line-clamp-4 md:line-clamp-none">
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
  const [activeIndices, setActiveIndices] = useState([]);
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
  }, [subjects.length]);

  return (
    <div className="bg-[#fcfcfc] min-h-screen pt-24 md:pt-40 overflow-hidden scroll-smooth">
      {/* Cinematic Header Section */}
      <div className="max-w-7xl mx-auto px-6 mb-20 md:mb-32 text-center relative z-10">
        <div className="inline-flex flex-col items-center">
          <div className="mb-3 flex items-center justify-center gap-4 bg-[#419CB8]/5 px-6 py-2 rounded-full border border-[#419CB8]/10 text-[#419CB8] backdrop-blur-sm">
            <RiInformationLine className="w-6 h-6" />
            <span className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em]">Curriculum Roadmap</span>
          </div>
          <h1 className="font-black tracking-tighter uppercase font-['Space_Grotesk'] text-5xl md:text-8xl lg:text-[10rem] text-[#1e293b] leading-[0.85] mb-4">
            CORE <span className="text-[#419CB8]">JOURNEY</span>
          </h1>
          <p className="font-light tracking-[0.5em] uppercase text-gray-400 text-sm md:text-xl max-w-2xl text-center">
            Bridging Academic Excellence with Professional Mastery
          </p>
        </div>
      </div>

      <div ref={containerRef} className="relative w-full max-w-screen-2xl mx-auto pb-96">
        {/* Central Vertical Road Line */}
        <div className="absolute left-[24px] md:left-1/2 -translate-x-1/2 top-0 h-[calc(100%-480px)] w-[4px] md:w-[8px] bg-gray-100/50 z-0 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#419CB8] via-[#419CB8] to-[#419CB8]/10 shadow-[0_0_20px_rgba(65,156,184,0.4)] transition-all duration-1000 ease-out z-10"
            style={{
              height: activeIndices.length > 0
                ? `${((activeIndices[activeIndices.length - 1] + 1) / subjects.length) * 100}%`
                : '0%'
            }}
          />
        </div>

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