import ImageCarousel from "./ImageCarousel";
import Gallery from "./Gallery";
import { useState } from "react";
import lakeViewImg from "../images/lake_view.jpg";
import homeViewImg from "../images/home_view.jpg";
import houseFromLakeImg from "../images/house_from_lake.jpg";
import livingRoomImg from "../images/living_room.jpg";

const Hero = () => {
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

  const handleBookNow = () => {
    const bookingSection = document.getElementById("book-now");
    bookingSection?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSeeMore = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsGalleryOpen(true);
  };

  return (
    <>
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <ImageCarousel images={images} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        </div>
        <>
          <section className="relative h-screen">
            <div className="absolute inset-0">
              <ImageCarousel images={images} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
            </div>

            <div className="relative h-full flex flex-col items-center justify-center text-white px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 leading-tight">
                  Your Perfect Lakeside Retreat
                </h2>
                <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
                  Experience breathtaking views and unforgettable memories at
                  Maloney Lake House
                </p>
                <div className="flex justify-center">
                  <div className="flex gap-4">
                    <button
                      onClick={handleBookNow}
                      className="bg-blue-800 hover:bg-blue-900 text-white font-medium py-3 px-8 rounded-md transition-all duration-300 transform hover:scale-105"
                    >
                      Book Your Stay
                    </button>
                    <button
                      onClick={handleSeeMore}
                      className="bg-white text-blue-800 border border-blue-800 hover:bg-blue-100 font-medium py-3 px-8 rounded-md transition-all duration-300 transform hover:scale-105"
                    >
                      See More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Gallery
            images={images}
            isOpen={isGalleryOpen}
            onClose={() => setIsGalleryOpen(false)}
          />
        </>
        <div className="relative h-full flex flex-col items-center justify-center text-white px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 leading-tight">
              Your Perfect Lakeside Retreat
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              Experience breathtaking views and unforgettable memories at
              Maloney Lake House
            </p>
            <div className="flex justify-center">
              <div className="flex gap-4">
                <button
                  onClick={handleBookNow}
                  className="bg-blue-800 hover:bg-blue-900 text-white font-medium py-3 px-8 rounded-md transition-all duration-300 transform hover:scale-105"
                >
                  Book Your Stay
                </button>
                <button
                  onClick={() => setIsGalleryOpen(true)}
                  className="bg-white text-blue-800 border border-blue-800 hover:bg-blue-100 font-medium py-3 px-8 rounded-md transition-all duration-300 transform hover:scale-105"
                >
                  See More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Gallery
        images={images}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />
    </>
  );
};

export default Hero;
