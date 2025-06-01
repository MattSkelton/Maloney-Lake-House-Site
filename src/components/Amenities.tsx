import {
  Wifi,
  Tv,
  Utensils,
  Car,
  Thermometer,
  Coffee,
  Wind,
  Sailboat,
} from "lucide-react";

const Amenities = () => {
  const amenities = [
    { icon: <Wifi size={24} />, name: "High-Speed WiFi" },
    { icon: <Tv size={24} />, name: "Smart TVs" },
    { icon: <Utensils size={24} />, name: "Fully Equipped Kitchen" },
    { icon: <Car size={24} />, name: "Ample Parking" },
    { icon: <Thermometer size={24} />, name: "Heating & Air Conditioning" },
    { icon: <Coffee size={24} />, name: "Coffee Maker" },
    { icon: <Wind size={24} />, name: "Outdoor Fire Pit" },
    { icon: <Sailboat size={24} />, name: "Canoe & Kayaks" },
  ];
  const additonalAmenities = [
    "Private dock with swim ladder",
    "Gas grill on deck",
    "Board games & puzzles",
    "Washer & dryer",
    "Outdoor dining area",
    "Sheets, towels and toilet paper provided",
    "Paddle boards",
    "Beach Chairs",
    "Dock access to accommodate up to 3 boats",
  ];

  return (
    <section className="py-16 md:py-24 bg-white" id="amenities">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-blue-950 mb-4">
            Amenities & Features
          </h2>
          <p className="text-lg text-stone-600 max-w-3xl mx-auto">
            Our lakehouse is equipped with everything you need for a comfortable
            and memorable stay
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {amenities.map((amenity, index) => (
            <div
              key={index}
              className="bg-stone-50 p-6 rounded-lg flex flex-col items-center hover:shadow-md transition-shadow duration-300"
            >
              <div className="bg-blue-100 p-3 rounded-full mb-4 text-blue-800">
                {amenity.icon}
              </div>
              <span className="font-medium text-stone-800">{amenity.name}</span>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-blue-50 rounded-lg p-8">
          <h3 className="text-2xl font-serif font-bold text-blue-900 mb-4">
            Additional Amenities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {additonalAmenities.map((item, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-blue-700"></div>
                </div>
                <span className="ml-3 text-stone-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Amenities;
