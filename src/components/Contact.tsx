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
    guests: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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

    if (name === "phone") {
      setFormData((prev) => ({
        ...prev,
        [name]: formatPhoneNumber(value),
      }));
    } else if (name === "guests") {
      const guestValue = Math.min(parseInt(value || "0", 10), 20);
      setFormData((prev) => ({
        ...prev,
        [name]: guestValue.toString(),
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
    setIsSubmitting(true);

    // Format dates for better readability
    const formatDateForEmail = (dateString: string) => {
      if (!dateString) return "Not specified";
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    // Calculate number of nights
    const calculateNights = () => {
      if (!formData.checkIn || !formData.checkOut) return "Not specified";
      const checkIn = new Date(formData.checkIn);
      const checkOut = new Date(formData.checkOut);
      const timeDiff = checkOut.getTime() - checkIn.getTime();
      const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return nights > 0
        ? `${nights} night${nights > 1 ? "s" : ""}`
        : "Invalid dates";
    };

    const templateParams = {
      to_email: "maloneylakehousebooking@gmail.com",
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone || "Not provided",
      check_in_date: formatDateForEmail(formData.checkIn),
      check_out_date: formatDateForEmail(formData.checkOut),
      number_of_nights: calculateNights(),
      number_of_guests: formData.guests || "Not specified",
      additional_message: formData.message || "No additional message provided",
      booking_summary: `
New Booking Request - Maloney Lake House

Guest Information:
• Name: ${formData.name}
• Email: ${formData.email}
• Phone: ${formData.phone || "Not provided"}

Booking Details:
• Check-in: ${formatDateForEmail(formData.checkIn)}
• Check-out: ${formatDateForEmail(formData.checkOut)}
• Duration: ${calculateNights()}
• Number of Guests: ${formData.guests || "Not specified"}

Additional Information:
${formData.message || "No additional message provided"}

Please respond to this booking request as soon as possible.
      `.trim(),
    };

    try {
      // Initialize EmailJS with your public key
      emailjs.init("h5tb7MajjcKtPdQwM"); // Replace with your actual public key

      const result = await emailjs.send(
        "Maloney Lake House", // Replace with your EmailJS service ID
        "template_2uyz9fv", // Replace with your EmailJS template ID
        templateParams
      );

      console.log("Email sent successfully:", result);
      alert(
        "Thank you for your booking request! We will contact you within 24 hours to confirm availability and discuss details."
      );

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        checkIn: "",
        checkOut: "",
        guests: "",
        message: "",
      });
    } catch (error) {
      console.error("Failed to send email:", error);
      alert(
        "We're sorry, but there was an issue submitting your booking request. Please try again or contact us directly at maloneylakehousebooking@gmail.com or (813) 505-8341."
      );
    } finally {
      setIsSubmitting(false);
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
                    Your Name *
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
                    Email Address *
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
                    placeholder="123-456-7890"
                  />
                </div>

                <div>
                  <label
                    htmlFor="guests"
                    className="block text-stone-700 font-medium mb-2"
                  >
                    Number of Guests (Max 20)
                  </label>
                  <input
                    type="number"
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    min="1"
                    max="20"
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter number of guests"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="checkIn"
                    className="block text-stone-700 font-medium mb-2"
                  >
                    Check-in Date *
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
                    Check-out Date *
                  </label>
                  <input
                    type="date"
                    id="checkOut"
                    name="checkOut"
                    value={formData.checkOut}
                    min={formData.checkIn || minCheckInDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-blue-800 font-medium text-sm">
                  <strong>Summer Booking Policy:</strong> During peak summer
                  season, we require a minimum one-week stay with Saturday
                  check-in and check-out.
                </p>
              </div>

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
                  placeholder="Tell us about any special requests, questions, or additional details about your stay..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full font-medium py-3 px-6 rounded-md transition-all duration-300 transform hover:scale-[1.01] ${
                  isSubmitting
                    ? "bg-stone-400 cursor-not-allowed"
                    : "bg-blue-800 hover:bg-blue-900 text-white"
                }`}
              >
                {isSubmitting ? "Sending Request..." : "Submit Booking Request"}
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
                      href="mailto:maloneylakehousebooking@gmail.com"
                      className="text-blue-600 hover:underline"
                    >
                      maloneylakehousebooking@gmail.com
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
                    <p className="font-medium text-stone-800">Response Time</p>
                    <p className="text-stone-700">
                      We typically respond within 24 hours
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-blue-200">
                <h4 className="font-medium text-blue-900 mb-3">
                  Property Policies
                </h4>
                <ul className="space-y-2 text-stone-700 text-sm">
                  <li>
                    • Summer Bookings - Must book for a week (Saturday -
                    Saturday)
                  </li>
                  <li>• Off-season Bookings - Minimum 3 nights</li>
                  <li>• Check-in: 4:00 PM</li>
                  <li>• Check-out: 10:00 AM</li>
                  <li>• No smoking</li>
                  <li>• No parties or events</li>
                  <li>• No pets</li>
                </ul>
              </div>

              <div className="mt-6 p-4 bg-white rounded-lg border border-blue-200">
                <p className="text-sm text-stone-600">
                  <strong>Direct Booking Benefits:</strong> Book directly with
                  us to avoid platform fees and enjoy personalized service!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
