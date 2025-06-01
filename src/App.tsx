import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import Amenities from './components/Amenities';
import Location from './components/Location';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans">
      <Header />
      <main>
        <Hero />
        <Features />
        <About />
        <Amenities />
        <Location />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;