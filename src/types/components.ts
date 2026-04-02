
import { ReactNode } from 'react';
export interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  title?: string; 
}

export interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  onClick?: () => void;
}

export interface ExploreLinkProps {
  href: string;
  label?: string; 
  className?: string;
}

export interface SearchBarProps {
  onSearch: (value: string) => void;
  placeholder?: string; 
  tag?: string;         
}