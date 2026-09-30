import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal } from 'lucide-react';
import FilterRail from './FilterRail';

/**
 * Mobile bottom-sheet wrapper around FilterRail.
 * Triggered by a filter button in listing pages.
 */
export default function MobileFilterSheet({ facets, values, onChange, categories, activeCount = 0, resultCount }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="lg:hidden">
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          Filters
          {activeCount > 0 && (
            <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-[10px] rounded-full bg-brand-orange text-white font-poppins font-semibold">
              {activeCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle>Filter packages</SheetTitle>
        </SheetHeader>
        <FilterRail facets={facets} values={values} onChange={onChange} categories={categories} />
        <div className="mt-6 pt-4 border-t border-brand-hairline">
          <Button size="lg" className="w-full">
            Show {resultCount ?? ''} packages
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
