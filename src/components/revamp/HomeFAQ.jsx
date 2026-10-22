import Section from './Section';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

/**
 * Long-form FAQ at bottom of home for SEO + shopper confidence.
 * REVAMP_PLAN §4.1 step 13, Cleartrip pattern.
 */
const FAQS = [
  {
    q: 'How do I book a trip with Traverse Globe?',
    a: 'Browse packages, tap "Get quote" on any card, and our team replies within 30 minutes via WhatsApp or email. Once you approve dates + hotels, we send a payment link. No advance is charged until you say "book."',
  },
  {
    q: 'What\'s different about how you price?',
    a: 'The number you see is what you pay. GST, service charges, and listed meals are already inside the price. Third-party add-ons like visas and activity tickets are shown separately with their exact costs, upfront.',
  },
  {
    q: 'Do you serve customers in the UAE?',
    a: 'Yes — we\'re a preferred partner for UAE-based Indian families. We handle bookings in INR or AED, WhatsApp support is available in Hindi and Arabic, and many of our packages depart from Sharjah / Abu Dhabi / Dubai.',
  },
  {
    q: 'What if my plans change after booking?',
    a: 'Free cancellation windows vary per package and are stated on every detail page. Within the window, we refund minus payment gateway fees. Outside it, we recover whatever we can from suppliers and share the exact breakdown before charging.',
  },
  {
    q: 'Are the hotels really the ones you show?',
    a: 'Yes. Every package lists its hotels by name (not "3-star hotel or similar"). If a booked hotel becomes unavailable, we upgrade at no cost — never downgrade.',
  },
  {
    q: 'Do you handle solo travellers?',
    a: 'We specialise in families and couples, but we do accept solo bookings on request. Reach out on WhatsApp and we\'ll build something.',
  },
  {
    q: 'Can I customise the itinerary?',
    a: 'Yes — most packages are customisable within reason (add a day, change a hotel category, swap an activity). Tell us what you want and we\'ll adjust the quote.',
  },
];

export default function HomeFAQ() {
  return (
    <Section kicker="Common questions" title="Answers before you ask" bg="white">
      <div className="max-w-3xl">
        <Accordion type="single" collapsible>
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`f${i}`}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
