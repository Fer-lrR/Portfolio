import React, { useState } from 'react';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutMe } from './components/AboutMe';
import { Projects } from './components/Projects';
import { TechRadar } from './components/TechRadar';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingDock } from './components/FloatingDock';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const handleScrollToContact = () => {
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Cinematic RoDevs Preloader */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <div
        style={{
          minHeight: '100vh',
          width: '100%',
          maxWidth: '100%',
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.5s ease-in',
          position: 'relative'
        }}
      >
        {/* Navigation */}
        <Navbar onOpenContact={handleScrollToContact} />

        {/* Main Content */}
        <main style={{ flex: 1, width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
          <Hero onOpenContact={handleScrollToContact} />
          <AboutMe />
          <Projects />
          <TechRadar />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating Quick Action Dock (WhatsApp & Back to Top) */}
        <FloatingDock />
      </div>
    </>
  );
};

export default App;
