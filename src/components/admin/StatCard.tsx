import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  colorClass?: string; // Tailwind color class for background or icon
}

export default function StatCard({ title, value, icon, colorClass = 'bg-luxury-gold/10' }: StatCardProps) {
  return (
    <div className={`flex items-center gap-4 p-4 rounded-2xl shadow-sm border border-[#8B7355]/10 ${colorClass}`}>
      <div className="flex-shrink-0 text-royal-brown-dark">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-bold text-[#8B7355] uppercase tracking-wider">{title}</h3>
        <p className="text-3xl font-bold text-[#4A3B32] mt-1">{value}</p>
      </div>
    </div>
  );
}
