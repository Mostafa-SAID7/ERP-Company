import { Plus, Filter, Download, Building2, DollarSign } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable, Column } from '@/components/common/DataTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { customers } from '@/store/mockData';
import { cn } from '@/lib/utils';
import type { Customer } from '@/types/erp';

const columns: Column<Customer>[] = [
  { 
    key: 'code', 
    header: 'Code', 
    sortable: true,
    render: (row) => (
      <span className="font-mono text-sm">{row.code}</span>
    )
  },
  { 
    key: 'name', 
    header: 'Customer',
    sortable: true,
    render: (row) => (
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
          <Building2 className="h-4 w-4 text-primary" />
        </div>
        <div>
          <p className="font-medium">{row.name}</p>
          <p className="text-sm text-muted-foreground">{row.email}</p>
        </div>
      </div>
    )
  },
  { key: 'phone', header: 'Phone' },
  { 
    key: 'creditLimit', 
    header: 'Credit Limit',
    render: (row) => (
      <span className="tabular-nums">${row.creditLimit.toLocaleString()}</span>
    )
  },
  { 
    key: 'balance', 
    header: 'Balance',
    render: (row) => {
      const utilization = (row.balance / row.creditLimit) * 100;
      return (
        <div className="space-y-1">
          <span className={cn(
            'tabular-nums font-medium',
            utilization > 80 && 'text-warning',
            utilization > 95 && 'text-destructive'
          )}>
            ${row.balance.toLocaleString()}
          </span>
          <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
            <div 
              className={cn(
                'h-full rounded-full',
                utilization <= 50 && 'bg-success',
                utilization > 50 && utilization <= 80 && 'bg-warning',
                utilization > 80 && 'bg-destructive'
              )}
              style={{ width: `${Math.min(100, utilization)}%` }}
            />
          </div>
        </div>
      );
    }
  },
  { 
    key: 'isActive', 
    header: 'Status',
    render: (row) => (
      <span className={cn(
        'px-2 py-0.5 rounded text-xs font-medium',
        row.isActive 
          ? 'bg-success/10 text-success' 
          : 'bg-muted text-muted-foreground'
      )}>
        {row.isActive ? 'Active' : 'Inactive'}
      </span>
    )
  },
];

export default function Customers() {
  const totalBalance = customers.reduce((sum, c) => sum + c.balance, 0);
  const totalCreditLimit = customers.reduce((sum, c) => sum + c.creditLimit, 0);
  const activeCount = customers.filter(c => c.isActive).length;

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Customers"
        description="Manage customer accounts and credit"
        breadcrumbs={[
          { label: 'Sales', href: '/sales' },
          { label: 'Customers' },
        ]}
        actions={
          <>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Customer
            </Button>
          </>
        }
      />

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Customers</p>
            <p className="text-2xl font-bold">{customers.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Active Customers</p>
            <p className="text-2xl font-bold text-success">{activeCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total AR Balance</p>
            <p className="text-2xl font-bold tabular-nums">${totalBalance.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Credit Utilization</p>
            <p className="text-2xl font-bold">
              {((totalBalance / totalCreditLimit) * 100).toFixed(1)}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Customers Table */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">All Customers</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={customers}
            columns={columns}
            searchKey="name"
            searchPlaceholder="Search customers..."
          />
        </CardContent>
      </Card>
    </div>
  );
}
