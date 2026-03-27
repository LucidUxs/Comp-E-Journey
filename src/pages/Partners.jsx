import { HiArrowRight, HiOutlineUserGroup, HiOutlineLightBulb, HiOutlineStar } from 'react-icons/hi';
import { IoLocation } from 'react-icons/io5';
import useScrollReveal from '../hooks/useScrollReveal';

const universities = Array(5).fill({});

// Extracted static data to prevent reallocation on every render
const PIN_LOCATIONS = [
    { top: '20%', left: '45%' },
    { top: '35%', left: '40%' },
    { top: '45%', left: '55%' },
    { top: '60%', left: '50%' },
    { top: '80%', left: '50%' },
    { top: '30%', left: '43%' },
    { top: '50%', left: '48%' },
];

export default function Partners() {
    const [heroRef, heroVisible] = useScrollReveal();
    const [networkRef, networkVisible] = useScrollReveal();
    const [benefitsRef, benefitsVisible] = useScrollReveal();

    return (
        <div className="bg-white">
            <main className="grow">
                {/* Hero Section */}
                <section ref={heroRef} className={`max-w-7xl mx-auto px-6 py-12 md:py-16 reveal ${heroVisible ? 'reveal-active' : ''}`}>
                    <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                        {/* Left: Placeholder Logo */}
                        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                            <div
                                className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[420px] lg:h-[420px] rounded-full bg-white flex items-center justify-center border border-gray-100 shadow-[0_30px_70px_rgba(65,156,184,0.2)] group overflow-hidden transition-transform duration-1000 lg:hover:scale-105 max-lg:transform-none!"
                                style={{ transform: 'perspective(1500px) rotateY(0deg) rotateX(0deg) translateZ(50px)' }}
                            >
                                <div className="absolute inset-0 bg-linear-to-tr from-[#419CB8]/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500 z-20 pointer-events-none"></div>
                                <img
                                    src="/icpep.png"
                                    alt="ICpEP Logo"
                                    className="w-full h-full object-contain relative z-10 transition-transform duration-700"
                                />
                            </div>
                        </div>

                        {/* Right: Content */}
                        <div className="w-full md:w-1/2 text-center md:text-left">
                            <h1 className="text-6xl sm:text-7xl lg:text-9xl font-black text-[#419CB8] tracking-tighter mb-4 lg:mb-6">
                                ICPEP
                            </h1>
                            <div className="text-gray-500 text-sm sm:text-base leading-relaxed mb-10 w-full max-w-full lg:max-w-3xl mx-auto md:mx-0">
                                <p className="font-bold text-[#419CB8] mb-3 text-base sm:text-lg lg:text-xl whitespace-nowrap">
                                    The Institute of Computer Engineers of the Philippines (ICpEP), Inc.
                                </p>
                                <p className="text-justify">
                                    The country’s premier professional organization for computer engineering, representing practitioners, educators, and students. Founded in 1992 and reformed in 2008, it serves as the official body for industry and academia, dedicated to elevating the profession through the Certified Computer Engineer (CCpE) credential and strategic partnerships. With its vision to produce world-class Filipino engineers, ICpEP fosters a culture of excellence, innovation, and global competitiveness by bridging the gap between local talent and the international technological landscape.
                                </p>
                            </div>
                            <a
                                href="https://www.facebook.com/icpep.se.national?rdid=26Pze0e0FUezVOnN&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1AjjyQWKMM%2F#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 bg-[#00607a] hover:bg-[#004e63] text-white px-10 py-4 rounded-sm font-bold text-xs tracking-widest transition-all shadow-lg hover:shadow-[#00607a]/20 uppercase group"
                            >
                                GO TO SITE
                                <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </div>
                </section>

                {/* Universities Section (Scattered Logos + Map) */}
                <section ref={networkRef} className={`py-20 border-t border-gray-50 overflow-hidden reveal ${networkVisible ? 'reveal-active' : ''}`}>
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex flex-col lg:flex-row items-center gap-16">
                            {/* Left: Scattered Logos */}
                            <div className="w-full lg:w-1/2">
                                <h2 className="text-5xl sm:text-7xl font-black tracking-tighter mb-4">Our Network</h2>
                                <p className="text-gray-400 font-bold tracking-tight mb-12 max-w-md">Over 30+ elite universities have partnered with Computer Engineering across the archipelago.</p>

                                <div className="relative h-[250px] md:h-[400px] lg:h-[500px] w-full bg-gray-50 rounded-[30px] lg:rounded-[40px] border-2 border-gray-100 p-4 lg:p-8 overflow-hidden shadow-inner">
                                    {/* Scattered Logo Placeholders - Improved Visibility for Mobile */}
                                    <div className="absolute top-4 lg:top-10 left-4 lg:left-10 w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-white rounded-2xl lg:rounded-3xl shadow-xl border-2 border-gray-100 flex items-center justify-center hover:scale-110 transition-transform cursor-default">
                                        <span className="text-[6px] md:text-[8px] lg:text-[10px] font-black text-gray-400 uppercase tracking-widest text-center px-1 lg:px-4 leading-tight">University LOGO</span>
                                    </div>
                                    <div className="absolute top-20 lg:top-48 left-20 lg:left-36 w-20 h-20 md:w-32 md:h-32 lg:w-36 lg:h-36 bg-white rounded-3xl lg:rounded-[40px] shadow-2xl border-2 border-gray-100 flex items-center justify-center hover:scale-110 transition-transform cursor-default">
                                        <span className="text-[7px] md:text-[10px] lg:text-[12px] font-black text-gray-400 uppercase tracking-widest text-center px-2 lg:px-4 leading-tight">Partner LOGO</span>
                                    </div>
                                    <div className="absolute bottom-6 lg:bottom-12 left-6 lg:left-12 w-14 h-14 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-white rounded-xl lg:rounded-[24px] shadow-lg border-2 border-gray-100 flex items-center justify-center hover:scale-110 transition-transform cursor-default">
                                        <span className="text-[5px] md:text-[7px] lg:text-[9px] font-black text-gray-400 uppercase tracking-widest text-center px-1 lg:px-2 leading-tight">LOGO</span>
                                    </div>
                                    <div className="absolute top-8 lg:top-20 right-4 lg:right-8 w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-white rounded-full shadow-xl border-2 border-gray-100 flex items-center justify-center hover:scale-110 transition-transform cursor-default">
                                        <span className="text-[6px] md:text-[8px] lg:text-[11px] font-black text-gray-400 uppercase tracking-widest text-center px-1 lg:px-4 leading-tight">Academic LOGO</span>
                                    </div>
                                    <div className="absolute bottom-8 lg:bottom-16 right-8 lg:right-16 w-24 h-24 md:w-36 md:h-36 lg:w-44 lg:h-44 bg-white rounded-[30px] lg:rounded-[50px] shadow-2xl border-2 border-gray-100 flex items-center justify-center hover:scale-110 transition-transform cursor-default">
                                        <span className="text-[8px] md:text-[11px] lg:text-[14px] font-black text-gray-400 uppercase tracking-widest text-center px-2 lg:px-4 leading-tight">University Partner</span>
                                    </div>

                                </div>
                            </div>

                            {/* Right: Responsive Tilted Map with Spot Icons */}
                            <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end mt-8 lg:mt-0">
                                <div
                                    className="relative transition-transform duration-1000 lg:hover:scale-105 max-lg:transform-none!"
                                    style={{ transform: 'perspective(1500px) rotateY(-20deg) rotateX(5deg) translateZ(50px)' }}
                                >
                                    <img
                                        src="/assets/philippines_map.png"
                                        alt="Philippines Map"
                                        loading="lazy"
                                        className="w-[280px] md:w-[400px] lg:w-[550px] max-w-full h-auto drop-shadow-[0_20px_40px_rgba(65,156,184,0.3)] lg:drop-shadow-[0_30px_70px_rgba(65,156,184,0.25)]"
                                    />
                                    {/* Location Pin Icons on Map */}
                                    {PIN_LOCATIONS.map((pin, idx) => (
                                        <div
                                            key={idx}
                                            className={`absolute -translate-x-1/2 -translate-y-1/2 text-emerald-500`}
                                            style={{ top: pin.top, left: pin.left }}
                                        >
                                            <IoLocation className="w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12 drop-shadow-[0_2px_5px_rgba(16,185,129,0.4)] lg:drop-shadow-[0_4px_10px_rgba(16,185,129,0.4)]" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Partnership Benefits Section */}
                <section ref={benefitsRef} className={`py-16 sm:py-20 max-w-7xl mx-auto px-6 border-t border-gray-50 reveal ${benefitsVisible ? 'reveal-active' : ''}`}>
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-4xl sm:text-6xl font-black tracking-tighter mb-3 uppercase">Why Partner With Us?</h2>
                        <div className="w-16 h-1 bg-[#419CB8] mx-auto opacity-30"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-20">
                        <div className="group">
                            <div className="w-14 h-14 bg-gray-50 rounded-2xl mb-8 flex items-center justify-center group-hover:bg-[#419CB8]/5 transition-all">
                                <HiOutlineUserGroup className="w-7 h-7 text-[#419CB8]/60 group-hover:text-[#419CB8] group-hover:scale-110 transition-all" />
                            </div>
                            <h3 className="text-xl font-bold mb-4 tracking-tight">Talent Pipeline</h3>
                            <p className="text-gray-500 leading-relaxed text-sm">
                                Gain early access to the next generation of Computer Engineering leaders. Our students are trained in industry-standard technologies and methodologies.
                            </p>
                        </div>
                        <div className="group">
                            <div className="w-14 h-14 bg-gray-50 rounded-2xl mb-8 flex items-center justify-center group-hover:bg-[#419CB8]/5 transition-all">
                                <HiOutlineLightBulb className="w-7 h-7 text-[#419CB8]/60 group-hover:text-[#419CB8] group-hover:scale-110 transition-all" />
                            </div>
                            <h3 className="text-xl font-bold mb-4 tracking-tight">Innovation Hub</h3>
                            <p className="text-gray-500 leading-relaxed text-sm">
                                Collaborate on real-world projects, research initiatives, and technological breakthroughs in AI, IoT, and embedded systems.
                            </p>
                        </div>
                        <div className="group">
                            <div className="w-14 h-14 bg-gray-50 rounded-2xl mb-8 flex items-center justify-center group-hover:bg-[#419CB8]/5 transition-all">
                                <HiOutlineStar className="w-7 h-7 text-[#419CB8]/60 group-hover:text-[#419CB8] group-hover:scale-110 transition-all" />
                            </div>
                            <h3 className="text-xl font-bold mb-4 tracking-tight">Brand Leadership</h3>
                            <p className="text-gray-500 leading-relaxed text-sm">
                                Position your organization at the forefront of engineering education and support the growth of the Philippine tech ecosystem.
                            </p>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}
