import { useState, useRef, useEffect } from 'react';
import { RiDragMoveLine, RiArrowLeftSLine, RiArrowRightSLine, RiDoubleQuotesL } from 'react-icons/ri';
import useScrollReveal from '../hooks/useScrollReveal';

const RESUME_DELAY = 2000;
const FRICTION = 0.92;       // Momentum decay per frame
const LONG_PRESS_MS = 350;   // Hold duration to trigger long-press pause

function ScrollingRow({ items, baseSpeed = 0.5, reverse = false }) {
  const containerRef = useRef(null);
  const wrapRef = useRef(null);
  const xPosRef = useRef(0);
  const velocityRef = useRef(0);
  const rafRef = useRef();
  const isDraggingRef = useRef(false);
  const isPausedRef = useRef(false);           // long-press pause
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const interactionEndTimeRef = useRef(0);
  const longPressTimerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const cardWidth = typeof window !== 'undefined' && window.innerWidth < 768 ? 240 : 300;
  const gap = typeof window !== 'undefined' && window.innerWidth < 768 ? 16 : 24;
  const totalWidth = (cardWidth + gap) * (items.length / 2);

  useEffect(() => {
    xPosRef.current = reverse ? -totalWidth : 0;
  }, [totalWidth, reverse]);

  useEffect(() => {
    const loop = () => {
      const now = Date.now();
      const timeSinceEnd = now - interactionEndTimeRef.current;

      if (!isDraggingRef.current && !isPausedRef.current) {
        if (timeSinceEnd > RESUME_DELAY) {
          // Gradually ramp velocity back to auto-scroll speed (lerp)
          const targetSpeed = reverse ? baseSpeed : -baseSpeed;
          velocityRef.current += (targetSpeed - velocityRef.current) * 0.04;
        } else {
          // Momentum decay after drag release
          velocityRef.current *= FRICTION;
        }
        xPosRef.current += velocityRef.current;
      }

      // Infinite loop wrap
      if (!reverse) {
        if (xPosRef.current <= -totalWidth) xPosRef.current += totalWidth;
        if (xPosRef.current > 0) xPosRef.current -= totalWidth;
      } else {
        if (xPosRef.current >= 0) xPosRef.current -= totalWidth;
        if (xPosRef.current < -totalWidth) xPosRef.current += totalWidth;
      }

      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(${xPosRef.current}px, 0, 0)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [totalWidth, reverse, baseSpeed]);

  // ─── Pointer Handlers ──────────────────────────────────────────
  const onStart = (clientX) => {
    isDraggingRef.current = true;
    lastXRef.current = clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;

    // Long-press timer
    longPressTimerRef.current = setTimeout(() => {
      isPausedRef.current = true;
      setIsPaused(true);
    }, LONG_PRESS_MS);
  };

  const onMove = (clientX) => {
    if (!isDraggingRef.current) return;
    const now = performance.now();
    const dt = Math.max(now - lastTimeRef.current, 1);
    const dx = clientX - lastXRef.current;

    // Velocity in px/frame (assuming 60fps)
    velocityRef.current = dx / (dt / 16.67);
    xPosRef.current += dx;

    lastXRef.current = clientX;
    lastTimeRef.current = now;

    // Cancel long-press if they actually moved
    if (Math.abs(dx) > 5 && longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  const onEnd = () => {
    isDraggingRef.current = false;
    interactionEndTimeRef.current = Date.now();
    clearTimeout(longPressTimerRef.current);
    longPressTimerRef.current = null;

    // Release long-press pause on lift
    if (isPausedRef.current) {
      isPausedRef.current = false;
      setIsPaused(false);
      interactionEndTimeRef.current = Date.now();
    }
  };

  // Prevent page scroll on touch drag
  const onTouchMove = (e) => {
    e.preventDefault();
    onMove(e.touches[0].clientX);
  };

  return (
    <div
      ref={wrapRef}
      className="relative flex cursor-grab active:cursor-grabbing select-none overflow-hidden py-6 md:py-8"
      onMouseDown={(e) => onStart(e.clientX)}
      onMouseMove={(e) => { if (isDraggingRef.current) onMove(e.clientX); }}
      onMouseUp={onEnd}
      onMouseLeave={onEnd}
      onTouchStart={(e) => onStart(e.touches[0].clientX)}
      onTouchMove={onTouchMove}
      onTouchEnd={onEnd}
      style={{ touchAction: 'none' }}
    >
      {/* Long-press pause badge */}
      <div className={`absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-black/70 backdrop-blur-sm text-white text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-full pointer-events-none transition-all duration-300 ${isPaused ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
        ⏸ Paused — Release to Resume
      </div>

      <div
        ref={containerRef}
        className="flex gap-4 md:gap-6 px-6"
        style={{ willChange: 'transform' }}
      >
        {items.map((career, idx) => (
          <div
            key={`${career.id}-${idx}`}
            className="inline-block relative w-[240px] md:w-[300px] h-[380px] md:h-[450px] rounded-[2rem] overflow-hidden group shadow-xl transition-all duration-500 hover:scale-105 bg-slate-900 shrink-0"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#00607a]/20 to-black/20 z-0" />
            {career.image && (
              <img
                src={career.image}
                alt={career.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 z-0"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent opacity-100 transition-opacity z-10" />

            <div className="absolute bottom-6 left-6 right-6 text-white whitespace-normal z-20">
              <h3 className="text-lg font-bold leading-tight mb-1 group-hover:text-[#419CB8] transition-colors uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {career.title}
              </h3>
              <p className="text-white font-medium tracking-wider uppercase text-[10px] opacity-70 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                {career.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TestimonialSection() {
  const testimonials = [
    {
      id: 1,
      name: 'Diosdado "Dado" Banatao',
      role: 'Prominent Filipino computer engineer and technologist',
      text: 'Developed the first single-chip 16-bit microprocessor in the 1970s, allowing for faster processing of data using graphics on smaller computer chips rather than larger circuit boards. This invention paved the way for graphics and visual commands on early computers.',
      image: '/assets/banatao.jpg',
      imageSource: 'Source: ICCP SBI Venture Partners'
    },
    {
      id: 2,
      name: 'Federico Faggin',
      role: 'Italian-American Physicist and Computer Engineer',
      text: 'Led the design of the Intel 4004 in 1971, the world\'s first commercial single-chip microprocessor. By integrating all the functions of a Central Processing Unit (CPU) onto a single piece of silicon, he shrunk the "brain" of a computer from multiple circuit boards down to a tiny chip, making the birth of the personal computer possible.',
      image: '/assets/Faggin.jpg',
      imageSource: 'Source: Kyoto Prize'
    },
    {
      id: 3,
      name: 'Mark Dean',
      role: 'American Computer Engineer and IBM Fellow',
      text: 'Co-invented the ISA bus in 1981, a hardware interface that allowed peripheral devices like disk drives, printers, and monitors to be plugged directly into the computer. This modular architecture made the IBM PC customizable and set the global standard for how modern computer hardware components communicate with each other.',
      image: '/assets/dean.jpg',
      imageSource: 'Source: Dimensions.'
    },
    {
      id: 4,
      name: 'Sophie Wilson',
      role: 'British Computer Scientist and Hardware Architect',
      text: 'Designed the ARM (Acorn RISC Machine) architecture in 1985, focusing on a "Reduced Instruction Set" that required significantly less power to operate. This breakthrough in chip efficiency is the reason modern mobile technology exists; today, her architecture powers over 95% of the world\'s smartphones and tablets.',
      image: '/assets/wilson.jpg',
      imageSource: 'Source: Computer History'
    },
    {
      id: 5,
      name: 'Fujio Masuoka',
      role: 'Japanese Electrical Engineer and Inventor',
      text: 'Invented Flash Memory (both NOR and NAND types) in 1984 while working at Toshiba. His engineering allowed for data to be stored permanently without needing a power source, leading to the invention of USB flash drives, SD cards, and the Solid State Drives (SSDs) that make modern laptops fast and durable.',
      image: '/assets/Masuoka.jpg',
      imageSource: 'Source: All About Circuits'
    },
    {
      id: 6,
      name: 'Seymour Cray',
      role: 'American Electrical Engineer and Supercomputer Architect',
      text: 'Developed the Cray-1 supercomputer in 1975, which implemented a unique "vector processing" hardware design. By using a C-shaped cabinet to minimize the length of internal wires, he pushed the limits of signal speed and cooling, allowing for the massive computational power used today in weather forecasting and scientific research.',
      image: '/assets/Cray.jpg',
      imageSource: 'Source: Wikipedia'
    },
    {
      id: 7,
      name: 'Jack Kilby',
      role: 'American Electrical Engineer and Nobel Laureate',
      text: 'Created the first working Integrated Circuit (IC) in 1958. He proved that resistors, capacitors, and transistors could all be manufactured from a single piece of semiconductor material. This eliminated the need to wire thousands of components by hand, allowing electronic devices to become smaller, more reliable, and mass-producible.',
      image: '/assets/kilby.jpg',
      imageSource: 'Source: Kyoto Prize'
    },
    {
      id: 8,
      name: 'Steve Wozniak',
      role: 'American Computer Engineer and Co-founder of Apple',
      text: 'Single-handedly designed the hardware and circuit boards for the Apple II in 1977. His "minimalist" engineering approach used significantly fewer chips than other computers of the time to produce high-resolution color graphics and sound, proving that a powerful computer could be small enough and affordable enough for a home desk.',
      image: '/assets/wozniak.jpg',
      imageSource: 'Source: Britannica'
    }
  ];

  const [sectionRef, sectionVisible] = useScrollReveal({ threshold: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const slideOffset = isMobile ? 296 : 424;

  const [isAnimating, setIsAnimating] = useState(false);

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500); // 500ms debounce match visual transition
  };
  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="mt-20 md:mt-32 max-w-[100vw] overflow-hidden relative pb-16 md:pb-32 pt-20 md:pt-32">
      <div
        ref={sectionRef}
        className={`max-w-7xl mx-auto px-6 relative z-10 reveal ${sectionVisible ? 'reveal-active' : ''}`}
      >
        <div className="flex flex-col md:flex-row gap-6 md:gap-0 items-center">

          {/* Left Column */}
          <div className="w-full md:w-1/3 pr-0 md:pr-8 flex flex-col justify-center">
            <h3 className="text-[#419CB8] tracking-[0.2em] font-bold text-sm uppercase mb-3 md:mb-4 text-center md:text-left">
              Testimonial
            </h3>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] mb-6 md:mb-8 text-center md:text-left">
              Computer Engineer's Success Stories
            </h2>
            {/* Desktop Navigation Buttons */}
            <div className="hidden md:flex gap-6 items-center justify-start mb-8">
              <button
                onClick={handlePrev}
                className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white border border-gray-100 flex items-center justify-center text-[#419CB8] hover:text-white hover:bg-[#419CB8] hover:shadow-[0_8px_20px_rgba(65,156,184,0.4)] hover:-translate-y-1 active:scale-95 transition-all duration-300 shadow-[0_4px_10px_rgba(0,0,0,0.05)]"
                aria-label="Previous Testimonial"
              >
                <RiArrowLeftSLine className="w-6 h-6 lg:w-8 lg:h-8" />
              </button>
              <button
                onClick={handleNext}
                className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white border border-gray-100 flex items-center justify-center text-[#419CB8] hover:text-white hover:bg-[#419CB8] hover:shadow-[0_8px_20px_rgba(65,156,184,0.4)] hover:-translate-y-1 active:scale-95 transition-all duration-300 shadow-[0_4px_10px_rgba(0,0,0,0.05)]"
                aria-label="Next Testimonial"
              >
                <RiArrowRightSLine className="w-6 h-6 lg:w-8 lg:h-8" />
              </button>
            </div>

            {/* Desktop Pagination Dots */}
            <div className="hidden md:flex gap-2.5 items-center justify-start mb-0">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all duration-300 rounded-full ${idx === currentIndex
                    ? 'w-6 h-1.5 bg-[#419CB8]'
                    : 'w-1.5 h-1.5 bg-gray-300 hover:bg-gray-400'
                    }`}
                  aria-label={`Go to sub-slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Column (Blue bg with cards) */}
          <div className="w-full md:w-2/3 relative mt-2 md:mt-0">
            {/* Circular faint backdrop */}
            <div className="absolute -inset-10 bg-[#f4f8fa] rounded-full z-0 pointer-events-none -left-4 md:-left-20 w-[120%] md:w-[600px] h-[400px] md:h-[600px] top-1/2 -translate-y-1/2 transition-transform duration-700 hover:scale-105"></div>

            <div
              className="bg-[#419CB8] rounded-[2rem] md:rounded-r-none md:rounded-l-[4rem] px-4 md:px-0 py-8 md:py-12 md:pr-12 md:pl-24 relative z-10 ml-0 md:-mr-[50vw] md:pr-[50vw] overflow-hidden shadow-2xl shadow-[#419CB8]/30 group"
            >
              <div
                className="flex gap-4 md:gap-6 w-max"
                style={{
                  transform: `translate3d(-${currentIndex * slideOffset}px, 0, 0)`,
                  transition: 'transform 600ms cubic-bezier(0.25, 1, 0.5, 1)',
                  willChange: 'transform'
                }}
              >
                {testimonials.map((testi, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <div
                      key={testi.id}
                      className={`relative w-[280px] md:w-[400px] shrink-0 rounded-[2rem] p-6 md:p-10 ${isActive
                        ? 'bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] scale-100 border-b-4 border-[#419CB8]'
                        : 'bg-white/20 scale-95 opacity-60 cursor-pointer hover:bg-white/30 hover:opacity-90 hover:scale-[0.98]'
                        }`}
                      style={{ transition: 'transform 600ms cubic-bezier(0.25,1,0.5,1), opacity 400ms ease, background-color 400ms ease' }}
                      onClick={() => !isActive && setCurrentIndex(idx)}
                    >
                      {/* Faint Quote Icon in background */}
                      <RiDoubleQuotesL className={`absolute top-6 right-6 w-24 h-24 transition-opacity duration-500 ${isActive ? 'text-gray-100 opacity-100' : 'text-white opacity-20'}`} />

                      <div className="relative z-10">
                        <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-8">
                          <div className={`w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden shrink-0 bg-gray-100 border-[3px] shadow-md flex items-center justify-center transition-colors duration-500 ${isActive ? 'border-[#419CB8]' : 'border-white'}`}>
                            {testi.image ? (
                              <img src={testi.image} alt={testi.name} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                            ) : (
                              <span className="text-[#419CB8] font-black text-3xl">{testi.name.charAt(0)}</span>
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className={`font-black text-lg md:text-xl leading-tight mb-1 transition-colors duration-500 ${isActive ? 'text-gray-900' : 'text-white'}`}>{testi.name}</h4>
                            <p className={`text-[10px] md:text-xs uppercase font-bold tracking-widest leading-snug transition-colors duration-500 ${isActive ? 'text-[#419CB8]' : 'text-white/70'}`}>
                              {testi.role}
                            </p>
                          </div>
                        </div>
                        <p className={`text-sm md:text-base leading-relaxed font-medium transition-colors duration-500 ${isActive ? 'text-gray-600' : 'text-white/95'}`}>
                          "{testi.text}"
                        </p>
                        {testi.imageSource && (
                          <p className={`mt-4 text-[10px] md:text-xs text-right italic font-medium tracking-wide transition-colors duration-500 ${isActive ? 'text-gray-400' : 'text-white/50'}`}>
                            {testi.imageSource}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile Pagination & Navigation */}
          <div className="flex md:hidden flex-col items-center justify-center mt-8 gap-8 w-full z-20">
            {/* Mobile Pagination Dots */}
            <div className="flex gap-3 items-center justify-center">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all duration-300 rounded-full ${idx === currentIndex
                    ? 'w-8 h-2 bg-[#419CB8]'
                    : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                  aria-label={`Go to sub-slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Mobile Navigation Buttons */}
            <div className="flex gap-6 items-center justify-center w-full">
              <button
                onClick={handlePrev}
                className="w-14 h-14 rounded-full bg-white border border-gray-100 flex items-center justify-center text-[#419CB8] hover:text-white hover:bg-[#419CB8] hover:shadow-[0_8px_20px_rgba(65,156,184,0.4)] hover:-translate-y-1 active:scale-95 transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.08)]"
                aria-label="Previous Testimonial"
              >
                <RiArrowLeftSLine className="w-8 h-8" />
              </button>
              <button
                onClick={handleNext}
                className="w-14 h-14 rounded-full bg-white border border-gray-100 flex items-center justify-center text-[#419CB8] hover:text-white hover:bg-[#419CB8] hover:shadow-[0_8px_20px_rgba(65,156,184,0.4)] hover:-translate-y-1 active:scale-95 transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.08)]"
                aria-label="Next Testimonial"
              >
                <RiArrowRightSLine className="w-8 h-8" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Careers() {
  const careers = [
    { id: 1, title: "AI Hardware Engineer", location: "Canada", image: "/assets/careers/AI Hardware Engineer..jpg" },
    { id: 2, title: "Quantum Systems Engineer", location: "Qatar", image: "/assets/careers/Quantum System Emgineer..jpg" },
    { id: 3, title: "Autonomous Vehicles Engineer", location: "Singapore", image: "/assets/careers/Autonomous Vehicle Engineer..jpg" },
    { id: 4, title: "Robotics Software Engineer", location: "UAE", image: "/assets/careers/Robotics Software Engineer..jpg" },
    { id: 5, title: "Neuro-morphic Architect", location: "Europe", image: "/assets/careers/neuro-morphic engineer.jpg" },
    { id: 6, title: "Network Security Analyst", location: "Japan", image: "/assets/careers/network security analyst..jpg" },
    { id: 7, title: "Cloud-Integrated Bio-Engineer", location: "Korea", image: "/assets/careers/cloud integrated bio-engineer..jpg" },
    { id: 8, title: "IOT Architect", location: "Product Designer", image: "/assets/careers/iot architech..jpg" },
    { id: 9, title: "VR/AR Hardware Development", location: "Product Designer", image: "/assets/careers/vrar hardware development..jpg" },
    { id: 10, title: "Embedded Systems Engineer", location: "USA", image: "/assets/careers/embedded system engineer..jpg" },
    { id: 11, title: "Hardware Verification Engineer", location: "Germany", image: "/assets/careers/Hardware verification engineer...jpg" },
    { id: 12, title: "Digital Signal Processing Engineer", location: "Israel", image: "/assets/careers/Digital signal processing engineer...jpg" }
  ];

  const [headerRef, headerVisible] = useScrollReveal({ threshold: 0.1 });
  const [row1Ref, row1Visible] = useScrollReveal({ threshold: 0.05 });
  const [row2Ref, row2Visible] = useScrollReveal({ threshold: 0.05 });

  const topRow = [...careers.slice(0, 6), ...careers.slice(0, 6)];
  const bottomRow = [...careers.slice(6, 12), ...careers.slice(6, 12)];

  return (
    <div className="bg-[#fcfcfc] min-h-screen py-24 overflow-hidden relative">
      {/* Page Header */}
      <div ref={headerRef} className={`max-w-7xl mx-auto px-6 mb-12 md:mb-20 text-center reveal ${headerVisible ? 'reveal-active' : ''}`}>
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter mb-4">
          COMPUTER <span className="text-[#419CB8]">ENGINEER</span>
        </h1>
        <p className="text-gray-400 font-medium tracking-widest uppercase text-xs mb-8 md:mb-12">
          Career Paths
        </p>
      </div>

      {/* Infinite Sliders Wrapper */}
      <div className="flex flex-col gap-12 relative bg-[#EEEEEE] py-12 md:py-24 mb-20 md:mb-32">
        {/* Swipe Indicator + Row 1 */}
        <div ref={row1Ref} className={`flex flex-col gap-4 reveal ${row1Visible ? 'reveal-active' : ''}`} style={{ transitionDelay: '150ms' }}>
          <div className="md:hidden flex flex-col items-center gap-2 pointer-events-none animate-bounce opacity-50">
            <RiDragMoveLine className="w-8 h-8 text-[#419CB8]" />
            <span className="text-[10px] font-black uppercase text-[#419CB8] tracking-widest">Swipe to Explore</span>
          </div>
          <ScrollingRow items={topRow} baseSpeed={0.8} />
        </div>

        {/* Row 2 */}
        <div ref={row2Ref} className={`reveal ${row2Visible ? 'reveal-active' : ''}`} style={{ transitionDelay: '300ms' }}>
          <ScrollingRow items={bottomRow} baseSpeed={0.5} reverse={true} />
        </div>
      </div>

      <TestimonialSection />

      <style dangerouslySetInnerHTML={{
        __html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes swipeHint {
          0%, 100% { transform: translateX(-10px); }
          50% { transform: translateX(10px); }
        }
        
        img {
          -webkit-font-smoothing: antialiased;
          image-rendering: -webkit-optimize-contrast;
        }
      `}} />
    </div>
  );
}

export default Careers;
