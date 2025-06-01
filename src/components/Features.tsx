import { Users, Home, Waves, Mountain } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Home className="w-8 h-8 text-blue-700" />,
      title: "Spacious Retreat",
      description:
        "8 bedrooms, 5.5 bathrooms, and over 6000 sq ft  accommodates 20 guests comfortably",
    },
    {
      icon: <Waves className="w-8 h-8 text-blue-700" />,
      title: "Waterfront Property",
      description:
        "Private dock with direct lake access for swimming and boating",
    },
    {
      icon: <Mountain className="w-8 h-8 text-blue-700" />,
      title: "Stunning Views",
      description: "Panoramic views of the lake and surrounding mountains",
    },
    {
      icon: <Users className="w-8 h-8 text-blue-700" />,
      title: "Family-Friendly",
      description:
        "Ideal for family gatherings, reunions, and creating lasting memories",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white" id="the-house">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-blue-950 mb-4">
            Experience Lakeside Luxury
          </h2>
          <p className="text-lg text-stone-600 max-w-3xl mx-auto">
            Our beautiful lakefront property offers everything you need for the
            perfect getaway
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-stone-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2 text-center">
                {feature.title}
              </h3>
              <p className="text-stone-600 text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
