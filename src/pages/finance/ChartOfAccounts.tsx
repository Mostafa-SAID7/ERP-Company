import { useState } from 'react';
import { Plus, Download, Upload, ChevronRight, ChevronDown } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { accounts } from '@/store/mockData';
import { cn } from '@/lib/utils';
import type { Account } from '@/types/erp';

const accountTypeColors: Record<Account['type'], string> = {
  asset: 'bg-info/10 text-info',
  liability: 'bg-warning/10 text-warning',
  equity: 'bg-accent/10 text-accent',
  revenue: 'bg-success/10 text-success',
  expense: 'bg-destructive/10 text-destructive',
};

const groupedAccounts = accounts.reduce((acc, account) => {
  if (!acc[account.type]) {
    acc[account.type] = [];
  }
  acc[account.type].push(account);
  return acc;
}, {} as Record<Account['type'], Account[]>);

const accountTypeLabels: Record<Account['type'], string> = {
  asset: 'Assets',
  liability: 'Liabilities',
  equity: 'Equity',
  revenue: 'Revenue',
  expense: 'Expenses',
};

interface AccountGroupProps {
  type: Account['type'];
  accounts: Account[];
}

function AccountGroup({ type, accounts }: AccountGroupProps) {
  const [isOpen, setIsOpen] = useState(true);
  const total = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  return (
    <div className="border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between bg-muted/50 p-4 hover:bg-muted transition-colors"
      >
        <div className="flex items-center gap-3">
          {isOpen ? (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          )}
          <span className={cn('px-2.5 py-0.5 rounded-md text-xs font-medium uppercase', accountTypeColors[type])}>
            {type}
          </span>
          <span className="font-semibold">{accountTypeLabels[type]}</span>
          <span className="text-sm text-muted-foreground">({accounts.length} accounts)</span>
        </div>
        <span className="font-semibold tabular-nums">
          ${total.toLocaleString()}
        </span>
      </button>
      
      {isOpen && (
        <div className="divide-y">
          {accounts.map((account) => (
            <div 
              key={account.id}
              className="flex items-center justify-between px-4 py-3 pl-12 hover:bg-muted/30 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <span className="font-mono text-sm text-muted-foreground w-16">
                  {account.code}
                </span>
                <span className="font-medium">{account.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="tabular-nums font-medium">
                  ${account.balance.toLocaleString()}
                </span>
                <span 
                  className={cn(
                    'px-2 py-0.5 rounded text-xs',
                    account.isActive 
                      ? 'bg-success/10 text-success' 
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  {account.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ChartOfAccounts() {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Chart of Accounts"
        description="Manage your organization's account structure"
        breadcrumbs={[
          { label: 'Finance', href: '/finance' },
          { label: 'Chart of Accounts' },
        ]}
        actions={
          <>
            <Button variant="outline" size="sm">
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Account
            </Button>
          </>
        }
      />

      {/* Account Summary */}
      <div className="grid gap-4 md:grid-cols-5">
        {(['asset', 'liability', 'equity', 'revenue', 'expense'] as Account['type'][]).map((type) => {
          const typeAccounts = groupedAccounts[type] || [];
          const total = typeAccounts.reduce((sum, acc) => sum + acc.balance, 0);
          return (
            <div 
              key={type}
              className="rounded-lg border p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={cn('h-3 w-3 rounded-full', accountTypeColors[type].replace('text-', 'bg-').replace('/10', ''))} />
                <span className="text-sm font-medium text-muted-foreground capitalize">{type}</span>
              </div>
              <p className="text-2xl font-bold tabular-nums">${total.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">{typeAccounts.length} accounts</p>
            </div>
          );
        })}
      </div>

      {/* Account Tree */}
      <div className="space-y-4">
        {(['asset', 'liability', 'equity', 'revenue', 'expense'] as Account['type'][]).map((type) => (
          groupedAccounts[type] && (
            <AccountGroup key={type} type={type} accounts={groupedAccounts[type]} />
          )
        ))}
      </div>
    </div>
  );
}
