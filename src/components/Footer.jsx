import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#fcfcfc] border-t border-gray-100 py-16 px-8 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        <div className="max-w-xs">
          <img src="/logo.png" alt="CompEJourney" className="h-10 w-auto mb-4" />
          <p className="text-[11px] leading-relaxed text-gray-500">
            Empowering the next generation of computer engineers with precision, passion, and purpose.
          </p>
        </div>

        <div className="flex gap-16 md:gap-32">
          <div>
            <h3 className="text-[10px] font-bold text-gray-400 mb-4 tracking-wider uppercase">CONNECT</h3>
            <ul className="space-y-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
              <li><span className="hover:text-gray-800 transition-colors cursor-pointer">LINKEDIN</span></li>
              <li><span className="hover:text-gray-800 transition-colors cursor-pointer">GITHUB</span></li>
              <li><span className="hover:text-gray-800 transition-colors cursor-pointer">CONTACT SUPPORT</span></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-bold text-gray-400 mb-4 tracking-wider uppercase">LEGAL</h3>
            <ul className="space-y-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
              <li><span className="hover:text-gray-800 transition-colors cursor-pointer">PRIVACY POLICY</span></li>
              <li><span className="hover:text-gray-800 transition-colors cursor-pointer">TERMS OF SERVICE</span></li>
            </ul>
            <div className="mt-8 text-[9px] text-gray-400 uppercase leading-relaxed max-w-[200px]">
              © 2026. COMPUTER ENGINEERING COLLECTIVE. ENGINEERED FOR EXCELLENCE.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
