import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  icon?: LucideIcon;
  children: React.ReactNode;
}

export default function FilterButton({ active, onClick, icon: Icon, children }: FilterButtonProps) {
  const baseStyles = "px-4 py-2 rounded-lg";
  const activeStyles = active ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50";
  const iconStyles = Icon ? "flex items-center space-x-2" : "";
  
  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${activeStyles} ${iconStyles}`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      <span>{children}</span>
    </button>
  );
}