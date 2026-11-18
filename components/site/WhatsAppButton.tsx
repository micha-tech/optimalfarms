import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/2348030001122?text=Hello%20Optimal%20Royal%20Farms%2C%20I%20would%20like%20to%20make%20an%20enquiry."
      target="_blank"
      rel="noreferrer"
      className="whatsapp-float no-print"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <MessageCircle size={22} />
    </a>
  );
}