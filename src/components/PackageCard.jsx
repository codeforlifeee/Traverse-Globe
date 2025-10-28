import { Link } from 'react-router-dom';

export const PriceTag = ({ strike, price }) => (
  <div className="mt-3">
    {typeof strike === 'number' && (
      <p className="text-sm text-darkBlue/40 line-through font-canva-sans">₹{strike.toLocaleString('en-IN')}</p>
    )}
    <div className="flex items-baseline justify-between gap-2">
      <p className="text-2xl font-bold text-orange font-poppins">
        ₹{price?.toLocaleString ? price.toLocaleString('en-IN') : price}
        <span className="block text-xs font-normal text-darkBlue/60 font-canva-sans mt-1">Per Person on twin sharing</span>
      </p>
    </div>
  </div>
);

export default function PackageCard({ pkg, onView, buttonLabel = 'View Package' }){
  return (
    <div className="custom-card group bg-white">
      <div className="relative overflow-hidden">
        <img src={pkg.image} alt={pkg.title} className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110" />
        {pkg.nights && (
          <div className="absolute left-4 bottom-4 bg-darkBlue text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-lg font-poppins">{pkg.nights}</div>
        )}
      </div>
      <div className="p-5">
        <p className="font-semibold text-darkBlue text-lg font-poppins mb-2">{pkg.title}</p>
        <PriceTag strike={pkg.strikePrice} price={pkg.price} />
        <div className="pt-4 flex justify-end">
          {onView ? (
            <button onClick={() => onView(pkg)} className="custom-btn text-sm px-6 py-2">{buttonLabel}</button>
          ) : (
            <Link to={`/package/${pkg.id}`} className="custom-btn text-sm px-6 py-2">{buttonLabel}</Link>
          )}
        </div>
      </div>
    </div>
  );
}
