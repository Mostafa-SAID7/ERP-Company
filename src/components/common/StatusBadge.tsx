import { cn } from '@/lib/utils';

type StatusType = 
  | 'draft' | 'pending' | 'approved' | 'posted' | 'rejected' 
  | 'confirmed' | 'shipped' | 'invoiced' | 'cancelled'
  | 'active' | 'inactive' | 'terminated'
  | 'success' | 'warning' | 'error' | 'info';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  draft: { label: 'Draft', className: 'bg-muted text-muted-foreground' },
  pending: { label: 'Pending', className: 'bg-warning/15 text-warning' },
  approved: { label: 'Approved', className: 'bg-success/15 text-success' },
  posted: { label: 'Posted', className: 'bg-primary/15 text-primary' },
  rejected: { label: 'Rejected', className: 'bg-destructive/15 text-destructive' },
  confirmed: { label: 'Confirmed', className: 'bg-info/15 text-info' },
  shipped: { label: 'Shipped', className: 'bg-accent/15 text-accent' },
  invoiced: { label: 'Invoiced', className: 'bg-success/15 text-success' },
  cancelled: { label: 'Cancelled', className: 'bg-muted text-muted-foreground' },
  active: { label: 'Active', className: 'bg-success/15 text-success' },
  inactive: { label: 'Inactive', className: 'bg-muted text-muted-foreground' },
  terminated: { label: 'Terminated', className: 'bg-destructive/15 text-destructive' },
  success: { label: 'Success', className: 'bg-success/15 text-success' },
  warning: { label: 'Warning', className: 'bg-warning/15 text-warning' },
  error: { label: 'Error', className: 'bg-destructive/15 text-destructive' },
  info: { label: 'Info', className: 'bg-info/15 text-info' },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.info;
  
  return (
    <span 
      className={cn(
        'erp-status-badge capitalize',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
