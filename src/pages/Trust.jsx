import { motion } from 'framer-motion';
import { ShieldCheck, Award, Users, Lock, Star, Phone, RefreshCw, HeartHandshake } from 'lucide-react';
import WhatsAppIcon from '../components/icons/WhatsAppIcon';
import { Link } from 'react-router-dom';
import { companyInfo } from '../data/companyInfo';
import Kicker from '../components/revamp/Kicker';
import BreadcrumbTrail from '../components/revamp/BreadcrumbTrail';
import Section from '../components/revamp/Section';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

/**
 * /trust — REVAMP_PLAN §4.11. One-stop credibility page.
 */
export default function Trust() {
  const stats = [
    { icon: Users, num: '10,000+', label: 'families served since 2018' },
    { icon: Star, num: '4.8/5', label: 'average across Google + WhatsApp' },
    { icon: Award, num: '12', label: 'destinations, handpicked' },
    { icon: Phone, num: '24/7', label: 'expert support in Hindi + Arabic' },
  ];

  const promises = [
    { icon: ShieldCheck, title: 'Fixed prices, no hidden fees',
      body: 'The price we quote is the price you pay. GST, service charges, meals as listed — all inside the number.' },
    { icon: Lock, title: 'Secure payments',
      body: 'Payments processed by Razorpay (India) and PayTabs (UAE). We never store card details.' },
    { icon: RefreshCw, title: 'Fair cancellation',
      body: 'Where possible, we mirror hotel and airline cancellation windows — clearly stated on every package page.' },
    { icon: HeartHandshake, title: 'Real people, real WhatsApp',
      body: 'The number you reach on WhatsApp is a person on our team, not a bot. Replies typically within 30 minutes during business hours.' },
  ];

  return (
    <div className="pb-20">
      {/* Hero */}
      <div className="bg-brand-scrim text-white pt-28 md:pt-32 pb-16">
        <div className="container-custom">
          <BreadcrumbTrail items={[{ label: 'Trust' }]} tone="light" />
          <div className="mt-4 max-w-3xl">
            <Kicker tone="orange">Why families trust us</Kicker>
            <h1 className="text-display font-poppins font-bold mt-3">
              The receipts, not the <span className="text-brand-orange">adjectives.</span>
            </h1>
            <p className="mt-4 text-body-lg text-white/80 font-canva-sans max-w-2xl">
              We don't sell "life-changing journeys." We sell trips that show up on time, at the price we quoted. Here's the evidence.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="container-custom -mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-2xl bg-surface border border-brand-hairline p-4 md:p-6 shadow-soft-md"
            >
              <s.icon className="w-5 h-5 text-brand-orange mb-3" />
              <div className="text-h2 font-poppins font-bold text-brand-ink leading-none">{s.num}</div>
              <p className="mt-1.5 text-xs md:text-sm text-brand-muted-ink font-canva-sans leading-snug">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Our promises */}
      <Section kicker="Our promises" title="What we commit to, in plain English" bg="canvas">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {promises.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-2xl bg-surface border border-brand-hairline p-5 md:p-6"
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-brand-orange/10 text-brand-orange">
                <p.icon className="w-5 h-5" />
              </span>
              <h3 className="mt-4 text-h3 font-poppins font-semibold text-brand-ink">{p.title}</h3>
              <p className="mt-2 text-sm text-brand-muted-ink font-canva-sans leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Policies */}
      <Section kicker="The fine print" title="Refund, cancellation & booking policies" bg="white">
        <div className="max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="refund">
              <AccordionTrigger>How refunds work</AccordionTrigger>
              <AccordionContent>
                Refunds are processed to your original payment method within 7 business days of cancellation.
                Hotel and airline cancellation windows apply — these are stated on each package's detail page before you book.
                Third-party charges (visa fees, activity tickets already issued) are non-refundable but always disclosed upfront.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="cancel">
              <AccordionTrigger>Cancellation timelines</AccordionTrigger>
              <AccordionContent>
                Free cancellation windows vary by package (typically 15–45 days before departure). Within the window: full refund minus payment gateway fees.
                Outside the window: partial refund based on what we can recover from suppliers. We share the exact breakdown before confirming any charge.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="payment">
              <AccordionTrigger>How payments work</AccordionTrigger>
              <AccordionContent>
                We accept UPI, cards, and net banking via Razorpay (INR) and PayTabs (AED). No advance is charged until you say "book" — the "Get quote" button is enquiry only.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="privacy">
              <AccordionTrigger>What we do with your data</AccordionTrigger>
              <AccordionContent>
                We use your phone and email only to reach you about the trip. We never sell contact data to third parties.
                Payment details are handled entirely by the payment gateway — we don't store card numbers.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Section>

      {/* Contact CTA */}
      <div className="container-custom mt-8">
        <div className="rounded-2xl bg-gradient-to-br from-brand-scrim to-brand-scrim/80 text-white p-8 md:p-12 text-center">
          <Kicker tone="orange">Still not sure?</Kicker>
          <h3 className="text-h2 font-poppins font-bold mt-3">Talk to a person, not a form.</h3>
          <p className="mt-3 text-white/80 font-canva-sans max-w-lg mx-auto">
            Message on WhatsApp — most enquiries get a reply within 30 minutes.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-2 justify-center">
            <a href={`https://wa.me/${String(companyInfo.phone.whatsapp).replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="w-full sm:w-auto shadow-glow-orange">
                <WhatsAppIcon className="w-4 h-4 mr-2" /> WhatsApp us
              </Button>
            </a>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/20 bg-white/5 text-white hover:bg-white/10">
                All ways to reach us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
