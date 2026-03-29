import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';
const heroImg = '/assets/hero_students.png';
const breadboardImg = '/assets/breadboard.png';
const heroHardwareImg = '/assets/hero_hardware.png';
const extraImg1 = '/assets/image.jpg';
const extraImg2 = '/assets/team-software-engineers-doing-brainstorming-office.jpg';
import { HiChevronLeft, HiChevronRight, HiOutlineLightBulb, HiLightBulb, HiPlay, HiOutlineCpuChip, HiOutlineCodeBracket, HiOutlineCog6Tooth, HiOutlineGlobeAlt, HiOutlineArrowsRightLeft } from 'react-icons/hi2';
import { GiLogicGateAnd, GiLogicGateOr, GiLogicGateNot } from 'react-icons/gi';
import { VscRunAll, VscCheck, VscError } from 'react-icons/vsc';

export default function Home() {
    const [activeHeroIdx, setActiveHeroIdx] = useState(0);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
    const [isHoveringHero, setIsHoveringHero] = useState(false);

    useEffect(() => {
        let timeoutId;
        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setWindowWidth(window.innerWidth);
            }, 150);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timeoutId);
        };
    }, []);

    // Auto-advance every 1 second, pause on hover
    useEffect(() => {
        if (isHoveringHero) return;
        const timer = setInterval(() => {
            setActiveHeroIdx((prev) => (prev + 1) % heroImages.length);
        }, 2000);
        return () => clearInterval(timer);
    }, [isHoveringHero]);

    const heroImages = [heroImg, extraImg1, extraImg2, heroHardwareImg];

    const nextHeroImage = (e) => {
        e.preventDefault();
        setActiveHeroIdx((prev) => (prev + 1) % heroImages.length);
    };

    const prevHeroImage = (e) => {
        e.preventDefault();
        setActiveHeroIdx((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    };

    const getPosition = (idx) => {
        return (idx - activeHeroIdx + heroImages.length) % heroImages.length;
    };


    const [gateType, setGateType] = useState('AND');
    const [inputA, setInputA] = useState(1);
    const [inputB, setInputB] = useState(1);
    const [showLogicInfo, setShowLogicInfo] = useState(false);
    const [showProgInfo, setShowProgInfo] = useState(false);

    // Programming Interactive State
    const [codeLang, setCodeLang] = useState('cpp');
    const [userCode, setUserCode] = useState('');
    const [runStatus, setRunStatus] = useState('idle'); // idle, success, error

    // Scroll Reveal Refs
    const [logicRef, logicVisible] = useScrollReveal();
    const [bridgeRef, bridgeVisible] = useScrollReveal();
    const [progRef, progVisible] = useScrollReveal();
    const [pillarsRef, pillarsVisible] = useScrollReveal();
    const [ctaRef, ctaVisible] = useScrollReveal();

    const codePuzzles = {
        cpp: {
            title: 'Output & Variables',
            prefix: 'int score = 100;\nstd::cout << ',
            suffix: ';',
            answer: 'score',
            expectedOutput: '100',
            display: 'main.cpp'
        },
        python: {
            title: 'String Operations',
            prefix: 'course = "CompE";\nprint("Hello, " + ',
            suffix: ')',
            answer: 'course',
            expectedOutput: 'Hello, CompE',
            display: 'main.py'
        }
    };

    const handleRunCode = () => {
        if (userCode.trim() === codePuzzles[codeLang].answer) {
            setRunStatus('success');
        } else {
            setRunStatus('error');
        }
        setTimeout(() => setRunStatus('idle'), 3000);
    };

    let output = false;
    if (gateType === 'AND') output = inputA && inputB;
    else if (gateType === 'OR') output = inputA || inputB;
    else if (gateType === 'NOT') output = !inputA;

    const outputState = output ? 'HIGH' : 'LOW';

    const gateDescriptions = {
        AND: 'OUTPUT IS 1 ONLY IF BOTH\nINPUTS ARE 1.',
        OR: 'OUTPUT IS 1 IF AT LEAST\nONE INPUT IS 1.',
        NOT: 'OUTPUT IS INVERTED\nFROM INPUT A.'
    };

    return (
        <div className="w-full font-sans text-gray-800">
            {/* Hero Section */}
            <section className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between py-24 px-6 gap-16">
                <div className="max-w-lg">
                    <h1 className="text-5xl lg:text-[5.5rem] font-black tracking-tight leading-[0.9] mb-6">
                        COMPUTER <br />
                        <span className="text-[#419CB8]">ENGINEERING</span>
                    </h1>
                    <p className="text-gray-500 text-sm mb-10 leading-relaxed pr-8 text-justify">
                        Computer Engineering is a discipline focused on the design, development, and improvement of computer systems and digital technologies. It involves understanding how computers work at every level—from small electronic components to complex software systems—and applying that knowledge to create reliable, efficient, and innovative solutions. As freshmen in this field, you will begin exploring the principles that power modern devices, intelligent systems, and the technologies shaping the future.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link to="/curriculum" className="bg-[#00607a] hover:bg-[#004e63] text-white px-8 py-3.5 rounded-sm font-bold text-[10px] tracking-wider transition-colors uppercase flex items-center gap-3">
                            EXPLORE THE JOURNEY <span>→</span>
                        </Link>
                        <Link to="/partners" className="bg-gray-50 hover:bg-[#FFF1DC] text-[#00607a] px-8 py-3.5 rounded-sm font-bold text-[10px] tracking-wider transition-colors uppercase">
                            LEARN MORE
                        </Link>
                    </div>
                </div>
                <div
                    className="w-full lg:w-full relative group z-10"
                    onMouseEnter={() => setIsHoveringHero(true)}
                    onMouseLeave={() => setIsHoveringHero(false)}
                >
                    {/* Tilted wrapper — buttons & images share this transform */}
                    <div
                        className="w-full relative transition-transform duration-700"
                        style={{
                            transform: windowWidth < 768
                                ? 'none'
                                : windowWidth < 1024
                                    ? 'perspective(1000px) rotateY(-8deg)'
                                    : 'perspective(1000px) rotateY(-14deg)'
                        }}
                    >
                        <div className="w-full aspect-4/3 relative">
                            {heroImages.map((img, idx) => {
                                const pos = getPosition(idx);
                                const isMobile = windowWidth < 768;
                                const isTablet = windowWidth < 1024;

                                let translateAdd = "";
                                let optClasses = "";
                                let zIdx = 0;

                                if (pos === 0) {
                                    translateAdd = "translateZ(0px) translateX(0px) translateY(0px)";
                                    optClasses = "opacity-100 shadow-3xl";
                                    zIdx = 30;
                                } else if (pos === 1) {
                                    const tx = isMobile ? 6 : (isTablet ? 15 : 31);
                                    const ty = isMobile ? -22 : (isTablet ? 8 : 16);
                                    translateAdd = `translateZ(-30px) translateX(${tx}px) translateY(${ty}px)`;
                                    optClasses = "opacity-70 shadow-2xl pointer-events-none";
                                    zIdx = 20;
                                } else if (pos === 2) {
                                    const tx = isMobile ? 12 : (isTablet ? 30 : 62);
                                    const ty = isMobile ? -44 : (isTablet ? 16 : 32);
                                    translateAdd = `translateZ(-60px) translateX(${tx}px) translateY(${ty}px)`;
                                    optClasses = "opacity-40 shadow-xl pointer-events-none";
                                    zIdx = 10;
                                } else {
                                    const tx = isMobile ? 18 : (isTablet ? 45 : 93);
                                    const ty = isMobile ? -66 : (isTablet ? 24 : 48);
                                    translateAdd = `translateZ(-90px) translateX(${tx}px) translateY(${ty}px)`;
                                    optClasses = "opacity-0 shadow-lg pointer-events-none";
                                    zIdx = 0;
                                }

                                return (
                                    <img
                                        key={idx}
                                        src={img}
                                        alt={`Slide ${idx}`}
                                        className={`absolute inset-0 w-full h-full object-cover rounded-md transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${optClasses}`}
                                        style={{ zIndex: zIdx, transform: translateAdd }}
                                    />
                                );
                            })}

                            {/* Navigation Arrows — bare glowing icons, visible on hover only */}
                            <button
                                onClick={prevHeroImage}
                                aria-label="Previous Image"
                                className={`absolute left-2 top-1/2 -translate-y-1/2 z-50 text-white hover:text-[#419CB8] hover:scale-110 transition-all duration-300 ${isHoveringHero ? 'opacity-100' : 'opacity-0'}`}
                                style={{ filter: 'drop-shadow(0 0 8px rgba(65,156,184,0.9)) drop-shadow(0 2px 8px rgba(0,0,0,0.95))' }}
                            >
                                <HiChevronLeft className="w-14 h-14" />
                            </button>
                            <button
                                onClick={nextHeroImage}
                                aria-label="Next Image"
                                className={`absolute right-2 top-1/2 -translate-y-1/2 z-50 text-white hover:text-[#419CB8] hover:scale-110 transition-all duration-300 ${isHoveringHero ? 'opacity-100' : 'opacity-0'}`}
                                style={{ filter: 'drop-shadow(0 0 8px rgba(65,156,184,0.9)) drop-shadow(0 2px 8px rgba(0,0,0,0.95))' }}
                            >
                                <HiChevronRight className="w-14 h-14" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Logic Gates Section */}
            {/* Logic Gates Section */}
            <section ref={logicRef} className={`bg-[#f6f6f6] max-w-6xl mx-auto py-12 px-6 reveal ${logicVisible ? 'reveal-active' : ''}`}>

                <div className="mb-10">
                    <div className="flex flex-col mb-2">
                        <div className="flex items-center gap-3">
                            <h2 className="text-4xl font-bold tracking-tight">Digital Logic Gates</h2>
                            <div className="relative shrink-0 group/tip">
                                <button
                                    onClick={() => setShowLogicInfo(!showLogicInfo)}
                                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black transition-colors select-none cursor-pointer bg-gray-200 text-gray-500 hover:bg-[#419CB8] hover:text-white md:bg-gray-200 md:text-gray-500 md:group-hover/tip:bg-[#419CB8] md:group-hover/tip:text-white`}
                                >
                                    ?
                                </button>
                                <div className="pointer-events-none hidden md:block absolute md:left-[calc(100%+16px)] left-0 md:top-1/2 top-full md:-translate-y-1/2 mt-3 md:mt-0 w-[calc(100vw-3rem)] md:w-[450px] bg-gray-900 text-white text-[15px] leading-relaxed rounded-2xl px-8 py-7 shadow-2xl z-50 opacity-0 group-hover/tip:opacity-100 transition-opacity duration-200">
                                    <p className="font-black text-[18px] mb-3 text-[#419CB8] uppercase tracking-widest">Digital Logic Gates</p>
                                    <p>Logic Gates are the fundamental building blocks of digital circuits. They take binary inputs (0 or 1) and produce a single binary output based on a specific logical rule. By combining gates, engineers build processors, memory, and every digital system.</p>
                                    <span className="absolute md:right-full md:top-1/2 md:-translate-y-1/2 left-4 md:left-auto bottom-full md:bottom-auto border-8 border-transparent md:border-r-gray-900 border-b-gray-900"></span>
                                </div>
                            </div>
                        </div>
                        {/* Mobile Inline Description */}
                        {showLogicInfo && (
                            <div className="md:hidden mt-4 bg-gray-900 text-white text-[14px] leading-relaxed rounded-xl px-6 py-6 shadow-xl animate-gate-switch">
                                <p className="font-black text-[15px] mb-2 text-[#419CB8] uppercase tracking-widest">Digital Logic Gates</p>
                                <p>Logic Gates are the fundamental building blocks of digital circuits. They take binary inputs (0 or 1) and produce a single binary output based on a specific logical rule.</p>
                            </div>
                        )}
                    </div>
                    <p className="text-gray-500 text-sm">TRY IT OUT! Select a gate and click on an input.</p>
                </div>

                <div className="bg-white shadow-[0_4px_40px_rgba(0,0,0,0.06)] border border-gray-50 flex flex-col md:flex-row min-h-[420px]">
                    {/* Breadboard Image */}
                    <div className="w-full md:w-[45%] relative z-10">
                        <img loading="lazy" src={breadboardImg} alt="Electronic Breadboard" className="w-full h-full min-h-[250px] object-cover rounded-md shadow-2xl origin-right md:transform-[perspective(1200px)_rotateY(14deg)] transition-transform duration-500 ease-out" />
                    </div>

                    {/* Interactive UI */}
                    <div className="w-full md:w-[55%] p-6 sm:p-10 flex flex-col justify-center bg-white relative rounded-b-3xl md:rounded-none md:rounded-r-3xl">

                        {/* Gate Selector */}
                        <div className="flex justify-center md:absolute md:top-8 md:right-8 gap-2 z-30 mb-8 md:mb-0">
                            {['AND', 'OR', 'NOT'].map(type => (
                                <button
                                    key={type}
                                    onClick={() => setGateType(type)}
                                    className={`cursor-pointer px-4 sm:px-6 py-2 sm:py-2.5 rounded-md text-[9px] sm:text-[10px] font-black tracking-widest transition-all border ${gateType === type ? 'bg-[#00607a] text-white border-[#00607a] shadow-sm' : 'bg-white text-gray-400 border-gray-100 hover:bg-[#FFF1DC] hover:text-[#00607a]'}`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center justify-between gap-2 sm:gap-6 max-w-lg mx-auto w-full relative z-10">
                            {/* Inputs */}
                            <div className="flex flex-col gap-6 w-14 sm:w-16 shrink-0 relative z-10">
                                <div className="flex flex-col items-center">
                                    <span className="text-[8px] font-bold text-gray-400 mb-2 tracking-widest uppercase text-center">INPUT A</span>
                                    <button
                                        onClick={() => setInputA(inputA === 0 ? 1 : 0)}
                                        className={`cursor-pointer w-12 h-12 rounded flex items-center justify-center text-xl font-bold shadow-sm border transition-all ${inputA ? 'bg-[#00607a] text-white border-[#00607a] shadow-md' : 'bg-[#eef2f5] text-gray-600 border-gray-200 hover:bg-gray-200'} transition-all`}
                                    >
                                        {inputA}
                                    </button>
                                </div>
                                <div className={`flex flex-col items-center transition-opacity duration-300 ${gateType === 'NOT' ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}>
                                    <span className="text-[8px] font-bold text-gray-400 mb-2 tracking-widest uppercase text-center">INPUT B</span>
                                    <button
                                        onClick={() => setInputB(inputB === 0 ? 1 : 0)}
                                        disabled={gateType === 'NOT'}
                                        className={`cursor-pointer w-12 h-12 rounded flex items-center justify-center text-xl font-bold shadow-sm border transition-all ${inputB && gateType !== 'NOT' ? 'bg-[#00607a] text-white border-[#00607a] shadow-md' : 'bg-[#eef2f5] text-gray-600 border-gray-200 hover:bg-gray-200'} transition-all`}
                                    >
                                        {gateType === 'NOT' ? '-' : inputB}
                                    </button>
                                </div>
                            </div>

                            {/* Connections & Gate */}
                            <div className="flex-1 flex items-center justify-center relative min-w-[120px] z-0">
                                <div className={`flex flex-col ${gateType === 'NOT' ? 'justify-center' : 'justify-between'} h-14 -mr-px shrink-0 relative z-10`}>
                                    <div className={`h-[3px] w-6 lg:w-10 transition-colors ${inputA ? 'bg-[#3c92ab]' : 'bg-gray-200'}`}></div>
                                    <div className={`h-[3px] w-6 lg:w-10 transition-colors ${gateType === 'NOT' ? 'hidden' : (inputB ? 'bg-[#3c92ab]' : 'bg-gray-200')}`}></div>
                                </div>

                                <div key={gateType} className="flex flex-col items-center justify-center min-h-20 sm:min-h-28 relative z-20 shrink-0 mx-2 sm:mx-4 animate-gate-switch">
                                    {gateType === 'AND' && <GiLogicGateAnd className="w-20 h-20 sm:w-28 sm:h-28 text-[#3c92ab]" />}
                                    {gateType === 'OR' && <GiLogicGateOr className="w-20 h-20 sm:w-28 sm:h-28 text-[#3c92ab]" />}
                                    {gateType === 'NOT' && <GiLogicGateNot className="w-20 h-20 sm:w-28 sm:h-28 text-[#3c92ab]" />}
                                </div>

                                <div className={`h-[3px] w-4 sm:w-6 lg:w-10 -ml-px transition-colors shrink-0 relative z-10 ${outputState === 'HIGH' ? 'bg-[#3c92ab]' : 'bg-gray-200'}`}></div>

                                <div className="absolute -bottom-10 text-[8px] sm:-bottom-12 sm:text-[9px] text-gray-400 text-center w-full uppercase tracking-wider leading-relaxed whitespace-pre-wrap">
                                    {gateDescriptions[gateType]}
                                </div>
                            </div>

                            {/* Output */}
                            <div className="flex flex-col items-center justify-center w-14 sm:w-16 shrink-0 relative z-10">
                                <div className="absolute bottom-full mb-3 text-center w-full">
                                    <span className="text-[8px] font-bold text-gray-400 tracking-widest uppercase hidden sm:block">OUTPUT</span>
                                    <span className="text-[8px] font-bold text-gray-400 tracking-widest uppercase sm:hidden">OUT</span>
                                </div>

                                <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center transition-all duration-300 ${outputState === 'HIGH' ? 'bg-yellow-50 text-yellow-500 shadow-[0_0_15px_rgba(250,204,21,0.5)]' : 'bg-[#eef2f5] text-gray-300'}`}>
                                    {outputState === 'HIGH' ? (
                                        <HiLightBulb className="w-7 h-7 sm:w-9 sm:h-9 transition-all duration-300 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]" />
                                    ) : (
                                        <HiOutlineLightBulb className="w-7 h-7 sm:w-9 sm:h-9 opacity-80" />
                                    )}
                                </div>

                                <div className="absolute top-full mt-3 font-bold text-xs sm:text-sm text-gray-600 text-center w-full whitespace-nowrap left-1/2 -translate-x-1/2">
                                    State: <span className={outputState === 'HIGH' ? 'text-yellow-500 font-black' : ''}>{outputState}</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* Bridge: Hardware to Software */}
            {/* Bridge: Hardware to Software */}
            <section ref={bridgeRef} className={`py-20 px-6 bg-white reveal ${bridgeVisible ? 'reveal-active' : ''}`}>

                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
                    <div className="w-full md:w-1/2">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-[#419CB8]/10 text-[#419CB8] text-[10px] font-black tracking-widest uppercase mb-6">
                            The Missing Link
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-black tracking-tighter mb-8 leading-[1.1]">
                            WHERE HARDWARE <br />
                            <span className="text-[#419CB8]">MEETS SOFTWARE</span>
                        </h2>
                        <p className="text-gray-500 leading-relaxed mb-6 text-justify">
                            Computer Engineering isn't just about building circuits or writing code — it's about the interaction between the two. Every '0' and '1' you manipulated in the logic gate simulator above is what eventually becomes the lines of code you'll write below.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
                                <div className="text-[#419CB8] font-black text-xl mb-1">Low-Level</div>
                                <div className="text-gray-400 text-[10px] uppercase tracking-wider font-bold">Physical Gates</div>
                            </div>
                            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
                                <div className="text-[#419CB8] font-black text-xl mb-1">High-Level</div>
                                <div className="text-gray-400 text-[10px] uppercase tracking-wider font-bold">Abstract Logic</div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 relative">
                        <div className="absolute inset-0 bg-[#419CB8]/15 blur-[80px] rounded-full pointer-events-none scale-75"></div>
                        <div
                            className="relative overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.25),0_10px_40px_rgba(65,156,184,0.3)] transition-transform duration-700 hover:rotate-0"
                            style={{ 
                                transform: windowWidth < 768 
                                    ? 'none' 
                                    : 'perspective(1200px) rotateY(-12deg) rotateX(4deg)' 
                            }}
                        >
                            {/* Source Attribution Label */}
                            <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] text-white/80 font-mono z-20 tracking-widest uppercase border border-white/10">
                                Source: wokwi.com
                            </div>

                            <img
                                src="/assets/wokwi_example.gif"
                                alt="Hardware meets software — circuit board blending into code"
                                loading="lazy"
                                className="w-full h-full object-cover rounded-md"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Programming Section */}
            {/* Programming Section */}
            <section ref={progRef} className={`bg-[#eeeeee] py-16 px-6 mt-4 relative reveal ${progVisible ? 'reveal-active' : ''}`}>

                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col mb-4">
                        <div className="flex items-center gap-3 mb-2 lg:justify-end">
                            <div className="relative shrink-0 group/tip">
                                <button
                                    onClick={() => setShowProgInfo(!showProgInfo)}
                                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black transition-colors select-none cursor-pointer bg-gray-300 text-gray-500 hover:bg-[#419CB8] hover:text-white md:bg-gray-300 md:text-gray-500 md:group-hover/tip:bg-[#419CB8] md:group-hover/tip:text-white`}
                                >
                                    ?
                                </button>
                                <div className="pointer-events-none hidden md:block absolute md:right-[calc(100%+16px)] right-0 md:top-1/2 top-full md:-translate-y-1/2 mt-3 md:mt-0 w-[calc(100vw-3rem)] md:w-[450px] bg-gray-900 text-white text-[15px] leading-relaxed rounded-2xl px-8 py-7 shadow-2xl z-50 opacity-0 group-hover/tip:opacity-100 transition-opacity duration-200">
                                    <p className="font-black text-[18px] mb-3 text-[#419CB8] uppercase tracking-widest">Programming</p>
                                    <p>Programming is the art of writing instructions for a computer. In CompE, you'll master both high-level languages like Python and low-level languages like C++ to control hardware and software — bridging logic with real-world systems.</p>
                                    <span className="absolute md:left-full md:top-1/2 md:-translate-y-1/2 right-4 md:right-auto bottom-full md:bottom-auto border-8 border-transparent md:border-l-gray-900 border-b-gray-900"></span>
                                </div>
                            </div>
                            <h2 className="text-4xl font-bold tracking-tight">Programming</h2>
                        </div>
                        {/* Mobile Inline Description */}
                        {showProgInfo && (
                            <div className="md:hidden mt-2 mb-4 bg-gray-900 text-white text-[14px] leading-relaxed rounded-xl px-6 py-6 shadow-xl animate-gate-switch">
                                <p className="font-black text-[15px] mb-2 text-[#419CB8] uppercase tracking-widest">Programming</p>
                                <p>Programming is the art of writing instructions for a computer. You'll master languages from high-level Python to low-level C++ to control both hardware and software.</p>
                            </div>
                        )}
                        <p className="text-gray-500 text-sm lg:text-right">Write Code. Type it out!</p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8 items-stretch pt-4 lg:perspective-[2500px]">
                        {/* Code Editor Interactive */}
                        <div className="flex-auto lg:w-2/3 bg-[#1e1e1e] rounded-md shadow-[0_30px_70px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col font-mono text-sm leading-relaxed p-px border border-white/5 md:transform-[perspective(2500px)_rotateY(6deg)] origin-left transition-transform duration-700 hover:rotate-0">
                            {/* Window Bar */}
                            <div className="bg-[#2d2d2d] px-4 py-3 flex items-center justify-between">
                                <div className="flex gap-2">
                                    <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56]"></div>
                                    <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]"></div>
                                    <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f]"></div>
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => { setCodeLang('cpp'); setUserCode(''); setRunStatus('idle'); }}
                                        className={`text-[10px] font-bold tracking-widest uppercase transition-colors ${codeLang === 'cpp' ? 'text-[#419CB8]' : 'text-gray-500 hover:text-gray-400'}`}
                                    >
                                        C++
                                    </button>
                                    <button
                                        onClick={() => { setCodeLang('python'); setUserCode(''); setRunStatus('idle'); }}
                                        className={`text-[10px] font-bold tracking-widest uppercase transition-colors ${codeLang === 'python' ? 'text-[#419CB8]' : 'text-gray-500 hover:text-gray-400'}`}
                                    >
                                        Python
                                    </button>
                                </div>
                                <div className="text-gray-400 text-xs flex items-center gap-2">
                                    <span className="text-gray-600 font-sans text-[10px]">&lt;&gt;</span> {codePuzzles[codeLang].display}
                                </div>
                            </div>

                            {/* Editor Content */}
                            <div className="flex-1 p-6 sm:p-14 min-h-[320px] bg-[#1e1e1e] relative group flex flex-col justify-center">
                                <div className="absolute top-4 sm:top-6 left-6 sm:left-10 text-[8px] sm:text-[10px] text-gray-600 uppercase font-black tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
                                    // TYPE ON THE BLANK SPACE TO COMPLETE THE CODE
                                </div>
                                <div className="flex gap-4">
                                    <div className="text-gray-700 text-right select-none w-6 border-r border-gray-800 pr-3 mr-3 mt-1">
                                        1<br />2<br />3
                                    </div>
                                    <div className="flex-1 pt-1">
                                        <pre className="text-gray-300 whitespace-pre-wrap">
                                            {codePuzzles[codeLang].prefix}
                                            <input
                                                type="text"
                                                value={userCode}
                                                onChange={(e) => setUserCode(e.target.value)}
                                                placeholder="..."
                                                className={`mx-2 bg-[#2d2d2d] border-b-2 ${runStatus === 'success' ? 'border-green-500' : runStatus === 'error' ? 'border-red-500' : 'border-[#419CB8]'} outline-none px-2 py-0.5 text-[#419CB8] w-24 sm:w-32 transition-colors`}
                                            />
                                            {codePuzzles[codeLang].suffix}
                                        </pre>
                                    </div>
                                </div>

                                {/* Run Button */}
                                <button
                                    onClick={handleRunCode}
                                    className={`absolute bottom-8 right-8 flex items-center gap-2 px-6 py-2.5 rounded-md font-bold text-xs tracking-widest transition-all ${runStatus === 'success' ? 'bg-green-600 text-white' : runStatus === 'error' ? 'bg-red-600 text-white' : 'bg-[#00607a] text-white hover:bg-[#004e63] shadow-lg hover:shadow-[#00607a]/20'}`}
                                >
                                    {runStatus === 'success' ? <VscCheck className="w-4 h-4" /> : runStatus === 'error' ? <VscError className="w-4 h-4" /> : <HiPlay className="w-4 h-4" />}
                                    {runStatus === 'success' ? 'SUCCESS' : runStatus === 'error' ? 'ERROR' : 'RUN CODE'}
                                </button>
                            </div>
                        </div>

                        {/* Right Content / Sidebar Terminal */}
                        <div className="lg:w-[350px] shrink-0 flex flex-col gap-6 md:transform-[perspective(2500px)_rotateY(-10deg)] origin-right transition-transform duration-700 hover:rotate-0">
                            <div className="bg-[#141414] rounded-md shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-gray-800 overflow-hidden flex flex-col h-full min-h-[300px]">
                                <div className="bg-[#2d2d2d] px-6 py-3 border-b border-gray-800 flex items-center justify-between">
                                    <div className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Compiler Output</div>
                                    <div className="flex gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-gray-700"></div>
                                        <div className="w-2 h-2 rounded-full bg-gray-700"></div>
                                    </div>
                                </div>
                                <div className="flex-1 p-6 font-mono text-sm">
                                    {runStatus === 'success' ? (
                                        <div className="text-green-500 text-[11px] animate-in fade-in slide-in-from-left-2 duration-300 flex flex-col gap-3">
                                            <div className="flex items-center gap-2 font-bold opacity-80">
                                                <VscCheck className="w-4 h-4 text-green-500" />
                                                &gt; EXECUTING {codePuzzles[codeLang].display.toUpperCase()}
                                            </div>
                                            <div className="bg-black/40 p-4 rounded-lg border border-green-500/10 text-[#eee] font-bold shadow-inner">
                                                <span className="text-gray-500 block mb-2 text-[9px] uppercase tracking-normal font-sans">stdout:</span>
                                                {codePuzzles[codeLang].expectedOutput}
                                            </div>
                                            <div className="text-[10px] opacity-60 bg-green-500/5 p-2 rounded border border-green-500/10">
                                                Process finished with exit code 0. Execution time: 12ms
                                            </div>
                                        </div>
                                    ) : runStatus === 'error' ? (
                                        <div className="text-red-500 text-[11px] animate-in fade-in slide-in-from-left-2 duration-300 flex flex-col gap-2">
                                            <div className="flex items-center gap-2 font-bold underline decoration-red-500/30">
                                                <VscError className="w-4 h-4" />
                                                &gt; BUILD FAILED
                                            </div>
                                            <div className="text-[10px] text-red-400/80 leading-relaxed font-sans mt-2">
                                                Error: Symbol '{userCode}' not found. Did you forget to declare the variable or check your spelling?
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full text-center py-10 opacity-30">
                                            <VscRunAll className="w-10 h-10 mb-4" />
                                            <div className="text-[10px] font-black tracking-widest uppercase">Console Idle</div>
                                            <div className="text-[9px] mt-2 max-w-[140px] leading-relaxed mx-auto italic">Complete the code and click 'Run' to see output</div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Challenge Hint */}
                            <div className="bg-[#00607a]/5 border border-[#00607a]/10 p-6 rounded-md">
                                <h3 className="text-xs font-black mb-3 flex items-center gap-2 tracking-widest uppercase text-gray-500">
                                    Current Task
                                </h3>
                                <p className="text-gray-600 text-[11px] leading-relaxed italic">
                                    "CompE requires mastering both high-level abstraction and low-level hardware control."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Engineering Pillars Section */}
            <section ref={pillarsRef} className={`py-24 px-6 bg-white reveal ${pillarsVisible ? 'reveal-active' : ''}`}>
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-6xl font-black tracking-tighter mb-4 uppercase">Core Pillars of CpE</h2>
                        <p className="text-gray-400 font-medium tracking-tight">The foundation of your journey into technology and innovation</p>
                    </div>
                    {/* Top row: 3 pillars */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                        {[
                            {
                                title: 'Computer Architecture & Hardware Engineering',
                                icon: HiOutlineCpuChip,
                                file: 'arch.sys',
                                tilt: 'perspective(1200px) rotateY(16deg)'
                            },
                            {
                                title: 'Software Engineering & Development',
                                icon: HiOutlineCodeBracket,
                                file: 'software.eng',
                                tilt: 'perspective(1200px) rotateY(0deg)'
                            },
                            {
                                title: 'Embedded Systems',
                                icon: HiOutlineCog6Tooth,
                                file: 'embed.sys',
                                tilt: 'perspective(1200px) rotateY(-16deg)'
                            },
                        ].map(({ title, icon: Icon, file, tilt }) => (
                            <div key={file} style={{ transform: windowWidth >= 1024 ? tilt : 'none' }} className="transition-transform duration-700">
                                <div className="flex flex-col h-full rounded-xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-gray-100 group hover:shadow-[0_16px_60px_rgba(0,0,0,0.14)] transition-all duration-500 hover:-translate-y-1 bg-white">
                                    <div className="bg-[#2d2d2d] px-4 py-3 flex items-center justify-between">
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                                            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                                        </div>
                                        <span className="text-gray-500 text-[10px] font-mono">{file}</span>
                                    </div>
                                    <div className="p-8 flex flex-col flex-1 items-start justify-center min-h-[160px]">
                                        <Icon className="w-10 h-10 text-gray-400 group-hover:text-[#419CB8] transition-colors mb-4" />
                                        <h3 className="text-sm font-black tracking-tight uppercase leading-snug text-gray-800 group-hover:text-[#419CB8] transition-colors">{title}</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Bottom row: 2 pillars centered */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto w-full">
                        {[
                            {
                                title: 'Networking & Communications',
                                icon: HiOutlineGlobeAlt,
                                file: 'network.cfg',
                                tilt: 'perspective(1200px) rotateY(12deg) rotateX(8deg)'
                            },
                            {
                                title: 'Hardware-Software Integration',
                                icon: HiOutlineArrowsRightLeft,
                                file: 'integrate.lnk',
                                tilt: 'perspective(1200px) rotateY(-12deg) rotateX(8deg)'
                            },
                        ].map(({ title, icon: Icon, file, tilt }) => (
                            <div key={file} style={{ transform: windowWidth >= 1024 ? tilt : 'none' }} className="transition-transform duration-700">
                                <div className="flex flex-col h-full rounded-xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-gray-100 group hover:shadow-[0_16px_60px_rgba(0,0,0,0.14)] transition-all duration-500 hover:-translate-y-1 bg-white">
                                    <div className="bg-[#2d2d2d] px-4 py-3 flex items-center justify-between">
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                                            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                                        </div>
                                        <span className="text-gray-500 text-[10px] font-mono">{file}</span>
                                    </div>
                                    <div className="p-8 flex flex-col flex-1 items-start justify-center min-h-[160px]">
                                        <Icon className="w-10 h-10 text-gray-400 group-hover:text-[#419CB8] transition-colors mb-4" />
                                        <h3 className="text-sm font-black tracking-tight uppercase leading-snug text-gray-800 group-hover:text-[#419CB8] transition-colors">{title}</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section ref={ctaRef} className={`bg-[#eeeeee] py-32 px-6 text-center mx-auto reveal ${ctaVisible ? 'reveal-active' : ''}`}>
                <h2 className="text-4xl md:text-[3.25rem] md:leading-[1.1] font-black tracking-tight mb-10">
                    READY TO START <br className="hidden md:block" /> YOUR <span className="text-[#419CB8]">ENGINEERING</span> LEGACY?
                </h2>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link to="/join" className="w-full sm:w-auto bg-[#00607a] hover:bg-[#004e63] text-white px-10 py-3.5 rounded-sm shadow-md font-bold text-[11px] tracking-widest transition-colors uppercase">
                        JOIN NOW
                    </Link>
                    <Link to="/curriculum" className="w-full sm:w-auto bg-white hover:bg-[#FFF1DC] hover:text-[#00607a] text-gray-700 border border-gray-200 px-10 py-3.5 rounded-sm font-bold text-[11px] tracking-widest transition-colors uppercase">
                        VIEW CURRICULUM
                    </Link>
                </div>
            </section>
        </div>
    );
}
