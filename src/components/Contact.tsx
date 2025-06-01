import React, { useState } from "react";
import { Calendar, Mail, Phone } from "lucide-react";
import vrboImage from "../images/vrbo.png";
import emailjs from "emailjs-com";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
    message: "",
  });

  const getNextSaturday = (date: Date) => {
    const day = date.getDay();
    const diff = (6 - day + 7) % 7; // 6 is Saturday (Sun=0)
    const nextSaturday = new Date(date);
    nextSaturday.setDate(date.getDate() + diff);
    return nextSaturday;
  };

  // Helper: Format date to yyyy-mm-dd string for input[type=date]
  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  const today = new Date();
  const minCheckInDate = formatDate(today);

  const formatPhoneNumber = (value: string): string => {
    const cleaned = value.replace(/\D/g, "").slice(0, 10); // remove non-digits
    const length = cleaned.length;

    if (length < 4) return cleaned;
    if (length < 7) return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(
      6,
      10
    )}`;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "checkIn") {
      const selectedDate = new Date(value);
      const nextSaturday = getNextSaturday(selectedDate);

      // If selected checkIn is not Saturday, reset it to next Saturday
      const correctedCheckIn = formatDate(nextSaturday);

      // Automatically set checkOut to 7 days later (next Saturday)
      const checkOutDate = new Date(nextSaturday);
      checkOutDate.setDate(checkOutDate.getDate() + 7);
      const correctedCheckOut = formatDate(checkOutDate);

      setFormData((prev) => ({
        ...prev,
        checkIn: correctedCheckIn,
        checkOut: correctedCheckOut,
      }));
    } else if (name === "checkOut") {
      // Optional: ignore manual checkOut input or enforce same logic
      // Here we simply prevent user changing checkOut manually:
      return;
    } else if (name === "phone") {
      setFormData((prev) => ({
        ...prev,
        [name]: formatPhoneNumber(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      guests: formData.guests,
      message: formData.message,
    };

    try {
      await emailjs.send(
        "your_service_id",
        "your_template_id",
        templateParams,
        "your_user_id" // or 'public key' if using the new EmailJS dashboard
      );

      alert("Thank you for your inquiry! We will contact you soon.");

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        checkIn: "",
        checkOut: "",
        guests: "2",
        message: "",
      });
    } catch (error) {
      console.error("EmailJS error:", error);
      alert("There was an issue submitting the form. Please try again later.");
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white" id="book-now">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-blue-950 mb-4">
            Book Your Stay
          </h2>
          <p className="text-lg text-stone-600 max-w-3xl mx-auto">
            Ready for an unforgettable lakeside getaway? Check us out on VRBO or
            submit a direct booking request with us to avoid additional fees!
          </p>
          <a
            href="https://t.vrbo.io/6YCKSv4iPTb"
            target="_blank"
            rel="noopener noreferrer"
            className="block mx-auto mt-6 rounded-md transition-all duration-300 transform hover:scale-105 shadow-md"
            style={{
              backgroundImage: `url(${vrboImage})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              width: "200px", // Adjust as needed
              height: "60px", // Adjust as needed
              backgroundColor: "#0E214B", // Optional, fallback color
            }}
            aria-label="Book on VRBO"
          >
            {/* Empty content to keep button visually focused on background image */}
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-stone-50 rounded-lg p-8 shadow-sm"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-stone-700 font-medium mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-stone-700 font-medium mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-stone-700 font-medium mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="guests"
                    className="block text-stone-700 font-medium mb-2"
                  >
                    Number of Guests
                  </label>
                  <input
                    type="number"
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="checkIn"
                    className="block text-stone-700 font-medium mb-2"
                  >
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    id="checkIn"
                    name="checkIn"
                    value={formData.checkIn}
                    min={minCheckInDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="checkOut"
                    className="block text-stone-700 font-medium mb-2"
                  >
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    id="checkOut"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <p>
                <b>
                  Please keep in mind we only accept bookings of at least one
                  week (Check-In and Check-Out on Saturdays)
                </b>
              </p>
              <br />
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-stone-700 font-medium mb-2"
                >
                  Additional Information
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tell us about any special requests or questions..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-800 hover:bg-blue-900 text-white font-medium py-3 px-6 rounded-md transition-all duration-300 transform hover:scale-[1.01]"
              >
                Submit Booking Request
              </button>
            </form>
          </div>

          <div>
            <div className="bg-blue-50 p-8 rounded-lg shadow-sm h-full">
              <h3 className="text-2xl font-serif font-bold text-blue-900 mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-blue-700 mt-1 mr-3" />
                  <div>
                    <p className="font-medium text-stone-800">Email Us</p>
                    <a
                      href="mailto:info@maloneylakehouse.com"
                      className="text-blue-600 hover:underline"
                    >
                      info@maloneylakehouse.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-blue-700 mt-1 mr-3" />
                  <div>
                    <p className="font-medium text-stone-800">Call Us</p>
                    <a
                      href="tel:+18135058341"
                      className="text-blue-600 hover:underline"
                    >
                      (813) 505-8341
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-blue-700 mt-1 mr-3" />
                  <div>
                    <p className="font-medium text-stone-800">Booking Season</p>
                    <p className="text-stone-700">
                      Year-round week long rentals available
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-blue-200">
                <h4 className="font-medium text-blue-900 mb-3">
                  Property Policies
                </h4>
                <ul className="space-y-2 text-stone-700">
                  <li>
                    • Summer Bookings - Must book for a week (Saturday -
                    Saturday)
                  </li>
                  <li>• Offseason Bookings - 3 night minimum</li>
                  <li>• Check-in: 4:00 PM</li>
                  <li>• Check-out: 10:00 AM</li>
                  <li>• No smoking</li>
                  <li>• No parties or events</li>
                  <li>• No pets</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
