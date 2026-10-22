import { Building2, Landmark, MapPin } from 'lucide-react';
import { companyInfo } from '../data/companyInfo';
import ContactEnquiryForm from '../components/ContactEnquiryForm';
import WhyChooseUs from '../components/WhyChooseUs';
import WhatsAppIcon from '../components/icons/WhatsAppIcon';

/**
 * Office marker for the address cards.
 *
 * These used to be flat line-art SVGs hotlinked from a third-party CDN. They
 * were drawn in near-black with no fill, so on the dark surface they all but
 * disappeared — and nothing about them was ours. A token-driven orange tile
 * reads correctly in both themes and never depends on someone else's host.
 */
function OfficeMarker({ icon: Icon }) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex w-14 h-14 shrink-0 items-center justify-center rounded-2xl bg-brand-orange/10 text-brand-orange ring-1 ring-brand-orange/20"
    >
      <Icon className="w-7 h-7" />
    </span>
  );
}

export default function Contact() {
  return (
    <div className="min-h-screen pt-20 pb-10">
      {/* Top banner */}
      <section className="page-band py-6 md:py-8" aria-labelledby="contact-heading">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-sm uppercase tracking-wider text-primary font-semibold">Contact Us</p>
            <h1 id="contact-heading" className="text-3xl md:text-4xl font-extrabold mt-2 text-brand-ink">
              What Are You <span className="text-accent">Waiting For</span>
            </h1>
            <p className="mt-3 text-brand-muted-ink">Reach out to us anytime, from anywhere - we're always here to help and look forward to assisting you.</p>
          </div>
        </div>
      </section>

      {/* Why travel with us — moved here from the home page */}
      <WhyChooseUs />

      {/* The form itself — "Contact Us" should land on something you can fill in,
          not just a list of office addresses. */}
      <section className="py-8" aria-labelledby="enquiry-form">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto rounded-2xl border border-brand-hairline bg-surface p-6 md:p-8 shadow-soft-md">
            <h2 id="enquiry-form" className="text-2xl md:text-3xl font-bold mb-2 text-brand-ink">
              Tell us about your trip
            </h2>
            <p className="text-brand-muted-ink mb-6">
              Fill this in and an expert calls you back within 24 hours — or message us on WhatsApp for an instant reply.
            </p>
            <ContactEnquiryForm />
          </div>
        </div>
      </section>

      {/* India Offices */}
      <section className="py-6" aria-labelledby="india-offices">
        <div className="container mx-auto px-4">
          <h2 id="india-offices" className="text-2xl md:text-3xl font-bold mb-6 text-brand-ink">
            Our Offices Within <em>India</em>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Karnal Office */}
            <article className="bg-surface rounded-2xl border border-brand-hairline shadow-soft-md p-6 flex gap-4 items-start">
              <OfficeMarker icon={Landmark} />
              <div>
                <h3 className="text-xl font-bold text-brand-ink">{companyInfo.address.karnal.city}</h3>
                <address className="not-italic text-brand-muted-ink mt-1">
                  {companyInfo.address.karnal.full}
                </address>
                <div className="mt-2 space-y-1 text-sm text-brand-muted-ink">
                  <div>
                    <a href={`mailto:${companyInfo.email.primary}`} className="hover:text-orange hover:underline font-medium">
                      Email us: {companyInfo.email.primary}
                    </a>
                  </div>
                  <div>
                    Call us: <a href={`tel:${companyInfo.phone.primary}`} className="hover:text-orange hover:underline font-medium">{companyInfo.phone.primary}</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>WhatsApp:</span>
                    <WhatsAppIcon className="w-4 h-4 text-[#25D366]" aria-hidden="true" />
                    <a className="hover:text-orange hover:underline font-medium" href={`https://wa.me/${companyInfo.phone.whatsapp}?text=${encodeURIComponent(companyInfo.name)}`}>
                      {companyInfo.phone.primary}
                    </a>
                  </div>
                  <div className="mt-2">
                    <a href={companyInfo.address.karnal.mapLink} target="_blank" rel="noopener noreferrer" className="text-orange hover:underline font-medium flex items-center gap-1">
                      <MapPin className="w-4 h-4" aria-hidden="true" /> View on Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </article>

            {/* Noida Office */}
            <article className="bg-surface rounded-2xl border border-brand-hairline shadow-soft-md p-6 flex gap-4 items-start">
              <OfficeMarker icon={Building2} />
              <div>
                <h3 className="text-xl font-bold text-brand-ink">{companyInfo.address.noida.city}</h3>
                <address className="not-italic text-brand-muted-ink mt-1">
                  {companyInfo.address.noida.full}
                </address>
                <div className="mt-2 space-y-1 text-sm text-brand-muted-ink">
                  <div>
                    <a href={`mailto:${companyInfo.email.primary}`} className="hover:text-orange hover:underline font-medium">
                      Email us: {companyInfo.email.primary}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>WhatsApp:</span>
                    <WhatsAppIcon className="w-4 h-4 text-[#25D366]" aria-hidden="true" />
                    <a className="hover:text-orange hover:underline font-medium" href={`https://wa.me/${companyInfo.phone.noida.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(companyInfo.name)}`}>
                      {companyInfo.phone.noida}
                    </a>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Overseas Offices */}
      <section className="py-6" aria-labelledby="overseas-offices">
        <div className="container mx-auto px-4">
          <h2 id="overseas-offices" className="text-2xl md:text-3xl font-bold mb-6 text-brand-ink">
            Our Overseas <em>Offices</em>
          </h2>
          <article className="bg-surface rounded-2xl border border-brand-hairline shadow-soft-md p-6 flex gap-4 items-start">
            <OfficeMarker icon={Building2} />
            <div>
              <h3 className="text-xl font-bold text-brand-ink">Dubai</h3>
              <address className="not-italic text-brand-muted-ink mt-2 space-y-3">
                <div>
                  <strong className="font-semibold">Corporate Office:</strong><br />
                  {companyInfo.address.dubai.corporate}
                </div>
                <div className="text-sm">
                  <a href={`mailto:${companyInfo.email.primary}`} className="hover:text-orange hover:underline font-medium">
                    Email: {companyInfo.email.primary}
                  </a><br />
                  <a href={companyInfo.website} target="_blank" rel="noreferrer" className="hover:text-orange hover:underline font-medium">
                    Website: {companyInfo.website.replace('https://', 'www.')}
                  </a>
                </div>
                <hr className="border-brand-hairline" />
                <div>
                  <strong className="font-semibold">Retail Office:</strong><br />
                  {companyInfo.address.dubai.branch}
                </div>
                <div className="text-sm">
                  <a href={`mailto:${companyInfo.email.primary}`} className="hover:text-orange hover:underline font-medium">
                    Email: {companyInfo.email.primary}
                  </a><br />
                  <a href={companyInfo.website} target="_blank" rel="noreferrer" className="hover:text-orange hover:underline font-medium">
                    Website: {companyInfo.website.replace('https://', 'www.')}
                  </a><br />
                  <a href="tel:043035888" className="hover:text-orange hover:underline font-medium">
                    Call Us: 043035888
                  </a>
                </div>
              </address>
            </div>
          </article>
        </div>
      </section>

      {/* Map */}
      <section className="py-8" aria-labelledby="location-map">
        <div className="container mx-auto px-4">
          <h2 id="location-map" className="text-2xl md:text-3xl font-bold mb-4 text-brand-ink">
            Where to Find <em>Us?</em>
          </h2>
          <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3460.9169472391054!2d76.9920!3d29.6920!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390e6f54b66b4457%3A0xc348b94090b84039!2sSector%2013%2C%20Karnal%2C%20Haryana%20132001%2C%20India!5e0!3m2!1sen!2sus!4v1714571021481!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Traverse Globe Karnal Office Location Map"
            ></iframe>
          </div>
          <div className="mt-4 text-center">
            <a 
              href={companyInfo.address.karnal.mapLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-scrim text-white px-6 py-3 rounded-full hover:bg-brand-scrim/90 transition-all font-medium"
            >
              <MapPin className="w-4 h-4" aria-hidden="true" />
              Open in Google Maps
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}