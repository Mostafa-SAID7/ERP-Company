import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  iconClassName?: string;
  className?: string;
}

export function KPICard({ 
  title, 
  value, 
  change, 
  changeLabel,
  icon: Icon, 
  iconClassName,
  className 
}: KPICardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;
  
  return (
    <div className={cn('erp-kpi-card group', className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold tracking-tight text-foreground">
            {value}
          </p>
          {change !== undefined && (
            <div className="flex items-center gap-1.5">
              {isPositive && (
                <TrendingUp className="h-4 w-4 text-success" />
              )}
              {isNegative && (
                <TrendingDown className="h-4 w-4 text-destructive" />
              )}
              <span 
                className={cn(
                  'text-sm font-medium',
                  isPositive && 'text-success',
                  isNegative && 'text-destructive',
                  !isPositive && !isNegative && 'text-muted-foreground'
                )}
              >
                {isPositive && '+'}
                {change}%
              </span>
              {changeLabel && (
                <span className="text-sm text-muted-foreground">
                  {changeLabel}
                </span>
              )}
            </div>
          )}
        </div>
        <div 
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110',
            iconClassName || 'bg-primary/10 text-primary'
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
