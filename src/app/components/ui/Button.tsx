import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  onClick?: () => void;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick 
}: ButtonProps) {
  
  // Basic styles
  const baseStyles = "px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-sm hover:-translate-y-0.5 active:scale-95";
  
  // Specific styles per variant
  const variants = {
    primary: "bg-emerald-700 text-white hover:bg-emerald-800 shadow-emerald-100",
    secondary: "bg-slate-900 text-white hover:bg-emerald-700 shadow-slate-200",
    outline: "border-2 border-emerald-700 text-emerald-700 hover:bg-emerald-50 bg-transparent"
  };

  return (
    <button 
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}