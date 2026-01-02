import { Plus, Filter, Download, Mail, Phone } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable, Column } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { employees, departments } from '@/store/mockData';
import type { Employee } from '@/types/erp';

const columns: Column<Employee>[] = [
  { 
    key: 'employeeNumber', 
    header: 'Emp #', 
    sortable: true,
    render: (row) => (
      <span className="font-mono text-sm">{row.employeeNumber}</span>
    )
  },
  { 
    key: 'firstName', 
    header: 'Name',
    sortable: true,
    render: (row) => (
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
          {row.firstName[0]}{row.lastName[0]}
        </div>
        <div>
          <p className="font-medium">{row.firstName} {row.lastName}</p>
          <p className="text-sm text-muted-foreground">{row.position}</p>
        </div>
      </div>
    )
  },
  { 
    key: 'departmentId', 
    header: 'Department',
    render: (row) => {
      const dept = departments.find(d => d.id === row.departmentId);
      return dept?.name || '-';
    }
  },
  { 
    key: 'email', 
    header: 'Contact',
    render: (row) => (
      <div className="space-y-1">
        <div className="flex items-center gap-1 text-sm">
          <Mail className="h-3 w-3 text-muted-foreground" />
          <span className="text-muted-foreground">{row.email}</span>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <Phone className="h-3 w-3 text-muted-foreground" />
          <span className="text-muted-foreground">{row.phone}</span>
        </div>
      </div>
    )
  },
  { key: 'hireDate', header: 'Hire Date', sortable: true },
  { 
    key: 'status', 
    header: 'Status',
    render: (row) => <StatusBadge status={row.status} />
  },
];

export default function Employees() {
  const activeCount = employees.filter(e => e.status === 'active').length;
  const deptCounts = employees.reduce((acc, emp) => {
    const dept = departments.find(d => d.id === emp.departmentId);
    if (dept) {
      acc[dept.name] = (acc[dept.name] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Employees"
        description="Manage your workforce and personnel records"
        breadcrumbs={[
          { label: 'Human Resources', href: '/hr' },
          { label: 'Employees' },
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
              Add Employee
            </Button>
          </>
        }
      />

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Employees</p>
            <p className="text-2xl font-bold">{employees.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Active</p>
            <p className="text-2xl font-bold text-success">{activeCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Departments</p>
            <p className="text-2xl font-bold">{departments.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Avg. Tenure</p>
            <p className="text-2xl font-bold">2.8 yrs</p>
          </CardContent>
        </Card>
      </div>

      {/* Department Distribution */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">By Department</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            {Object.entries(deptCounts).map(([dept, count]) => (
              <div 
                key={dept}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-muted/30"
              >
                <span className="text-sm font-medium">{dept}</span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Employees Table */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">All Employees</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={employees}
            columns={columns}
            searchKey="firstName"
            searchPlaceholder="Search employees..."
          />
        </CardContent>
      </Card>
    </div>
  );
}
