import { Plus, MapPin, Package } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { warehouses, inventoryItems } from '@/store/mockData';
import { cn } from '@/lib/utils';

export default function Warehouses() {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Warehouses"
        description="Manage storage locations and distribution centers"
        breadcrumbs={[
          { label: 'Inventory', href: '/inventory' },
          { label: 'Warehouses' },
        ]}
        actions={
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Warehouse
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {warehouses.map((warehouse) => {
          const warehouseItems = inventoryItems.filter(i => i.warehouseId === warehouse.id);
          const totalValue = warehouseItems.reduce(
            (sum, item) => sum + item.quantityOnHand * item.costPrice, 
            0
          );
          const totalUnits = warehouseItems.reduce(
            (sum, item) => sum + item.quantityOnHand, 
            0
          );

          return (
            <Card key={warehouse.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{warehouse.name}</CardTitle>
                    <p className="text-sm font-mono text-muted-foreground">{warehouse.code}</p>
                  </div>
                  <span 
                    className={cn(
                      'px-2 py-0.5 rounded text-xs font-medium',
                      warehouse.isActive 
                        ? 'bg-success/10 text-success' 
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    {warehouse.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{warehouse.address}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Items</p>
                    <p className="text-xl font-bold">{warehouseItems.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Units</p>
                    <p className="text-xl font-bold tabular-nums">{totalUnits.toLocaleString()}</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Inventory Value</span>
                    <span className="text-lg font-bold tabular-nums">${totalValue.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
