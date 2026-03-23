"use client";

interface SearchBarProps {
  onSearch: (value: string) => void;
  placeholder?: string; 
  tag?: string;         
}

export default function SearchBar({ 
  onSearch, 
  placeholder = "Rechercher...", 
  tag = "Explorer" 
}: SearchBarProps) {
  return (

    <div className="group"> 
      <div className="relative flex items-center bg-white border border-slate-100 rounded-2xl shadow-sm group-focus-within:shadow-md group-focus-within:border-emerald-200 transition-all duration-300">
        <div className="pl-5">
          <svg 
            className="w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 group-focus-within:scale-110 transition-all duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <input
          type="text"
          placeholder={placeholder} 
          className="w-full pl-4 pr-6 py-4 bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400 font-medium"
          onChange={(e) => onSearch(e.target.value)}
        />

        <div className="pr-4 hidden md:block">
          <kbd className="text-[10px] font-black text-slate-300 border border-slate-100 px-2 py-1 rounded-md uppercase tracking-tighter">
            {tag} 
          </kbd>
        </div>
      </div>
    </div>
  );
}