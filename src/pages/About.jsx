import WhatsAppIcon from '../components/icons/WhatsAppIcon';
import { Phone } from 'lucide-react';
import { companyInfo } from '../data/companyInfo';
import { companyFeatures } from '../data/siteData';

const About = () => {
  return (
  <div className="min-h-screen pt-20 pb-8">
      {/* Hero */}
  <section className="py-6 md:py-8 bg-gradient-to-br from-brand-canvas to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3 text-brand-ink">About {companyInfo.name}</h1>
              <p className="text-base text-brand-muted-ink mb-3">
                Founded with a passion for travel and a mission to simplify exploring the world, {companyInfo.name} offers
                customized tour packages across the globe — crafted to suit every traveler's dream and budget.
              </p>
              <p className="text-brand-muted-ink mb-3">Let's make your next journey truly unforgettable.</p>
              <p className="font-semibold text-primary mb-5 text-base">{companyInfo.name} – {companyInfo.tagline}.</p>
              <a href={`https://wa.me/${companyInfo.phone.whatsapp}`} className="custom-btn inline-flex items-center gap-2 text-sm">
                <WhatsAppIcon className="w-4 h-4" />
                Plan Your Journey
              </a>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=50&fm=webp"
                alt="Travel Experience"
                className="w-full rounded-2xl shadow-xl"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
  <section className="py-6 bg-brand-canvas">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">What Sets Us Apart</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyFeatures.map((f, i) => (
              <div key={i} className="bg-surface border-2 border-brand-hairline rounded-2xl p-5 shadow-sm feature-card transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-accent">
                <div className="feature-icon text-primary text-4xl mb-4">
                  <i className={f.icon}></i>
                </div>
                <h4 className="font-bold text-lg mb-2">{f.title}</h4>
                <p className="text-brand-muted-ink">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-8 bg-gradient-to-br from-[#fefcf8] via-[#fdfbf6] to-[#fcfaf5] dark:from-amber-950/25 dark:via-brand-surface dark:to-brand-surface">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-amber-900 dark:text-amber-200">Ready to Start Your Adventure?</h2>
          <p className="text-amber-800 dark:text-amber-300 mb-5">So, why wait? Message us today and let's plan your unforgettable Dubai experience.</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href={`https://wa.me/${companyInfo.phone.whatsapp}`} className="px-5 py-2.5 rounded-full text-white text-sm" style={{ background: '#25D366' }}>
              <WhatsAppIcon className="w-4 h-4 mr-2" />Message Us on WhatsApp
            </a>
            <a href={`tel:${companyInfo.phone.primary}`} className="px-5 py-2.5 rounded-full border-2 text-sm border-[#8b4513] text-[#8b4513] dark:border-amber-400 dark:text-amber-300">
              <Phone className="w-4 h-4 mr-2" />Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
