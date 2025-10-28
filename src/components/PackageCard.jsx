import { Link } from 'react-router-dom';

export const PriceTag = ({ strike, price }) => (
  <div className="mt-2">
    {typeof strike === 'number' && (
      <p className="text-sm text-gray-400 line-through">₹{strike.toLocaleString('en-IN')}</p>
    )}
    <div className="flex items-baseline justify-between gap-2">
      <p className="text-xl font-extrabold text-rose-600">
        ₹{price?.toLocaleString ? price.toLocaleString('en-IN') : price}
        <span className="block text-xs font-normal text-gray-500">Per Person on twin sharing</span>
      </p>
    </div>
  </div>
);

export default function PackageCard({ pkg, onView, buttonLabel = 'View Package' }){
  return (
    <div className="custom-card group">
      <div className="relative">
        <img src={pkg.image} alt={pkg.title} className="w-full h-56 object-cover" />
        {pkg.nights && (
          <div className="absolute left-4 bottom-4 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full shadow">{pkg.nights}</div>
        )}
      </div>
      <div className="p-4">
        <p className="font-semibold text-gray-800">{pkg.title}</p>
        <PriceTag strike={pkg.strikePrice} price={pkg.price} />
        <div className="pt-3 flex justify-end">
          {onView ? (
            <button onClick={() => onView(pkg)} className="custom-btn text-sm">{buttonLabel}</button>
          ) : (
            <Link to={`/package/${pkg.id}`} className="custom-btn text-sm">{buttonLabel}</Link>
          )}
        </div>
      </div>
    </div>
  );
}
