const fs = require('fs');

const articles = [
  {
    _id: "blog-bali",
    title: "Bali for First-Timers: 7-Day Itinerary That Balances Beach and Culture",
    slug: "bali-for-first-timers",
    publishedAt: "2025-08-18T10:00:00.000Z",
    excerpt: "Uluwatu sunsets, Ubud rice terraces, waterfalls, and cafés—this balanced plan saves you time and avoids FOMO.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1280&q=50",
    category: "Guides",
    readTime: 9,
    content: [
      "Welcome to Bali, the Island of the Gods! If it's your first time visiting, balancing the serene culture with the vibrant beach scenes can be tricky. Here is a perfect 7-day itinerary to help you experience the best of both worlds.",
      "**Day 1-2: Seminyak & Canggu (Beaches & Cafes)**",
      "Start your trip by unwinding at the trendy beach clubs in Seminyak. Grab a coconut, enjoy the sunset, and eat your heart out at the aesthetic cafes in Canggu.",
      "**Day 3-4: Ubud (Culture & Nature)**",
      "Head inland to Ubud. Visit the Sacred Monkey Forest, walk through the Tegalalang Rice Terraces, and wake up early for a sunrise yoga session. This is the spiritual heart of Bali.",
      "**Day 5: Waterfalls & Temples**",
      "Take a day trip to explore the majestic waterfalls like Tegenungan or Sekumpul. End your day at the iconic Uluwatu Temple to watch the traditional Kecak Fire Dance as the sun sets over the ocean.",
      "**Day 6-7: Nusa Penida (Adventure)**",
      "Take a fast boat to Nusa Penida. Witness the breathtaking views at Kelingking Beach and snorkel with Manta Rays before heading back to the mainland for your flight home."
    ]
  },
  {
    _id: "blog-thailand-vs-bali",
    title: "Thailand vs Bali: Which Tropical Escape Fits Your Travel Style?",
    slug: "thailand-vs-bali",
    publishedAt: "2025-07-12T10:00:00.000Z",
    excerpt: "Beaches, nightlife, visas, budgets, and food—here's a side-by-side comparison to help you decide.",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1280&q=50",
    category: "Tips",
    readTime: 7,
    content: [
      "Choosing between Thailand and Bali is a wonderful dilemma to have. Both offer incredible beaches, rich cultures, and fantastic food, but they cater to slightly different travel styles.",
      "**1. Beaches & Islands**",
      "Thailand boasts white-sand beaches and dramatic limestone cliffs (think Phi Phi Islands). Bali's beaches are more rugged, famous for world-class surfing, and offer unique black sand in the north.",
      "**2. Food & Nightlife**",
      "Thailand is the undisputed king of street food (Pad Thai, Som Tum) and wild nightlife (Full Moon Parties). Bali offers upscale organic cafes, smoothie bowls, and sophisticated beach clubs.",
      "**3. Culture & Vibe**",
      "Thailand is deeply Buddhist with golden temples and a bustling, fast-paced energy. Bali is predominantly Hindu, characterized by daily offerings, spiritual retreats, and a deeply laid-back atmosphere.",
      "**Verdict:** Choose Thailand for island-hopping and street food. Choose Bali for surfing, wellness, and aesthetic cafes."
    ]
  },
  {
    _id: "blog-singapore-48-hours",
    title: "48 Hours in Singapore: The Perfect Stopover Plan",
    slug: "singapore-48-hours",
    publishedAt: "2025-06-25T10:00:00.000Z",
    excerpt: "Short on time? Squeeze in hawker food, Gardens by the Bay, Marina Bay views, and Sentosa highlights.",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1280&q=50",
    category: "Itineraries",
    readTime: 6,
    content: [
      "Singapore is one of the best transit hubs in the world. With just 48 hours, you can experience a perfect blend of futuristic architecture, lush greenery, and world-class street food.",
      "**Day 1: The Iconic Cityscape**",
      "Start at Marina Bay Sands. Walk the helix bridge and head straight into Gardens by the Bay. Don't miss the Cloud Forest and Flower Dome. In the evening, watch the Supertree Grove light show and dine at Lau Pa Sat hawker center for some authentic satay.",
      "**Day 2: Heritage & Fun**",
      "Spend your morning wandering the colorful streets of Little India and Chinatown. Visit the Buddha Tooth Relic Temple. In the afternoon, take a cable car to Sentosa Island. Relax at Siloso Beach or visit Universal Studios if you want a thrill before heading back to Changi Airport (make sure to see the Jewel!)."
    ]
  },
  {
    _id: "blog-uae-theme-parks",
    title: "The Ultimate Guide to UAE Theme Parks for Families",
    slug: "uae-theme-parks",
    publishedAt: "2025-05-14T10:00:00.000Z",
    excerpt: "From Motiongate to Ferrari World—tickets, height limits, fast passes, and where to stay nearby.",
    image: "https://images.unsplash.com/photo-1513159446162-54eb8bdaa79b?auto=format&fit=crop&w=1280&q=50",
    category: "Family",
    readTime: 10,
    content: [
      "The UAE has rapidly become the theme park capital of the Middle East. If you are traveling with family, here is everything you need to know about the best parks in Dubai and Abu Dhabi.",
      "**Dubai Parks and Resorts**",
      "This massive complex houses Motiongate (Hollywood-inspired rides), Legoland, and Legoland Water Park. It's perfect for families with kids under 12. Pro-tip: Stay at the Lapita Hotel right inside the resort for free access and easy midday naps.",
      "**Ferrari World Abu Dhabi**",
      "Home to the Formula Rossa, the fastest roller coaster in the world! This indoor park on Yas Island is great for older kids and thrill-seekers. It's fully air-conditioned, making it perfect for summer visits.",
      "**Warner Bros. World**",
      "Also on Yas Island, this indoor park brings Batman, Superman, and Looney Tunes to life. The immersive lands like Gotham City and Bedrock are visually stunning and offer rides for all ages."
    ]
  },
  {
    _id: "blog-travel-scams",
    title: "10 Common Travel Scams (and How to Avoid Them)",
    slug: "travel-scams",
    publishedAt: "2025-04-20T10:00:00.000Z",
    excerpt: "From taxi tricks to too-good-to-be-true tours—spot the signs early and keep your trip stress-free.",
    image: "https://images.unsplash.com/photo-1551043047-1d2adf00f3fd?auto=format&fit=crop&w=1280&q=50",
    category: "Safety",
    readTime: 7,
    content: [
      "While traveling is mostly safe and filled with kind locals, tourists can sometimes be targets for scams. Awareness is your best defense.",
      "**1. The 'Broken Meter' Taxi**",
      "A classic. You get in a taxi and the driver claims the meter is broken, quoting a highly inflated fixed price. *Solution:* Always insist on the meter before closing the door, or use ride-hailing apps like Grab or Uber.",
      "**2. The 'Closed' Attraction**",
      "A friendly local approaches you near a temple or museum and says it's closed for a holiday, but offers to take you to a 'better' one (which is usually a shop where they get a commission). *Solution:* Always check the entrance yourself.",
      "**3. The Picture Helper**",
      "Someone offers to take a photo of you, then demands money for returning your phone. *Solution:* Only ask fellow tourists or families to take your photos.",
      "Stay vigilant, trust your instincts, and don't be afraid to firmly say 'No, thank you'."
    ]
  },
  {
    _id: "blog-visa-tips",
    title: "Visa Tips for Indian Travelers: Faster Approvals, Fewer Rejections",
    slug: "visa-tips",
    publishedAt: "2025-03-05T10:00:00.000Z",
    excerpt: "Documents, timelines, and common pitfalls—plus how our team supports you at every step.",
    image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1280&q=50",
    category: "Tips",
    readTime: 8,
    content: [
      "Getting a visa as an Indian passport holder can seem daunting, but with the right preparation, the process is incredibly smooth. Here are our top tips for securing your visa without the stress.",
      "**1. Financial Proof is Key**",
      "Ensure your bank statements show a healthy, stable balance for the last 6 months. Sudden large deposits right before applying raise red flags. Maintain consistency.",
      "**2. The Power of a Cover Letter**",
      "A well-written cover letter explaining the purpose of your trip, your itinerary, and demonstrating your strong ties to India (job, property, family) significantly boosts your approval chances.",
      "**3. Book Flights and Hotels Sensibly**",
      "Many embassies require bookings, but use fully refundable options until your visa is approved. At Traverse Globe, our team helps prepare confirmed dummy itineraries specifically for visa purposes.",
      "Remember, apply at least a month in advance to avoid last-minute panic!"
    ]
  },
  {
    _id: "blog-dubai-budget",
    title: "Dubai on a Budget: Free and Low-Cost Must-Dos",
    slug: "dubai-on-a-budget",
    publishedAt: "2025-02-10T10:00:00.000Z",
    excerpt: "Old Dubai walks, free viewpoints, abra rides, and local eats that save big without compromise.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1280&q=50",
    category: "Deals",
    readTime: 6,
    content: [
      "Dubai is famous for luxury, but you don't need to empty your wallet to enjoy this incredible city. There are plenty of budget-friendly ways to experience its magic.",
      "**Take a 1 Dirham Abra Ride**",
      "Cross the historic Dubai Creek in a traditional wooden boat (Abra) for just 1 AED. It’s one of the most authentic and cheapest experiences in the city.",
      "**Explore Old Dubai & The Souks**",
      "Wander through the Al Fahidi Historical Neighborhood for free. Then, lose yourself in the Gold and Spice Souks. Even if you don't buy anything, the sights and smells are intoxicating.",
      "**Free Fountains and Flamingos**",
      "The Dubai Fountain show outside the Burj Khalifa is completely free and runs every evening. For nature lovers, visit the Ras Al Khor Wildlife Sanctuary to see hundreds of pink flamingos against the city skyline—also free!"
    ]
  },
  {
    _id: "blog-carry-on-packing",
    title: "Carry-On Packing Checklist: International Trips",
    slug: "carry-on-packing",
    publishedAt: "2025-01-19T10:00:00.000Z",
    excerpt: "The essential list that fits in a cabin bag: meds, tech, docs, and the underrated items pros swear by.",
    image: "https://images.unsplash.com/photo-1534008897995-27a23e859048?auto=format&fit=crop&w=1280&q=50",
    category: "Guides",
    readTime: 5,
    content: [
      "Traveling light is a superpower. Not only do you skip the baggage claim, but you never have to worry about lost luggage. Here is the ultimate carry-on packing guide.",
      "**The 54321 Rule for Clothes**",
      "Pack 5 tops, 4 bottoms, 3 dresses/rompers, 2 pairs of shoes (wear the bulkiest on the plane), and 1 jacket. Mix and match colors so everything goes together.",
      "**Tech & Entertainment**",
      "A universal travel adapter is non-negotiable. Bring a high-capacity power bank, noise-canceling headphones, and an e-reader. Load your devices with movies before you get to the airport.",
      "**Toiletries Strategy**",
      "Follow the 3-1-1 rule strictly. Use solid toiletries where possible—solid shampoo, deodorant, and perfume don't count towards your liquid limit!",
      "Finally, always keep your passport, medications, and a spare pen in an easily accessible front pocket."
    ]
  }
];

const ndjson = articles.map(article => {
  const blocks = article.content.map(text => ({
    _key: Math.random().toString(36).substring(7),
    _type: 'block',
    style: text.startsWith('**') ? 'h3' : 'normal',
    children: [
      {
        _key: Math.random().toString(36).substring(7),
        _type: 'span',
        marks: [],
        text: text.replace(/\*\*/g, '')
      }
    ]
  }));

  return JSON.stringify({
    _type: "blogPost",
    _id: article._id,
    title: article.title,
    slug: { _type: "slug", current: article.slug },
    author: "Traverse Team",
    publishedAt: article.publishedAt,
    excerpt: article.excerpt,
    image: article.image,
    category: article.category,
    readTime: article.readTime,
    active: true,
    content: blocks
  });
}).join('\n');

fs.writeFileSync('blog-import.ndjson', ndjson);
console.log('Done generating NDJSON');
