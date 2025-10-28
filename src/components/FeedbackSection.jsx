import { useState } from 'react';
import { feedback as feedbackData } from '../data/siteData';

const FeedbackSection = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const feedbacks = feedbackData;

  const closeFeedback = () => {
    setSelectedCountry(null);
  };

  return (
    <>
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Customer Feedback
            </h2>
            <p className="text-gray-500">What our travelers say about their experiences</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {Object.keys(feedbacks).map((country) => (
              <div
                key={country}
                className="feedback-item cursor-pointer group"
                onClick={() => setSelectedCountry(country)}
              >
                <div
                  className="h-48 md:h-64 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl relative"
                  style={{
                    backgroundImage: `url(${feedbacks[country].image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-yellow-600/90 to-transparent flex items-end justify-center p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                    <h3 className="text-white text-2xl md:text-3xl font-black drop-shadow-lg tracking-wider">
                      {country}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feedback Modal */}
      {selectedCountry && (
        <div
          className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center p-4 animate-fade-in"
          onClick={closeFeedback}
        >
          <div
            className="bg-gradient-to-br from-yellow-50 to-orange-50 backdrop-blur-sm rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto relative transform scale-100 transition-transform"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeFeedback}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/10 hover:bg-primary hover:text-white flex items-center justify-center text-2xl text-gray-600 transition-all hover:scale-110"
            >
              ×
            </button>

            <h3 className="text-3xl font-bold text-primary mb-6 text-center">
              {feedbacks[selectedCountry].country} Testimonials
            </h3>

            <div className="space-y-6">
              {feedbacks[selectedCountry].testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white/50 rounded-2xl p-6 shadow-lg">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <i key={i} className="fas fa-star text-yellow-400 text-xl mx-1"></i>
                    ))}
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed mb-4 text-center">
                    "{testimonial.text}"
                  </p>
                  <p className="text-gray-900 font-semibold text-center">
                    - {testimonial.author}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackSection;
