import { ScheduleRowProps } from '@/types/trip';

export const ScheduleRow = ({ time, title, type, img, icon, label }: ScheduleRowProps) => (
  <div className="group grid grid-cols-12 gap-8 items-start animate-in fade-in slide-in-from-right-4 duration-500">
    <div className="col-span-3">
      <div className="aspect-square rounded-[2rem] overflow-hidden bg-slate-50 border border-slate-100 shadow-sm transition-all duration-500">
        <img
          src={img || "/placeholder-activity.jpg"}
          className="w-full h-full object-cover grayscale-0 group-hover:grayscale transition-all duration-700 scale-110 group-hover:scale-100"
          alt={title}
        />
      </div>
    </div>

    <div className="col-span-7 pt-2">
      <div className="flex items-center gap-3 mb-2 text-slate-400">
        <span className="p-2 bg-slate-50 rounded-xl group-hover:text-emerald-600 transition-colors">
          {icon}
        </span>
        <span className="text-[9px] font-black uppercase tracking-[0.2em]">{type}</span>
      </div>

      <h4 className="text-3xl font-serif italic text-slate-950 leading-tight">{title}</h4>

      {label && (
        <p className="mt-3 text-sm text-slate-400 font-medium">
          {label}
        </p>
      )}
    </div>

    <div className="col-span-2 flex flex-col items-end text-right">
      <span className="text-xl font-serif italic text-slate-950">{time}</span>
      <div className="w-6 h-[1px] bg-slate-200 mt-3 group-hover:w-10 group-hover:bg-emerald-500 transition-all duration-500"></div>
    </div>
  </div>
);