import { useEffect, useState } from "react";
import { Mail } from "lucide-react";

const MobileContactButton = () => {
  const [isContactVisible, setIsContactVisible] = useState(false);

  useEffect(() => {
    const contactSection = document.getElementById("contact");
    if (!contactSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsContactVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );

    observer.observe(contactSection);
    return () => observer.disconnect();
  }, []);

  if (isContactVisible) return null;

  return (
    <a
      href="#contact"
      className="fixed bottom-4 left-4 right-4 z-40 flex items-center justify-center gap-2 rounded-full bg-blue-800 px-6 py-3 font-medium text-white shadow-xl transition-colors hover:bg-blue-900 md:hidden"
      aria-label="Go to the contact form"
    >
      <Mail size={18} />
      Contact Us
    </a>
  );
};

export default MobileContactButton;
