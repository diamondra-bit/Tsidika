"use client";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  title?: string; 
}

export default function CategoryFilter({categories, activeCategory, setActiveCategory, title = "Inspirations de voyage"} : CategoryFilterProps) {
  return (
    <div className="space-y-6">
        {/* Title of page */}
      <h1 className="text-4xl font-serif text-slate-900 tracking-tight">
        {title}
      </h1>
      
      {/* Categories */}
      <div className="flex items-center gap-8 overflow-x-auto no-scrollbar pb-2">
        {categories.map((cat) => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-all relative py-1 whitespace-nowrap
            ${activeCategory === cat ? 'text-emerald-700' : 'text-slate-300 hover:text-slate-500'}`}
          >
            {cat}
            {activeCategory === cat && (
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-600 animate-in fade-in slide-in-from-left-2 duration-300" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}