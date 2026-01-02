import { useState } from 'react';
import { Plus, Filter, Download, AlertTriangle } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable, Column } from '@/components/common/DataTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { inventoryItems, warehouses } from '@/store/mockData';
import { cn } from '@/lib/utils';
import type { InventoryItem } from '@/types/erp';

const columns: Column<InventoryItem>[] = [
  { 
    key: 'sku', 
    header: 'SKU', 
    sortable: true,
    render: (row) => (
      <span className="font-mono text-sm font-medium">{row.sku}</span>
    )
  },
  { key: 'name', header: 'Item Name', sortable: true },
  { key: 'category', header: 'Category', sortable: true },
  { 
    key: 'quantityOnHand', 
    header: 'Qty on Hand',
    sortable: true,
    render: (row) => {
      const isLow = row.quantityOnHand <= row.reorderLevel;
      return (
        <div className="flex items-center gap-2">
          <span className={cn(
            'font-medium tabular-nums',
            isLow && 'text-warning'
          )}>
            {row.quantityOnHand}
          </span>
          {isLow && <AlertTriangle className="h-4 w-4 text-warning" />}
        </div>
      );
    }
  },
  { key: 'unitOfMeasure', header: 'UoM' },
  { 
    key: 'costPrice', 
    header: 'Cost',
    render: (row) => (
      <span className="tabular-nums">${row.costPrice.toFixed(2)}</span>
    )
  },
  { 
    key: 'sellingPrice', 
    header: 'Sell Price',
    render: (row) => (
      <span className="tabular-nums">${row.sellingPrice.toFixed(2)}</span>
    )
  },
  { 
    key: 'warehouseId', 
    header: 'Warehouse',
    render: (row) => {
      const warehouse = warehouses.find(w => w.id === row.warehouseId);
      return warehouse?.name || '-';
    }
  },
];

export default function InventoryItems() {
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  const totalValue = inventoryItems.reduce(
    (sum, item) => sum + item.quantityOnHand * item.costPrice, 
    0
  );
  const lowStockCount = inventoryItems.filter(
    item => item.quantityOnHand <= item.reorderLevel
  ).length;
  const categories = [...new Set(inventoryItems.map(item => item.category))];

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Inventory Items"
        description="Manage your product catalog and stock levels"
        breadcrumbs={[
          { label: 'Inventory', href: '/inventory' },
          { label: 'Items' },
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
              Add Item
            </Button>
          </>
        }
      />

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Items</p>
            <p className="text-2xl font-bold">{inventoryItems.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Inventory Value</p>
            <p className="text-2xl font-bold tabular-nums">${totalValue.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Categories</p>
            <p className="text-2xl font-bold">{categories.length}</p>
          </CardContent>
        </Card>
        <Card className={cn(lowStockCount > 0 && 'border-warning/50 bg-warning/5')}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Low Stock Items</p>
                <p className={cn(
                  'text-2xl font-bold',
                  lowStockCount > 0 && 'text-warning'
                )}>
                  {lowStockCount}
                </p>
              </div>
              {lowStockCount > 0 && (
                <AlertTriangle className="h-8 w-8 text-warning" />
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Items Table */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">All Items</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={inventoryItems}
            columns={columns}
            searchKey="name"
            searchPlaceholder="Search items..."
            onRowClick={setSelectedItem}
          />
        </CardContent>
      </Card>
    </div>
  );
}
