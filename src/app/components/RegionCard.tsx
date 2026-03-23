import Image from 'next/image';
import { Star, Utensils, Bed, Timer } from 'lucide-react';

interface RegionCardProps {
  title: string;
  image: string;
  priceOrBudget: string;
  stars?: number;
  subtitle?: string;
  type: 'hotel' | 'resto' | 'activity';
}

export default function RegionCard({ title, image, priceOrBudget, stars, subtitle, type }: RegionCardProps) {
  return (
    <div className="group bg-white border border-slate-100 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
      <div className="relative h-64 overflow-hidden">
        {/* Image */}
        <Image 
          src={image} 
          fill 
          className="object-cover group-hover:scale-110 transition-transform duration-700" 
          alt={title} 
        />
        {/* Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
          <span className="text-[10px] font-black uppercase text-slate-900">{priceOrBudget}</span>
        </div>
      </div>

      <div className="p-8 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          {/* Ttile */}
          <h4 className="font-black text-slate-900 uppercase text-sm tracking-tight leading-tight flex-1">
            {title}
          </h4>
          {/* Stars */}
          {stars && (
            <div className="flex text-amber-400 gap-0.5 ml-2">
              {[...Array(stars)].map((_, s) => (
                <Star key={s} size={10} fill="currentColor" />
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-6">
          {type === 'hotel' && <Bed size={12} />}
          {type === 'resto' && <Utensils size={12} />}
          {type === 'activity' && <Timer size={12} />}
          {subtitle || (type === 'hotel' ? 'Hébergement' : '')}
        </div>

        <button className="w-full mt-auto py-4 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-emerald-600 transition-colors">
          {type === 'hotel' ? 'Vérifier les disponibilités' : "Voir l'expérience"}
        </button>
      </div>
    </div>
  );
}