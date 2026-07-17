import React from 'react'
import { Link } from 'react-router-dom'

export default function Header({ onSelectAgencyTab }) {
  return (
    <header className="w-full bg-[#E51E25] text-white py-3 px-4 md:px-8 flex items-center justify-between sticky top-0 z-50 shadow-md">
      {/* Left side: Logo */}
      <div className="flex items-center gap-2">
        <div className="bg-white text-[#E51E25] w-8 h-8 rounded-full flex items-center justify-center font-black text-xl select-none">
          e
        </div>
        <span className="font-extrabold text-2xl tracking-tight select-none">
          e<span className="text-[#FFD700]">Rupai</span>
        </span>
      </div>

      {/* Middle side: Navigation Menu */}
      <nav className="hidden xl:flex items-center gap-6 font-semibold text-sm">
        <a href="#home" className="hover:text-slate-200 transition-colors">Home</a>
        <a href="#live" className="hover:text-slate-200 transition-colors">Live Streaming</a>
        <div className="relative group cursor-pointer flex items-center gap-1 hover:text-slate-200 transition-colors py-2">
          <span>Agency</span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
          </svg>
          
          {/* Dropdown Menu - pt-2 acts as invisible hover bridge */}
          <div className="absolute top-full left-0 pt-2 hidden group-hover:block z-50">
          <div className="bg-white text-slate-800 rounded-xl shadow-xl border border-slate-100 py-2 w-56">
            {/* Diamond Agency - navigates to separate page */}
            <Link
              to="/diamond-agency"
              className="w-full block text-left px-4 py-2 text-sm font-medium hover:bg-red-50 hover:text-[#E51E25] transition-colors"
            >
              💎 Diamond Agency
            </Link>
            {/* Other items - inline viewer */}
            {[
              'Agency',
              'Agent',
              'Host',
              'Target System',
              'Revenue Distribution',
              'Agency Dashboard',
              'Agent Dashboard'
            ].map((item) => (
              <button
                key={item}
                onClick={() => onSelectAgencyTab && onSelectAgencyTab(item)}
                className="w-full text-left px-4 py-2 text-sm font-medium hover:bg-red-50 hover:text-[#E51E25] transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
          </div>
        </div>
        <a href="#gaming" className="hover:text-slate-200 transition-colors">Gaming</a>
        <a href="#photo" className="hover:text-slate-200 transition-colors">Photo/Video</a>
        <a href="#sponsor" className="hover:text-slate-200 transition-colors">Social ad Sponsor</a>
        <div className="relative group cursor-pointer flex items-center gap-1 hover:text-slate-200 transition-colors">
          <span>Privacy Policy</span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <a href="#about" className="hover:text-slate-200 transition-colors">About</a>
      </nav>

      {/* Right side: Search, Login & Menu Icon */}
      <div className="flex items-center gap-3">
        {/* Search Input */}
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search eRupai"
            className="bg-[#B91319] text-white placeholder-red-200 text-sm rounded-full py-1.5 pl-9 pr-4 w-52 focus:outline-none focus:ring-2 focus:ring-red-300 transition-all"
          />
          <svg className="w-4 h-4 text-red-200 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Login Button */}
        <button className="text-white hover:text-red-200 p-2 transition-colors" title="Login">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h5a3 3 0 013 3v1" />
          </svg>
        </button>

        {/* Hamburger Menu Icon */}
        <button className="bg-[#B91319] hover:bg-[#a11015] p-2 rounded-lg transition-colors">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </header>
  )
}
