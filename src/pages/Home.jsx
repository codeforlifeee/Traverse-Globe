import HeroSection from '../components/HeroSection';
import TrendingDestinations from '../components/TrendingDestinations';
import TopDestinations from '../components/TopDestinations';
import FeedbackSection from '../components/FeedbackSection';
import ExplorePrices from '../components/ExplorePrices';
import WhyChooseUs from '../components/WhyChooseUs';
import PackageCategories from '../components/PackageCategories';
import HotelCategories from '../components/HotelCategories';

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      {/* Defer rendering/painting of below-the-fold sections to reduce initial layout work */}
      <div className="[content-visibility:auto] [contain-intrinsic-size:1200px]">
        <TrendingDestinations />
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
    </div>
  );
};

export default Home;
