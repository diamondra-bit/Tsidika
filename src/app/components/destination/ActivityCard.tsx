"use client";

import Image from 'next/image';
import { ActivityCardProps } from '@/types/trip';



export default function ActivityCard({ title, image, duration, type, index }: ActivityCardProps) {
  // Safe image fallback
  const imageSrc = image || "/images/placeholders/activity-placeholder.jpg";

  return (
    <div 
      className="group animate-in fade-in slide-in-from-bottom-4 duration-500"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* IMAGE CONTAINER */}
      <div className="relative h-[380px] rounded-[2.2rem] overflow-hidden mb-4 shadow-sm border-2 border-transparent group-hover:border-white group-hover:shadow-2xl transition-all duration-500 bg-slate-100">
        
        <Image 
          src={imageSrc} 
          alt={title} 
          fill 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0" 
          priority={index < 3} // Priority loading for top-of-the-fold items
        />
        
        {/* TYPE BADGE */}
        <div className="absolute top-5 right-5 bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm border border-white/20">
          <span className="text-[10px] font-black tracking-[0.2em] text-slate-900 uppercase">
            {type}
          </span>
        </div>
      </div>

      {/* TEXT CONTENT */}
      <div className="px-2">
        <h3 className="text-xl font-serif italic text-slate-900 group-hover:text-emerald-800 transition-colors duration-300">
          {title}
        </h3>
        
        <div className="mt-2 flex items-center gap-3 overflow-hidden">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-emerald-600 transition-all duration-500 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
            {duration}
          </p>
          <span className="h-[1px] w-0 bg-emerald-600 group-hover:w-12 transition-all duration-700 delay-100"></span>
        </div>
      </div>
    </div>
  );
}