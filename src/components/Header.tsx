import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Gallery from "./Gallery";
import lakeViewImg from "../images/lake_view.jpg";
import homeViewImg from "../images/home_view.jpg";
import houseFromLakeImg from "../images/house_from_lake.jpg";
import livingRoomImg from "../images/living_room.jpg";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const images = [
    {
      src: lakeViewImg,
      alt: "Lake house with stunning water view",
    },
    {
      src: homeViewImg,
      alt: "Cozy lakeside retreat",
    },
    {
      src: houseFromLakeImg,
      alt: "Private dock and beach",
    },
    {
      src: livingRoomImg,
      alt: "Beautiful interior with lake views",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGalleryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsGalleryOpen(true);
    setIsOpen(false); // Close mobile menu if open
  };

  const navItems = [
    { label: "Home", href: "#" },
    { label: "The House", href: "#the-house" },
    { label: "Amenities", href: "#amenities" },
    { label: "Gallery", href: "#gallery", onClick: handleGalleryClick },
    { label: "Location", href: "#location" },
    { label: "Book Now", href: "#book-now" },
  ];

  return (
    <>
      <header
        className={`fixed w-full z-50 transition-all duration-300 bg-white ${
          scrolled ? "shadow-md py-3" : "py-5"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-serif font-bold text-blue-950">
                Maloney Lake House
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  onClick={item.onClick}
                  className="text-sm font-medium text-stone-800 transition-colors hover:text-blue-700"
                >
                  {item.label}
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
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  onClick={(e) => {
                    if (item.onClick) {
                      item.onClick(e);
                    }
                    setIsOpen(false);
                  }}
                  className="text-stone-800 text-lg font-medium px-4 py-2 hover:bg-blue-50 rounded-md"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      <Gallery
        images={images}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />
    </>
  );
};

export default Header;
