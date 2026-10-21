import ImageCarousel from "./ImageCarousel";
import Gallery from "./Gallery";
import { useState } from "react";
import { galleryImages } from "../utils/imageLoader";
import { Check, Share2 } from "lucide-react";

const Hero = () => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const handleContactUs = () => {
    const contactSection = document.getElementById("contact");
    contactSection?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSeeMore = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsGalleryOpen(true);
  };

  const copySiteLink = async () => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(window.location.href);
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = window.location.href;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      textArea.remove();
    }

    setLinkCopied(true);
    window.setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleShare = async () => {
    const shareData = {
      title: "Maloney Lake House",
      text: "Take a look at the Maloney Lake House on Lake Keowee.",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await copySiteLink();
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
      await copySiteLink();
    }
  };

  // Select first 4 images for the carousel
  const carouselImages = galleryImages.slice(0, 4);

  return (
    <>
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <ImageCarousel images={carouselImages} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center text-white px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 leading-tight">
              Your Perfect Lakeside Retreat
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              Experience breathtaking views and unforgettable memories at Maloney
              Lake House
            </p>
            <div className="flex justify-center">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={handleContactUs}
                  className="bg-blue-800 hover:bg-blue-900 text-white font-medium py-3 px-8 rounded-md transition-all duration-300 transform hover:scale-105"
                >
                  Contact Us Now
                </button>
                <button
                  onClick={handleSeeMore}
                  className="bg-white text-blue-800 border border-blue-800 hover:bg-blue-100 font-medium py-3 px-8 rounded-md transition-all duration-300 transform hover:scale-105"
                >
                  See More
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 bg-black/40 text-white border border-white/70 hover:bg-black/60 font-medium py-3 px-8 rounded-md transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
                  aria-label="Share Maloney Lake House"
                >
                  {linkCopied ? <Check size={18} /> : <Share2 size={18} />}
                  {linkCopied ? "Link Copied" : "Share"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Gallery isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} />
    </>
  );
};

export default Hero;
