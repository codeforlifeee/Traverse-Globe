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
      <TrendingDestinations />
      <PackageCategories />
      <HotelCategories />
      <TopDestinations />
      <FeedbackSection />
      <ExplorePrices />
      <WhyChooseUs />
    </div>
  );
};

export default Home;
