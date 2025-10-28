const FloatingButtons = () => {
  return (
    <div className="fixed right-5 bottom-24 z-50 flex flex-col gap-4">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/919997085457"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn bg-gradient-to-br from-[#25D366] to-[#128C7E]"
        aria-label="WhatsApp"
      >
        <i className="fab fa-whatsapp"></i>
      </a>

      {/* Call Button */}
      <a
        href="tel:+919997085457"
        className="floating-btn bg-gradient-to-br from-[#ff6b35] to-[#f7931e]"
        aria-label="Call Us"
      >
        <i className="fas fa-phone"></i>
      </a>
    </div>
  );
};

export default FloatingButtons;
