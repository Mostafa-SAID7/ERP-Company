import { useState } from 'react';
import { Plus, Filter, Download } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable, Column } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { salesOrders } from '@/store/mockData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { SalesOrder } from '@/types/erp';

const columns: Column<SalesOrder>[] = [
  { 
    key: 'orderNumber', 
    header: 'Order #', 
    sortable: true,
    render: (row) => (
      <span className="font-mono text-sm font-medium text-primary">{row.orderNumber}</span>
    )
  },
  { key: 'customerName', header: 'Customer', sortable: true },
  { key: 'date', header: 'Order Date', sortable: true },
  { key: 'dueDate', header: 'Due Date', sortable: true },
  { 
    key: 'lines', 
    header: 'Items',
    render: (row) => (
      <span>{row.lines.length} items</span>
    )
  },
  { 
    key: 'total', 
    header: 'Total',
    render: (row) => (
      <span className="font-semibold tabular-nums">${row.total.toLocaleString()}</span>
    )
  },
  { 
    key: 'status', 
    header: 'Status',
    render: (row) => <StatusBadge status={row.status} />
  },
];

export default function SalesOrders() {
  const [selectedOrder, setSelectedOrder] = useState<SalesOrder | null>(null);

  const totalRevenue = salesOrders.reduce((sum, o) => sum + o.total, 0);
  const statusCounts = salesOrders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Sales Orders"
        description="Track and manage customer orders"
        breadcrumbs={[
          { label: 'Sales', href: '/sales' },
          { label: 'Orders' },
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
              New Order
            </Button>
          </>
        }
      />

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Orders</p>
            <p className="text-2xl font-bold">{salesOrders.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Value</p>
            <p className="text-2xl font-bold tabular-nums">${totalRevenue.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <StatusBadge status="draft" />
              <span className="text-xl font-bold">{statusCounts['draft'] || 0}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <StatusBadge status="confirmed" />
              <span className="text-xl font-bold">{statusCounts['confirmed'] || 0}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <StatusBadge status="shipped" />
              <span className="text-xl font-bold">{statusCounts['shipped'] || 0}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={salesOrders}
            columns={columns}
            searchKey="orderNumber"
            searchPlaceholder="Search orders..."
            onRowClick={setSelectedOrder}
          />
        </CardContent>
      </Card>

      {/* Order Detail Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <span className="font-mono">{selectedOrder?.orderNumber}</span>
              {selectedOrder && <StatusBadge status={selectedOrder.status} />}
            </DialogTitle>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Customer:</span>
                  <span className="ml-2 font-medium">{selectedOrder.customerName}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Order Date:</span>
                  <span className="ml-2 font-medium">{selectedOrder.date}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Due Date:</span>
                  <span className="ml-2 font-medium">{selectedOrder.dueDate}</span>
                </div>
              </div>

              <div className="rounded-lg border">
                <table className="w-full">
                  <thead className="erp-table-header">
                    <tr>
                      <th className="px-4 py-3 text-left">Item</th>
                      <th className="px-4 py-3 text-right">Qty</th>
                      <th className="px-4 py-3 text-right">Unit Price</th>
                      <th className="px-4 py-3 text-right">Discount</th>
                      <th className="px-4 py-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.lines.map((line) => (
                      <tr key={line.id} className="border-t">
                        <td className="px-4 py-3">
                          <span className="font-mono text-sm text-muted-foreground mr-2">
                            {line.itemSku}
                          </span>
                          {line.itemName}
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums">{line.quantity}</td>
                        <td className="px-4 py-3 text-right tabular-nums">${line.unitPrice.toFixed(2)}</td>
                        <td className="px-4 py-3 text-right tabular-nums">{line.discount}%</td>
                        <td className="px-4 py-3 text-right tabular-nums font-medium">
                          ${line.total.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-muted/50">
                    <tr className="border-t">
                      <td colSpan={4} className="px-4 py-2 text-right">Subtotal</td>
                      <td className="px-4 py-2 text-right tabular-nums">
                        ${selectedOrder.subtotal.toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={4} className="px-4 py-2 text-right">Tax (8%)</td>
                      <td className="px-4 py-2 text-right tabular-nums">
                        ${selectedOrder.tax.toLocaleString()}
                      </td>
                    </tr>
                    <tr className="font-bold">
                      <td colSpan={4} className="px-4 py-2 text-right">Total</td>
                      <td className="px-4 py-2 text-right tabular-nums">
                        ${selectedOrder.total.toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                {selectedOrder.status === 'draft' && (
                  <>
                    <Button variant="outline">Edit</Button>
                    <Button>Confirm Order</Button>
                  </>
                )}
                {selectedOrder.status === 'confirmed' && (
                  <Button>Mark as Shipped</Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
