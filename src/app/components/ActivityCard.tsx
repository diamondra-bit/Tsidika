"use client";

import Image from 'next/image';

interface ActivityCardProps {
  title: string;
  image: string;
  duration: string;
  type: string;
  index: number;
}

export default function ActivityCard({ title, image, duration, type, index }: ActivityCardProps) {
  return (
    <div 
      className="group animate-in fade-in slide-in-from-bottom-4 duration-500"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative h-[380px] rounded-[2.2rem] overflow-hidden mb-4 shadow-sm border-2 border-transparent group-hover:border-white group-hover:shadow-xl transition-all duration-500 bg-slate-100">
        {/* Image */}
        <Image 
          src={image} 
          alt={title} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        
        {/* Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm">
          <span className="text-[9px] font-black tracking-widest text-slate-800 uppercase">
            {type}
          </span>
        </div>
      </div>

      {/* Title*/}
      <h3 className="text-lg font-black text-slate-600 group-hover:text-emerald-700 transition-colors ml-2">
        {title}
      </h3>
      <p className="text-xs text-slate-400 font-bold ml-2 tracking-tight opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
        {duration} <span className="text-emerald-600">→</span>
      </p>
    </div>
  );
}