const About = () => {
  const handleBookNow = () => {
    const bookingSection = document.getElementById("book-now");
    bookingSection?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section className="py-16 md:py-24 bg-stone-100" id="about">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-blue-950 mb-6">
              Welcome to The Maloney Lake House
            </h2>
            <p className="text-lg text-stone-700 mb-4 leading-relaxed">
              Nestled on the serene shores of Lake Keowee, our lakefront
              property offers an idyllic retreat for families and friends
              seeking relaxation and adventure alike.
            </p>
            <p className="text-lg text-stone-700 mb-4 leading-relaxed">
              Built in 2004 and lovingly maintained, our home features modern
              amenities while preserving the classic lakehouse charm.
              Floor-to-ceiling windows offer breathtaking views from almost
              every room.
            </p>
            <p className="text-lg text-stone-700 mb-6 leading-relaxed">
              Whether you're enjoying morning coffee on the wraparound deck,
              swimming from our private dock, or gathering around the fire pit
              for s'mores under the stars, The Maloney Lake House provides the
              perfect setting for creating treasured memories.
            </p>
            <button
              className="bg-blue-800 hover:bg-blue-900 text-white font-medium py-3 px-8 rounded-md transition-all duration-300"
              onClick={handleBookNow}
            >
              Book Now
            </button>
          </div>
          <div className="order-1 lg:order-2">
            <div className="rounded-lg overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-300">
              <div
                className="relative w-full"
                style={{ paddingBottom: "56.25%" }}
              >
                <iframe
                  src="https://player.vimeo.com/video/170536418?badge=0&autopause=0&player_id=0&app_id=58479"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  title="Lake House Aerial"
                  className="absolute top-0 left-0 w-full h-full"
                  style={{ border: 0 }}
                ></iframe>
              </div>
              <script src="https://player.vimeo.com/api/player.js"></script>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
