const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">
              Maloney Lake House
            </h3>
            <p className="text-blue-200 mb-4">
              Your perfect lakeside retreat for memorable vacations and
              gatherings.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-blue-200 hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#the-house"
                  className="text-blue-200 hover:text-white transition-colors"
                >
                  The House
                </a>
              </li>
              <li>
                <a
                  href="#amenities"
                  className="text-blue-200 hover:text-white transition-colors"
                >
                  Amenities
                </a>
              </li>
              <li>
                <a
                  href="#location"
                  className="text-blue-200 hover:text-white transition-colors"
                >
                  Location
                </a>
              </li>
              <li>
                <a
                  href="#book-now"
                  className="text-blue-200 hover:text-white transition-colors"
                >
                  Book Now
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Contact</h3>
            <address className="not-italic text-blue-200">
              <p className="mb-2">
                9001 Maughan Trail,
                <br /> Seneca SC 29672
              </p>
              <p className="mb-2">Phone: (813) 505-8341</p>
              <p className="mb-2">Email: info@maloneylakehouse.com</p>
            </address>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-12 pt-8 text-center text-blue-300 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Maloney Lake House. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
