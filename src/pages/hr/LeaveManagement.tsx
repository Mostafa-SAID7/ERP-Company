import { Plus, Calendar, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable, Column } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { leaveRequests, employees } from '@/store/mockData';
import type { LeaveRequest } from '@/types/erp';

type EnrichedLeaveRequest = LeaveRequest & { employeeName: string };

const columns: Column<EnrichedLeaveRequest>[] = [
  { 
    key: 'employeeName', 
    header: 'Employee',
    sortable: true,
    render: (row) => (
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
          {row.employeeName.split(' ').map(n => n[0]).join('')}
        </div>
        <span className="font-medium">{row.employeeName}</span>
      </div>
    )
  },
  { 
    key: 'type', 
    header: 'Type',
    render: (row) => (
      <span className="capitalize">{row.type} Leave</span>
    )
  },
  { key: 'startDate', header: 'Start Date', sortable: true },
  { key: 'endDate', header: 'End Date', sortable: true },
  { 
    key: 'days', 
    header: 'Days',
    render: (row) => (
      <span className="font-medium">{row.days}</span>
    )
  },
  { key: 'reason', header: 'Reason', className: 'max-w-xs truncate' },
  { 
    key: 'status', 
    header: 'Status',
    render: (row) => <StatusBadge status={row.status} />
  },
];

export default function LeaveManagement() {
  const enrichedRequests = leaveRequests.map(req => {
    const emp = employees.find(e => e.id === req.employeeId);
    return {
      ...req,
      employeeName: emp ? `${emp.firstName} ${emp.lastName}` : 'Unknown',
    };
  });

  const pendingCount = leaveRequests.filter(r => r.status === 'pending').length;
  const approvedCount = leaveRequests.filter(r => r.status === 'approved').length;
  const rejectedCount = leaveRequests.filter(r => r.status === 'rejected').length;

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Leave Management"
        description="Track and approve employee leave requests"
        breadcrumbs={[
          { label: 'Human Resources', href: '/hr' },
          { label: 'Leave Management' },
        ]}
        actions={
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Request
          </Button>
        }
      />

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Calendar className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Requests</p>
                <p className="text-2xl font-bold">{leaveRequests.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-warning/50 bg-warning/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-warning">{pendingCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold text-success">{approvedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
                <XCircle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rejected</p>
                <p className="text-2xl font-bold text-destructive">{rejectedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leave Requests Table */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">All Leave Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={enrichedRequests}
            columns={columns}
            searchKey="employeeName"
            searchPlaceholder="Search by employee..."
          />
        </CardContent>
      </Card>
    </div>
  );
}
