import { 
  DollarSign, 
  TrendingUp, 
  Package, 
  Users, 
  ShoppingCart,
  AlertTriangle,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { KPICard } from '@/components/common/KPICard';
import { DataTable, Column } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { journalEntries, salesOrders, leaveRequests, inventoryItems, employees } from '@/store/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const lowStockItems = inventoryItems.filter(item => item.quantityOnHand <= item.reorderLevel);

const recentJournalColumns: Column<typeof journalEntries[0]>[] = [
  { key: 'reference', header: 'Reference', sortable: true },
  { key: 'date', header: 'Date', sortable: true },
  { key: 'description', header: 'Description' },
  { 
    key: 'status', 
    header: 'Status',
    render: (row) => <StatusBadge status={row.status} />
  },
];

const pendingApprovals = [
  ...journalEntries.filter(j => j.status === 'pending').map(j => ({
    id: j.id,
    type: 'Journal Entry',
    reference: j.reference,
    requestedBy: j.createdBy,
    date: j.date,
  })),
  ...leaveRequests.filter(l => l.status === 'pending').map(l => {
    const emp = employees.find(e => e.id === l.employeeId);
    return {
      id: l.id,
      type: 'Leave Request',
      reference: `${emp?.firstName} ${emp?.lastName}`,
      requestedBy: `${emp?.firstName} ${emp?.lastName}`,
      date: l.startDate,
    };
  }),
];

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, John. Here's what's happening today.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Revenue"
          value="$1,037,000"
          change={12.5}
          changeLabel="vs last month"
          icon={DollarSign}
          iconClassName="bg-success/10 text-success"
        />
        <KPICard
          title="Gross Profit"
          value="$358,000"
          change={8.2}
          changeLabel="vs last month"
          icon={TrendingUp}
          iconClassName="bg-primary/10 text-primary"
        />
        <KPICard
          title="Inventory Value"
          value="$234,000"
          change={-2.4}
          changeLabel="vs last month"
          icon={Package}
          iconClassName="bg-accent/10 text-accent"
        />
        <KPICard
          title="Active Employees"
          value="156"
          change={3}
          changeLabel="new this month"
          icon={Users}
          iconClassName="bg-info/10 text-info"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Journal Entries */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-lg font-semibold">Recent Journal Entries</CardTitle>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <DataTable 
              data={journalEntries} 
              columns={recentJournalColumns}
              pageSize={5}
            />
          </CardContent>
        </Card>

        {/* Pending Approvals */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-lg font-semibold">Pending Approvals</CardTitle>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-warning/10 text-xs font-bold text-warning">
              {pendingApprovals.length}
            </span>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingApprovals.map((item) => (
              <div 
                key={item.id}
                className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
                  <Clock className="h-5 w-5 text-warning" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.reference}</p>
                  <p className="text-xs text-muted-foreground">{item.type}</p>
                </div>
                <Button size="sm" variant="ghost">
                  Review
                </Button>
              </div>
            ))}
            {pendingApprovals.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CheckCircle2 className="h-12 w-12 text-success/50 mb-2" />
                <p className="text-sm text-muted-foreground">All caught up!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Low Stock Alerts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <CardTitle className="text-lg font-semibold">Low Stock Alerts</CardTitle>
            </div>
            <Button variant="outline" size="sm">
              View Inventory
            </Button>
          </CardHeader>
          <CardContent>
            {lowStockItems.length > 0 ? (
              <div className="space-y-3">
                {lowStockItems.map((item) => (
                  <div 
                    key={item.id}
                    className="flex items-center justify-between rounded-lg border border-warning/20 bg-warning/5 p-3"
                  >
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">SKU: {item.sku}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-warning">{item.quantityOnHand} units</p>
                      <p className="text-xs text-muted-foreground">Reorder at {item.reorderLevel}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Package className="h-12 w-12 text-muted-foreground/50 mb-2" />
                <p className="text-sm text-muted-foreground">All stock levels are healthy</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Sales Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg font-semibold">Recent Sales Orders</CardTitle>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {salesOrders.map((order) => (
                <div 
                  key={order.id}
                  className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
                >
                  <div>
                    <p className="text-sm font-medium">{order.orderNumber}</p>
                    <p className="text-xs text-muted-foreground">{order.customerName}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-semibold">${order.total.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">{order.date}</p>
                    </div>
                    <StatusBadge status={order.status} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
