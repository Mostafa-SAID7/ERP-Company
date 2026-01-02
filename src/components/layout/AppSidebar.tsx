import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Wallet,
  Package,
  Users,
  ShoppingCart,
  Settings,
  ChevronDown,
  ChevronRight,
  Building2,
  BookOpen,
  FileText,
  Scale,
  History,
  Boxes,
  Warehouse,
  ArrowLeftRight,
  AlertTriangle,
  UserCircle,
  Building,
  CalendarDays,
  DollarSign,
  UserCog,
  ClipboardList,
  Receipt,
  Truck,
  Shield,
  Globe,
  CreditCard,
  Menu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  children?: NavItem[];
  badge?: string;
}

const navigation: NavItem[] = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/',
  },
  {
    label: 'Finance',
    icon: Wallet,
    children: [
      { label: 'Chart of Accounts', icon: BookOpen, href: '/finance/accounts' },
      { label: 'Journal Entries', icon: FileText, href: '/finance/journal-entries' },
      { label: 'General Ledger', icon: Scale, href: '/finance/ledger' },
      { label: 'Trial Balance', icon: Building2, href: '/finance/trial-balance' },
      { label: 'Audit Log', icon: History, href: '/finance/audit' },
    ],
  },
  {
    label: 'Inventory',
    icon: Package,
    children: [
      { label: 'Items', icon: Boxes, href: '/inventory/items' },
      { label: 'Warehouses', icon: Warehouse, href: '/inventory/warehouses' },
      { label: 'Stock Movements', icon: ArrowLeftRight, href: '/inventory/movements' },
      { label: 'Low Stock Alerts', icon: AlertTriangle, href: '/inventory/alerts', badge: '2' },
    ],
  },
  {
    label: 'Human Resources',
    icon: Users,
    children: [
      { label: 'Employees', icon: UserCircle, href: '/hr/employees' },
      { label: 'Departments', icon: Building, href: '/hr/departments' },
      { label: 'Leave Management', icon: CalendarDays, href: '/hr/leave' },
      { label: 'Payroll', icon: DollarSign, href: '/hr/payroll' },
    ],
  },
  {
    label: 'Sales & Purchasing',
    icon: ShoppingCart,
    children: [
      { label: 'Customers', icon: UserCog, href: '/sales/customers' },
      { label: 'Sales Orders', icon: ClipboardList, href: '/sales/orders' },
      { label: 'Invoices', icon: Receipt, href: '/sales/invoices' },
      { label: 'Vendors', icon: Truck, href: '/purchasing/vendors' },
    ],
  },
  {
    label: 'Administration',
    icon: Settings,
    children: [
      { label: 'Users & Roles', icon: Shield, href: '/admin/users' },
      { label: 'Company Settings', icon: Building2, href: '/admin/company' },
      { label: 'Localization', icon: Globe, href: '/admin/localization' },
      { label: 'Tax & Currency', icon: CreditCard, href: '/admin/tax' },
    ],
  },
];

interface NavGroupProps {
  item: NavItem;
  isCollapsed: boolean;
}

function NavGroup({ item, isCollapsed }: NavGroupProps) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(
    item.children?.some((child) => child.href === location.pathname) ?? false
  );

  const hasActiveChild = item.children?.some((child) => child.href === location.pathname);

  if (!item.children) {
    const isActive = location.pathname === item.href;
    return (
      <Link
        to={item.href!}
        className={cn(
          'erp-menu-item text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
          isActive && 'bg-sidebar-accent text-sidebar-primary'
        )}
      >
        <item.icon className="h-5 w-5 shrink-0" />
        {!isCollapsed && <span>{item.label}</span>}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'erp-menu-item w-full text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
          hasActiveChild && 'text-sidebar-primary'
        )}
      >
        <item.icon className="h-5 w-5 shrink-0" />
        {!isCollapsed && (
          <>
            <span className="flex-1 text-left">{item.label}</span>
            {isOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </>
        )}
      </button>
      {!isCollapsed && isOpen && (
        <div className="ml-4 mt-1 space-y-1 border-l border-sidebar-border pl-4">
          {item.children.map((child) => {
            const isActive = location.pathname === child.href;
            return (
              <Link
                key={child.href}
                to={child.href!}
                className={cn(
                  'erp-menu-item text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                  isActive && 'bg-sidebar-accent text-sidebar-primary font-medium'
                )}
              >
                <child.icon className="h-4 w-4 shrink-0" />
                <span className="flex-1">{child.label}</span>
                {child.badge && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-warning text-[10px] font-bold text-warning-foreground">
                    {child.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

interface AppSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function AppSidebar({ isCollapsed, onToggle }: AppSidebarProps) {
  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 flex h-full flex-col bg-sidebar transition-all duration-300',
        isCollapsed ? 'w-[72px]' : 'w-[260px]'
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground font-bold">
              E
            </div>
            <div>
              <h1 className="text-base font-semibold text-sidebar-foreground">Enterprise</h1>
              <p className="text-xs text-sidebar-muted">ERP System</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="h-9 w-9 text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {navigation.map((item) => (
          <NavGroup key={item.label} item={item} isCollapsed={isCollapsed} />
        ))}
      </nav>

      {/* User Section */}
      <div className="border-t border-sidebar-border p-3">
        <div className={cn(
          'flex items-center gap-3 rounded-lg p-2',
          !isCollapsed && 'bg-sidebar-accent'
        )}>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-primary text-sm font-medium text-sidebar-primary-foreground">
            JS
          </div>
          {!isCollapsed && (
            <div className="flex-1 truncate">
              <p className="text-sm font-medium text-sidebar-foreground">John Smith</p>
              <p className="text-xs text-sidebar-muted">Administrator</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
