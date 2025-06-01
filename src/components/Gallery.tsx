import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryProps {
  images: { src: string; alt: string }[];
  isOpen: boolean;
  onClose: () => void;
}

const Gallery: React.FC<GalleryProps> = ({ images, isOpen, onClose }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handlePrevImage = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const closeFullscreen = () => {
    setSelectedImageIndex(null);
  };

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedImageIndex !== null) {
        if (e.key === "ArrowLeft") handlePrevImage();
        if (e.key === "ArrowRight") handleNextImage();
        if (e.key === "Escape") closeFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [selectedImageIndex]);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      {selectedImageIndex !== null ? (
        // Full-screen image view
        <div className="relative w-full h-full flex items-center justify-center">
          <button
            onClick={closeFullscreen}
            className="absolute right-4 top-4 text-white hover:text-stone-300 transition-colors"
            aria-label="Close fullscreen view"
          >
            <X size={24} />
          </button>
          
          <button
            onClick={handlePrevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-stone-800 p-2 rounded-full shadow-md transition-all duration-200"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={handleNextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-stone-800 p-2 rounded-full shadow-md transition-all duration-200"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>

          <img
            src={images[selectedImageIndex].src}
            alt={images[selectedImageIndex].alt}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>
      ) : (
        // Grid view
        <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-xl animate-fade-in">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-stone-600 hover:text-stone-800 transition-colors"
            aria-label="Close gallery"
          >
            <X size={24} />
          </button>

          <div className="p-6">
            <h2 className="text-2xl font-serif font-bold text-blue-950 mb-6">
              Photo Gallery
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleImageClick(index)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;