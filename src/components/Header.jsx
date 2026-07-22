import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Header({ onSelectAgencyTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [agencyDropdownOpen, setAgencyDropdownOpen] = useState(false)
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('English')

  const languages = ['English', 'Nepali']

  return (
    <header className="w-full bg-[#E51E25] text-white py-3 px-4 md:px-8 flex items-center justify-between fixed top-0 left-0 right-0 z-[9999] shadow-md min-h-[60px]">
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
      <nav className="hidden md:flex gap-6">
  <a href="/">Home</a>
  <a href="/live">Live Streaming</a>
        <div className="relative cursor-pointer flex items-center gap-1 hover:text-slate-200 transition-colors py-2">
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setAgencyDropdownOpen(!agencyDropdownOpen)
            }}
            className="flex items-center gap-1 focus:outline-none"
          >
            <span>Agency</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown Menu - only shows on click */}
          {agencyDropdownOpen && (
            <div className="absolute top-full left-0 pt-2 z-50">
          <div className="bg-white text-slate-800 rounded-xl shadow-xl border border-slate-100 py-2 w-56">
            {/* Diamond Agency - navigates to separate page */}
            <Link
              to="/diamond-agency"
              onClick={() => setAgencyDropdownOpen(false)}
              className="w-full block text-left px-4 py-2 text-sm font-medium hover:bg-red-50 hover:text-[#E51E25] transition-colors"
            >
              💎 Diamond Agency
            </Link>
            {/* Other items - direct routes */}
            {[
              { name: 'Host Agency', tab: 'host-agency', icon: '🎤' },
                { name: 'Agency', tab: 'agency' },
              { name: 'Agent', tab: 'agent' },
              
              { name: 'Target System', tab: 'target' },
              { name: 'Revenue Distribution', tab: 'revenue' },
              { name: 'Agency Dashboard', tab: 'agency-dash' },
              { name: 'Agent Dashboard', tab: 'agent-dash' }
            ].map((item) => (
              <Link
                key={item.tab}
                to={`/agency?tab=${item.tab}`}
                onClick={() => setAgencyDropdownOpen(false)}
                className="w-full block text-left px-4 py-2 text-sm font-medium hover:bg-red-50 hover:text-[#E51E25] transition-colors"
              >
                {item.icon ? `${item.icon} ${item.name}` : item.name}
              </Link>
            ))}
          </div>
          </div>
          )}
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

      {/* Right side: Search, Language, Login & Menu Icon */}
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

        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
            className="hidden md:inline-flex items-center gap-2 bg-white bg-opacity-10 border border-white/20 text-white rounded-full px-3 py-2 text-sm hover:bg-opacity-20 transition"
          >
            <span>{selectedLanguage}</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {languageMenuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setSelectedLanguage(lang)
                    setLanguageMenuOpen(false)
                  }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100"
                >
                  {lang}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Login Button */}
        <button className="text-white hover:text-red-200 p-2 transition-colors" title="Login">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h5a3 3 0 013 3v1" />
          </svg>
        </button>

        {/* Hamburger Menu Icon */}
        <button
          onClick={() => {
            setMobileMenuOpen(!mobileMenuOpen)
            setLanguageMenuOpen(false)
          }}
          className="bg-[#B91319] hover:bg-[#a11015] p-2 rounded-lg transition-colors md:hidden"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#E51E25] border-t border-red-700 shadow-xl z-[9998]">
          <div className="px-4 py-4 space-y-3">
            <a href="/" className="block text-white hover:text-red-200 py-2">Home</a>
            <a href="/live" className="block text-white hover:text-red-200 py-2">Live Streaming</a>
            <div className="border-t border-red-700 pt-3">
              <div className="text-white font-bold mb-2">Agency</div>
              <Link
                to="/diamond-agency"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-white hover:text-red-200 py-2 pl-4"
              >
                💎 Diamond Agency
              </Link>
              {[
                { name: 'Agency', tab: 'agency' },
                { name: 'Agent', tab: 'agent' },
                { name: 'Host Agency', tab: 'host-agency', icon: '🎤' },
                { name: 'Target System', tab: 'target' },
                { name: 'Revenue Distribution', tab: 'revenue' },
                { name: 'Agency Dashboard', tab: 'agency-dash' },
                { name: 'Agent Dashboard', tab: 'agent-dash' }
              ].map((item) => (
                <Link
                  key={item.tab}
                  to={`/agency?tab=${item.tab}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-white hover:text-red-200 py-2 pl-4 w-full text-left"
                >
                  {item.icon ? `${item.icon} ${item.name}` : item.name}
                </Link>
              ))}
            </div>
            <a href="#gaming" className="block text-white hover:text-red-200 py-2">Gaming</a>
            <a href="#photo" className="block text-white hover:text-red-200 py-2">Photo/Video</a>
            <a href="#sponsor" className="block text-white hover:text-red-200 py-2">Social ad Sponsor</a>
            <a href="#about" className="block text-white hover:text-red-200 py-2">About</a>
          </div>
        </div>
      )}

    </header>
  )
}
