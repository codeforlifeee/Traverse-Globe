import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { REVEAL_VIEWPORT, riseItem, staggerParent } from '@/lib/motionVariants';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Calendar, BookOpen } from 'lucide-react';
import { useBlogPosts } from '../hooks/queries';
import { SkeletonList } from './revamp/Skeletons';
import Kicker from './revamp/Kicker';
import SectionRule from './revamp/SectionRule';
import ImageWithFallback from './revamp/ImageWithFallback';
import { useRail } from '../hooks/useRail';
import { cn } from '@/lib/utils';
import { CARD_BODY, CARD_MEDIA, CARD_SHELL, CARD_TITLE } from '@/lib/cardMetrics';

const FALLBACK_POSTS = [
  {
    id: 'guide-dubai-budget',
    title: 'The Ultimate Dubai Family Travel Guide: 5 Days of Magic on a Budget',
    slug: 'dubai-family-guide',
    category: 'Dubai',
    readTime: '6 min read',
    date: '2026-02-15',
    excerpt: 'From dune bashing and evening dhow dinners to insider metro tips and kid-friendly attractions, here is how to experience Dubai affordably.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'guide-bali-hidden-gems',
    title: 'Top 7 Hidden Gems in Bali You Must Visit in 2026',
    slug: 'bali-hidden-gems',
    category: 'Bali',
    readTime: '5 min read',
    date: '2026-03-01',
    excerpt: 'Escape the crowded tourist trails and explore secret waterfalls, cliffside cafes in Uluwatu, and secluded black sand beaches.',
    image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'guide-kashmir-seasons',
    title: 'Kashmir in All 4 Seasons: When Is the Best Time for Your Trip?',
    slug: 'kashmir-best-time-to-visit',
    category: 'Kashmir',
    readTime: '4 min read',
    date: '2026-03-10',
    excerpt: 'Whether you crave blooming tulip gardens in Spring, lush meadows in Summer, golden Chinar leaves in Autumn, or snowfall in Gulmarg.',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'guide-uae-visa',
    title: 'UAE Tourist Visa for Indians: Documents, Timelines and Costs',
    slug: 'uae-visa-for-indians',
    category: 'Visa',
    readTime: '4 min read',
    date: '2026-03-18',
    excerpt: 'Exactly what to keep ready, how long approval takes, and the mistakes that get applications sent back.',
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80',
  },
];

export default function HomeBlogSection() {
  const { data: postsData = [], isPending } = useBlogPosts(4);

  // Four cards to a row from lg, on the same card geometry as the package row
  // above (cardMetrics), so both bands read as one system. Below md they scroll
  // as a snapping rail rather than stacking into a very tall column.
  const scrollerRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const parent = staggerParent(reduceMotion);
  const item = riseItem(reduceMotion);
  const { trackRef, barRef } = useRail(scrollerRef);

  if (isPending) {
    return (
      <section className="section-y bg-brand-canvas/40 backdrop-blur-[2px]">
        <div className="container-custom">
          <SkeletonList count={4} columns={4} />
        </div>
      </section>
    );
  }

  const posts = postsData.length >= 3 ? postsData.slice(0, 4) : FALLBACK_POSTS;

  return (
    <section className="section-y bg-brand-canvas/40 backdrop-blur-[2px]">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 md:mb-8">
          <div className="max-w-2xl">
            <Kicker tone="orange" size="sm" className="mb-2">
              Insider Knowledge
            </Kicker>
            <SectionRule className="mb-3" />
            <h2 className="font-poppins font-bold text-2xl md:text-3xl lg:text-4xl text-brand-ink leading-tight">
              Latest Travel Guides &amp; Tips
            </h2>
            <p className="mt-2 text-sm md:text-base font-canva-sans text-brand-muted-ink">
              Inspiring itineraries, budget hacks, and destination advice crafted by our ground experts.
            </p>
          </div>

          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-poppins font-semibold text-brand-orange hover:text-brand-orange-hover hover:gap-2 transition-all self-start md:self-end"
          >
            <span>View all travel guides</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Rail on mobile, grid from md up */}
        <div
          ref={scrollerRef}
          className="-mx-4 px-4 overflow-x-auto overscroll-x-contain snap-x snap-mandatory pb-2 cursor-grab md:cursor-auto [&[data-dragging]]:cursor-grabbing md:mx-0 md:px-0 md:overflow-visible md:pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
        <motion.div
          ref={trackRef}
          className="flex gap-4 will-change-transform md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-5"
          variants={parent}
          initial="hidden"
          whileInView="show"
          viewport={REVEAL_VIEWPORT}
        >
          {posts.map((post) => {
            const articleHref = post.slug ? `/blog/${post.slug}` : '/blog';
            return (
              <motion.article
                key={post.id || post.slug}
                variants={item}
                className={cn(CARD_SHELL, "shrink-0 w-[78%] sm:w-[48%] snap-start md:w-auto md:shrink hover:-translate-y-1")}
              >
                {/* Featured Image */}
                <Link to={articleHref} className={cn("relative overflow-hidden bg-brand-canvas-2 block", CARD_MEDIA)}>
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {post.category && (
                    <span className="absolute top-3 left-3 bg-brand-scrim/80 backdrop-blur-md text-white text-[11px] font-poppins font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {post.category}
                    </span>
                  )}
                </Link>

                {/* Content */}
                <div className={cn(CARD_BODY, "flex flex-col flex-1")}>
                  {/* Meta (Date + Read Time) */}
                  <div className="flex items-center gap-3 text-xs text-brand-muted-ink font-canva-sans mb-2">
                    {post.date && (
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    )}
                    {post.readTime && (
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className={cn(CARD_TITLE, "text-brand-ink group-hover:text-brand-orange transition-colors mb-1.5")}>
                    <Link to={articleHref}>
                      {post.title}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className="text-xs md:text-sm text-brand-muted-ink font-canva-sans line-clamp-2 mb-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}

                  {/* CTA link at bottom */}
                  <div className="mt-auto pt-3 border-t border-brand-hairline flex items-center justify-between">
                    <Link
                      to={articleHref}
                      className="inline-flex items-center gap-1.5 text-xs font-poppins font-semibold text-brand-orange hover:gap-2 transition-all"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      Read Guide <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
        </div>

        {/* Mobile drag affordance — the grid needs none from md up */}
        <div className="mt-5 h-1 rounded-full bg-brand-hairline overflow-hidden md:hidden" aria-hidden="true">
          <div ref={barRef} className="h-full w-1/3 rounded-full bg-brand-orange" />
        </div>
      </div>
    </section>
  );
}
