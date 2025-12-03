import React from "react";

const BRAND_BLUE = "#0038A8";
// Footer.jsx
function Footer() {
  return (
    <footer className="bg-white pt-20 pb-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-xl shadow-blue-900/20 mb-8" style={{ backgroundColor: BRAND_BLUE }}>
              P
          </div>
          <p className="text-slate-900 font-bold text-2xl mb-8">Pinoy Heritage</p>
          
          <div className="flex flex-wrap justify-center gap-8 mb-12 text-sm font-bold tracking-wide text-slate-500 uppercase">
            <a href="/home" className="hover:text-blue-800 transition-colors">Home</a>
            <a href="/catalog" className="hover:text-blue-800 transition-colors">Shop</a>
            <a href="/about" className="hover:text-blue-800 transition-colors">About</a>
          </div>
          
          <div className="text-slate-400 text-xs text-center max-w-md leading-relaxed">
            © 2025 Pinoy Heritage Platform. <br/>Connecting tradition with innovation.
          </div>
      </div>
    </footer>
  );
}

export default Footer;
