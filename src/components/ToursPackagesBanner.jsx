const ToursPackagesBanner = () => {
  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container-custom">
        <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <img
            src="https://traverseglobe.com/assets/image/mp-tours-packages.webp"
            alt="Tours Packages"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default ToursPackagesBanner;
