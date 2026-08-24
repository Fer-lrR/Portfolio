import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Architectures } from './components/Architectures';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { TechRadar } from './components/TechRadar';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const handleScrollToContact = () => {
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navigation */}
      <Navbar onOpenContact={handleScrollToContact} />

      {/* Main Content */}
      <main style={{ flex: 1 }}>
        <Hero onOpenContact={handleScrollToContact} />
        <Architectures />
        <Projects />
        <Experience />
        <TechRadar />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
