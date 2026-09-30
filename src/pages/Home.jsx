import HeroSection from '../components/HeroSection';
import TrendingDestinations from '../components/TrendingDestinations';
import TopDestinations from '../components/TopDestinations';
import FeedbackSection from '../components/FeedbackSection';
import ExplorePrices from '../components/ExplorePrices';
import WhyChooseUs from '../components/WhyChooseUs';
import PackageCategories from '../components/PackageCategories';
import HotelCategories from '../components/HotelCategories';
import LiveOffersStrip from '../components/revamp/LiveOffersStrip';
import ThemesShowcase from '../components/revamp/ThemesShowcase';
import PopularSearchesGrid from '../components/revamp/PopularSearchesGrid';
import HomeFAQ from '../components/revamp/HomeFAQ';

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <div className="[content-visibility:auto] [contain-intrinsic-size:1200px]">
        <TrendingDestinations />
      </div>
      <div className="[content-visibility:auto] [contain-intrinsic-size:900px]">
        <ThemesShowcase />
      </div>
      <div className="[content-visibility:auto] [contain-intrinsic-size:800px]">
        <LiveOffersStrip />
      </div>
      <div className="[content-visibility:auto] [contain-intrinsic-size:1400px]">
        <PackageCategories />
      </div>
      <div className="[content-visibility:auto] [contain-intrinsic-size:1200px]">
        <TopDestinations />
      </div>
      <div className="[content-visibility:auto] [contain-intrinsic-size:800px]">
        <HotelCategories />
      </div>
      <div className="[content-visibility:auto] [contain-intrinsic-size:1000px]">
        <FeedbackSection />
      </div>
      <div className="[content-visibility:auto] [contain-intrinsic-size:900px]">
        <ExplorePrices />
      </div>
      <div className="[content-visibility:auto] [contain-intrinsic-size:900px]">
        <WhyChooseUs />
      </div>
      <div className="[content-visibility:auto] [contain-intrinsic-size:600px]">
        <PopularSearchesGrid />
      </div>
      <div className="[content-visibility:auto] [contain-intrinsic-size:700px]">
        <HomeFAQ />
      </div>
    </div>
  );
};

export default Home;
