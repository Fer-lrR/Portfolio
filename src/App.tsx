import React, { useState } from 'react';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Architectures } from './components/Architectures';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { TechRadar } from './components/TechRadar';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

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
          display: 'flex',
          flexDirection: 'column',
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.5s ease-in'
        }}
      >
        {/* Navigation */}
        <Navbar onOpenContact={handleScrollToContact} />

        {/* Main Content */}
        <main style={{ flex: 1 }}>
          <Hero onOpenContact={handleScrollToContact} />
          <Projects />
          <Architectures />
          <Experience />
          <TechRadar />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default App;
