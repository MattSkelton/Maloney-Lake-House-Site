const Location = () => {
  return (
    <section className="py-16 md:py-24 bg-stone-100" id="location">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-blue-950 mb-4">
              Location & Surroundings
            </h2>
            <p className="text-lg text-stone-700 mb-6 leading-relaxed">
              The Maloney Lake House is nestled on the pristine shores of Lake
              Keowee, offering breathtaking views and easy access to both water
              activities and nearby attractions.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">
                  Water Activities
                </h3>
                <p className="text-stone-700">
                  Enjoy swimming, fishing, kayaking, and canoeing right from our
                  private dock. The lake is known for its clear waters and
                  abundant wildlife.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">
                  Nearby Attractions
                </h3>
                <ul className="list-disc pl-5 text-stone-700 space-y-2">
                  <li>
                    Clemson University and Memorial Stadium (30 min drive)
                  </li>
                  <li>Historic Downtown (15 min drive)</li>
                  <li>Mountain Hiking Trails (20 min drive)</li>
                  <li>Local Wineries & Breweries (25 min drive)</li>
                  <li>Golf Courses (20 min drive)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">
                  Getting Here
                </h3>
                <p className="text-stone-700">
                  We're located just 2 hours from the nearest major airport.
                  Detailed directions will be provided after booking.
                </p>
              </div>
            </div>
          </div>

          <div className="order-first lg:order-last mb-8 lg:mb-0">
            <div className="bg-white p-2 rounded-lg shadow-lg transform hover:scale-[1.01] transition-transform duration-300">
              <div className="w-full h-auto rounded overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3278.637412256632!2d-82.94193302349645!3d34.73953287290585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8858f5da0a127f5f%3A0x6f5a9d6fcbdbf42f!2s9001%20Maughan%20Trail%2C%20Seneca%2C%20SC%2029672!5e0!3m2!1sen!2sus!4v1748749909577!5m2!1sen!2sus"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Maloney Lake House Map"
                ></iframe>
              </div>
              <div className="mt-4 px-2 pb-2">
                <p className="text-sm text-stone-500 italic text-center">
                  Maloney Lake House – surrounded by natural beauty
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
