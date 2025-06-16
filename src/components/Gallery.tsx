import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryImages } from "../utils/imageLoader";

interface GalleryProps {
  isOpen: boolean;
  onClose: () => void;
}

const Gallery: React.FC<GalleryProps> = ({ isOpen, onClose }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handlePrevImage = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) => {
      if (prev === null) return 0;
      return prev === 0 ? galleryImages.length - 1 : prev - 1;
    });
  };

  const handleNextImage = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) => {
      if (prev === null) return 0;
      return prev === galleryImages.length - 1 ? 0 : prev + 1;
    });
  };

  const closeFullscreen = () => {
    setSelectedImageIndex(null);
  };

  React.useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedImageIndex !== null) {
        if (e.key === "ArrowLeft") handlePrevImage();
        if (e.key === "ArrowRight") handleNextImage();
        if (e.key === "Escape") closeFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [selectedImageIndex, isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
      {selectedImageIndex !== null ? (
        // Fullscreen view
        <div className="relative w-full h-full flex items-center justify-center">
          <button
            onClick={closeFullscreen}
            className="absolute right-4 top-4 text-white hover:text-stone-300 transition-colors z-10"
            aria-label="Close fullscreen view"
          >
            <X size={24} />
          </button>

          <button
            onClick={handlePrevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-stone-800 p-2 rounded-full shadow-md transition-all duration-200 z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={handleNextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-stone-800 p-2 rounded-full shadow-md transition-all duration-200 z-10"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>

          <div className="flex flex-col items-center max-h-[90vh] max-w-[90vw]">
            <img
              src={galleryImages[selectedImageIndex].src}
              alt={galleryImages[selectedImageIndex].alt}
              className="max-h-[80vh] max-w-[90vw] object-contain"
            />
            <div className="mt-4 text-center text-white bg-black/60 px-4 py-2 rounded-lg max-w-[90vw]">
              <p className="text-lg font-medium mb-1">
                {galleryImages[selectedImageIndex].alt}
              </p>
              <p className="text-sm text-stone-200">
                {galleryImages[selectedImageIndex].description}
              </p>
            </div>
          </div>
        </div>
      ) : (
        // Scrollable Grid View
        <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-xl animate-fade-in">
          <button
            onClick={onClose}
            className="sticky top-4 right-4 float-right text-stone-600 hover:text-stone-800 transition-colors z-10"
            aria-label="Close gallery"
          >
            <X size={24} />
          </button>

          <div className="p-6 pt-2">
            <h2 className="text-2xl font-serif font-bold text-blue-950 mb-6">
              Photo Gallery
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="bg-stone-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleImageClick(index)}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-stone-800 mb-2">
                      {image.alt}
                    </h3>
                    <p className="text-sm text-stone-600 leading-relaxed">
                      {image.description}
                    </p>
                  </div>
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