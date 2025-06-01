import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 bg-white ${
        scrolled ? 'shadow-md py-3' : 'py-5'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-serif font-bold text-blue-950">Maloney Lake House</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {['Home', 'The House', 'Amenities', 'Gallery', 'Location', 'Book Now'].map((item, index) => (
              <a 
                key={index}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-sm font-medium text-stone-800 transition-colors hover:text-blue-700"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Mobile Navigation Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="text-stone-800\" size={24} />
            ) : (
              <Menu className="text-stone-800" size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg absolute w-full py-4 px-2 transition-all duration-300 ease-in-out">
          <nav className="flex flex-col space-y-4">
            {['Home', 'The House', 'Amenities', 'Gallery', 'Location', 'Book Now'].map((item, index) => (
              <a 
                key={index}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-stone-800 text-lg font-medium px-4 py-2 hover:bg-blue-50 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;