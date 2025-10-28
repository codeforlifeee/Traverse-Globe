import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const bannerImages = [
  'https://traverseglobe.com/assets/image/bannerFirstImage.png',
  'https://traverseglobe.com/assets/image/banner/banner.webp',
  'https://traverseglobe.com/assets/image/banner/banner1.webp',
  'https://traverseglobe.com/assets/image/banner/banner2.webp',
  'https://traverseglobe.com/assets/image/banner/banner3.webp',
  'https://traverseglobe.com/assets/image/banner/banner4.webp',
  'https://traverseglobe.com/assets/image/banner/banner5.webp',
];

const blogCards = new Array(6).fill(0).map((_, i) => ({
  id: i + 1,
  image: 'https://traverseglobe.com/assets/image/bannerFirstImage.png',
  price: '$20',
  title: 'Why is the Tesla Cybertruck designed the way it is?',
  excerpt:
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur tenetur distinctio neque?',
}));

export default function Blog() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      {/* Hero with carousel and search overlay */}
      <section className="relative">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
          className="w-full h-[260px] md:h-[420px] lg:h-[520px]"
        >
          {bannerImages.map((src, idx) => (
            <SwiperSlide key={idx}>
              <img src={src} alt={`Banner ${idx + 1}`} className="w-full h-full object-cover" />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Overlay search */}
        <div className="absolute inset-x-0 bottom-6 md:bottom-10 flex justify-center">
          <div className="w-11/12 max-w-2xl bg-white/90 backdrop-blur rounded-full shadow-xl flex overflow-hidden">
            <input
              type="text"
              placeholder="Enter Your Dream Destinstion!"
              className="flex-1 px-6 py-3 outline-none text-gray-700"
            />
            <button className="bg-primary hover:bg-secondary text-white px-6 md:px-8 transition-colors">
              <i className="fa fa-search" />
            </button>
          </div>
        </div>
      </section>

      {/* Blog slider section */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            navigation
            pagination={{ clickable: true }}
            slidesPerView={1}
            className="rounded-2xl"
          >
            <SwiperSlide>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div>
                  <img
                    src="https://traverseglobe.com/assets/image/thailand.png"
                    alt="Tropical Paradise"
                    className="w-full rounded-xl shadow"
                  />
                </div>
                <div>
                  <h2 className="gradient-text text-3xl font-extrabold mb-1">Tropical Paradise</h2>
                  <h5 className="text-gray-800 font-semibold mb-2">Subheading</h5>
                  <div className="gradient-text text-xl font-bold mb-3">$20</div>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto fuga repudiandae est dolores.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga saepe ipsa maxime voluptate architecto
                    eum ad delectus ab aut veritatis asperiores quod cupiditate consequuntur atque, in, similique deserunt omnis velit?
                  </p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      {/* Blog content grid */}
      <section className="pb-4">
        <div className="container mx-auto px-4">
          <h2 className="gradient-text text-3xl md:text-4xl font-extrabold mb-6">Blog Content</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogCards.map((card) => (
              <div key={card.id} className="bg-white rounded-2xl shadow p-4 hover:shadow-xl transition-all">
                <img src={card.image} alt="image" className="w-full h-48 object-cover rounded-xl" />
                <div className="pt-4">
                  <span className="inline-block bg-pink-100 text-pink-700 text-xs font-bold px-2 py-1 rounded-full">
                    {card.price}
                  </span>
                  <h4 className="text-xl font-bold mt-3 gradient-text">
                    {card.title}
                  </h4>
                  <p className="text-gray-600 mt-2">{card.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
