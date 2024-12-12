import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color: 'primary' | 'success' | 'warning' | 'danger';
}

const colorVariants = {
  primary: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  success: 'bg-green-50 text-green-700 ring-green-600/20',
  warning: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
  danger: 'bg-red-50 text-red-700 ring-red-600/20',
};

const iconColorVariants = {
  primary: 'bg-emerald-100 text-emerald-600',
  success: 'bg-green-100 text-green-600',
  warning: 'bg-yellow-100 text-yellow-600',
  danger: 'bg-red-100 text-red-600',
};

export const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  color,
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-xl ${colorVariants[color]} ring-1 ring-inset p-6`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`rounded-lg p-2.5 ${iconColorVariants[color]}`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-medium text-sm">{title}</h3>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-semibold tracking-tight">{value}</p>
            {trend && (
              <span
                className={`text-xs font-medium ${
                  trend.isPositive ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {trend.isPositive ? '↑' : '↓'} {trend.value}%
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};