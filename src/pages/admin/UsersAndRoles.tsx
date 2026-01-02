import { Plus, Shield, User, Edit2, Trash2 } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const users = [
  { id: '1', name: 'John Smith', email: 'john.smith@company.com', role: 'admin', status: 'active', lastLogin: '2024-01-20 10:30' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah.johnson@company.com', role: 'hr_manager', status: 'active', lastLogin: '2024-01-20 09:15' },
  { id: '3', name: 'Michael Chen', email: 'michael.chen@company.com', role: 'accountant', status: 'active', lastLogin: '2024-01-19 16:45' },
  { id: '4', name: 'Emily Davis', email: 'emily.davis@company.com', role: 'sales_rep', status: 'active', lastLogin: '2024-01-20 08:00' },
  { id: '5', name: 'Robert Wilson', email: 'robert.wilson@company.com', role: 'inventory_manager', status: 'inactive', lastLogin: '2024-01-15 14:30' },
];

const roles = [
  { 
    id: 'admin', 
    name: 'Administrator', 
    description: 'Full system access with all permissions',
    users: 1,
    color: 'bg-destructive/10 text-destructive'
  },
  { 
    id: 'manager', 
    name: 'Manager', 
    description: 'Manage teams and approve workflows',
    users: 2,
    color: 'bg-warning/10 text-warning'
  },
  { 
    id: 'accountant', 
    name: 'Accountant', 
    description: 'Access to finance module',
    users: 3,
    color: 'bg-info/10 text-info'
  },
  { 
    id: 'hr_manager', 
    name: 'HR Manager', 
    description: 'Access to HR module',
    users: 1,
    color: 'bg-success/10 text-success'
  },
  { 
    id: 'inventory_manager', 
    name: 'Inventory Manager', 
    description: 'Access to inventory module',
    users: 2,
    color: 'bg-accent/10 text-accent'
  },
  { 
    id: 'sales_rep', 
    name: 'Sales Representative', 
    description: 'Access to sales module',
    users: 4,
    color: 'bg-primary/10 text-primary'
  },
  { 
    id: 'viewer', 
    name: 'Viewer', 
    description: 'Read-only access',
    users: 5,
    color: 'bg-muted text-muted-foreground'
  },
];

const permissions = [
  { module: 'Dashboard', admin: true, manager: true, accountant: true, hr_manager: true, inventory_manager: true, sales_rep: true, viewer: true },
  { module: 'Finance - View', admin: true, manager: true, accountant: true, hr_manager: false, inventory_manager: false, sales_rep: false, viewer: true },
  { module: 'Finance - Edit', admin: true, manager: false, accountant: true, hr_manager: false, inventory_manager: false, sales_rep: false, viewer: false },
  { module: 'Finance - Approve', admin: true, manager: true, accountant: false, hr_manager: false, inventory_manager: false, sales_rep: false, viewer: false },
  { module: 'Inventory - View', admin: true, manager: true, accountant: false, hr_manager: false, inventory_manager: true, sales_rep: true, viewer: true },
  { module: 'Inventory - Edit', admin: true, manager: true, accountant: false, hr_manager: false, inventory_manager: true, sales_rep: false, viewer: false },
  { module: 'HR - View', admin: true, manager: true, accountant: false, hr_manager: true, inventory_manager: false, sales_rep: false, viewer: true },
  { module: 'HR - Edit', admin: true, manager: false, accountant: false, hr_manager: true, inventory_manager: false, sales_rep: false, viewer: false },
  { module: 'Sales - View', admin: true, manager: true, accountant: true, hr_manager: false, inventory_manager: false, sales_rep: true, viewer: true },
  { module: 'Sales - Edit', admin: true, manager: true, accountant: false, hr_manager: false, inventory_manager: false, sales_rep: true, viewer: false },
  { module: 'Admin - Users', admin: true, manager: false, accountant: false, hr_manager: false, inventory_manager: false, sales_rep: false, viewer: false },
  { module: 'Admin - Settings', admin: true, manager: false, accountant: false, hr_manager: false, inventory_manager: false, sales_rep: false, viewer: false },
];

export default function UsersAndRoles() {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Users & Roles"
        description="Manage system users and their permissions"
        breadcrumbs={[
          { label: 'Administration', href: '/admin' },
          { label: 'Users & Roles' },
        ]}
        actions={
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        }
      />

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList>
          <TabsTrigger value="users" className="gap-2">
            <User className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="roles" className="gap-2">
            <Shield className="h-4 w-4" />
            Roles
          </TabsTrigger>
          <TabsTrigger value="permissions" className="gap-2">
            Permissions Matrix
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">System Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border">
                <table className="w-full">
                  <thead className="erp-table-header">
                    <tr>
                      <th className="px-4 py-3 text-left">User</th>
                      <th className="px-4 py-3 text-left">Role</th>
                      <th className="px-4 py-3 text-left">Status</th>
                      <th className="px-4 py-3 text-left">Last Login</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-t hover:bg-muted/50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary capitalize">
                            {user.role.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={cn(
                            'px-2 py-0.5 rounded text-xs font-medium',
                            user.status === 'active' 
                              ? 'bg-success/10 text-success' 
                              : 'bg-muted text-muted-foreground'
                          )}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">
                          {user.lastLogin}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {roles.map((role) => (
              <Card key={role.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className={cn('p-2 rounded-lg', role.color)}>
                      <Shield className="h-5 w-5" />
                    </div>
                    <span className="text-sm text-muted-foreground">{role.users} users</span>
                  </div>
                  <h3 className="font-semibold mb-1">{role.name}</h3>
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="permissions">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Permissions Matrix</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border overflow-x-auto">
                <table className="w-full">
                  <thead className="erp-table-header">
                    <tr>
                      <th className="px-4 py-3 text-left sticky left-0 bg-muted/50">Module</th>
                      <th className="px-4 py-3 text-center">Admin</th>
                      <th className="px-4 py-3 text-center">Manager</th>
                      <th className="px-4 py-3 text-center">Accountant</th>
                      <th className="px-4 py-3 text-center">HR Manager</th>
                      <th className="px-4 py-3 text-center">Inventory</th>
                      <th className="px-4 py-3 text-center">Sales</th>
                      <th className="px-4 py-3 text-center">Viewer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {permissions.map((perm, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-2 font-medium sticky left-0 bg-card">{perm.module}</td>
                        {(['admin', 'manager', 'accountant', 'hr_manager', 'inventory_manager', 'sales_rep', 'viewer'] as const).map((role) => (
                          <td key={role} className="px-4 py-2 text-center">
                            {perm[role] ? (
                              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-success/10 text-success">
                                ✓
                              </span>
                            ) : (
                              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-muted text-muted-foreground">
                                –
                              </span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
