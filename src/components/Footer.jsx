const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4 gradient-text">Traverse Globe</h3>
            <p className="text-gray-400">
              Your trusted travel partner for unforgettable journeys across the world. 
              We specialize in creating unique travel experiences that you'll cherish forever.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-400 hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/services" className="text-gray-400 hover:text-primary transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="/blog" className="text-gray-400 hover:text-primary transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <i className="fas fa-phone mr-3"></i>
                <span>+91 9997085457</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-3"></i>
                <span>mail@traverseglobe.com</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-map-marker-alt mr-3"></i>
                <span>Delhi, India</span>
              </li>
            </ul>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors text-xl">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors text-xl">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors text-xl">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors text-xl">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} TraverseGlobe. All rights reserved. | Crafted with ❤️ for travelers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


