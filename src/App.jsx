import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import AgencyViewer from './components/AgencyViewer'
import DownloadSection from './components/DownloadSection'
import FeaturesGrid from './components/FeaturesGrid'
import Footer from './components/Footer'
import DiamondAgencyPage from './pages/DiamondAgencyPage'

function HomePage() {
  const [selectedAgencyTab, setSelectedAgencyTab] = useState(null)

  return (
    <div className="min-h-screen bg-[#FFFDFE] text-slate-800 flex flex-col font-sans selection:bg-red-500 selection:text-white">
      {/* Navigation Header */}
      <Header onSelectAgencyTab={(tab) => {
        setSelectedAgencyTab(tab)
        // Smooth scroll to the agency portal section
        setTimeout(() => {
          document.getElementById('agency-portal')?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }} />

      {/* Main Container */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Dynamic Agency Portal Section */}
        {selectedAgencyTab && (
          <div id="agency-portal" className="scroll-mt-20">
            <AgencyViewer
              activeTab={selectedAgencyTab}
              onClose={() => setSelectedAgencyTab(null)}
            />
          </div>
        )}

        {/* Welcome & Download Section */}
        <DownloadSection />

        {/* Core Features Grid */}
        <FeaturesGrid />
      </main>

      {/* Dark Theme Footer */}
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/diamond-agency" element={<DiamondAgencyPage />} />
    </Routes>
  )
}

export default App
