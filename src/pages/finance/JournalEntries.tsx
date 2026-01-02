import { useState } from 'react';
import { Plus, Filter, Download } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable, Column } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { journalEntries } from '@/store/mockData';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { JournalEntry } from '@/types/erp';

const columns: Column<JournalEntry>[] = [
  { 
    key: 'reference', 
    header: 'Reference', 
    sortable: true,
    render: (row) => (
      <span className="font-mono text-sm font-medium text-primary">{row.reference}</span>
    )
  },
  { key: 'date', header: 'Date', sortable: true },
  { 
    key: 'description', 
    header: 'Description',
    className: 'max-w-xs truncate'
  },
  { 
    key: 'lines', 
    header: 'Amount',
    render: (row) => {
      const total = row.lines.reduce((sum, line) => sum + line.debit, 0);
      return (
        <span className="font-medium tabular-nums">${total.toLocaleString()}</span>
      );
    }
  },
  { key: 'createdBy', header: 'Created By' },
  { 
    key: 'status', 
    header: 'Status',
    render: (row) => <StatusBadge status={row.status} />
  },
];

export default function JournalEntries() {
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);

  const statusCounts = journalEntries.reduce((acc, entry) => {
    acc[entry.status] = (acc[entry.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Journal Entries"
        description="Record and manage accounting transactions"
        breadcrumbs={[
          { label: 'Finance', href: '/finance' },
          { label: 'Journal Entries' },
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
              New Entry
            </Button>
          </>
        }
      />

      {/* Status Summary */}
      <div className="grid gap-4 md:grid-cols-5">
        {(['draft', 'pending', 'approved', 'posted', 'rejected'] as const).map((status) => (
          <Card key={status} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <StatusBadge status={status} />
                <span className="text-2xl font-bold">{statusCounts[status] || 0}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Journal Entries Table */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">All Journal Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={journalEntries}
            columns={columns}
            searchKey="reference"
            searchPlaceholder="Search by reference..."
            onRowClick={setSelectedEntry}
          />
        </CardContent>
      </Card>

      {/* Entry Detail Dialog */}
      <Dialog open={!!selectedEntry} onOpenChange={() => setSelectedEntry(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <span className="font-mono">{selectedEntry?.reference}</span>
              {selectedEntry && <StatusBadge status={selectedEntry.status} />}
            </DialogTitle>
            <DialogDescription>
              {selectedEntry?.description}
            </DialogDescription>
          </DialogHeader>
          
          {selectedEntry && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Date:</span>
                  <span className="ml-2 font-medium">{selectedEntry.date}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Created by:</span>
                  <span className="ml-2 font-medium">{selectedEntry.createdBy}</span>
                </div>
                {selectedEntry.approvedBy && (
                  <div>
                    <span className="text-muted-foreground">Approved by:</span>
                    <span className="ml-2 font-medium">{selectedEntry.approvedBy}</span>
                  </div>
                )}
              </div>

              <div className="rounded-lg border">
                <table className="w-full">
                  <thead className="erp-table-header">
                    <tr>
                      <th className="px-4 py-3 text-left">Account</th>
                      <th className="px-4 py-3 text-right">Debit</th>
                      <th className="px-4 py-3 text-right">Credit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedEntry.lines.map((line) => (
                      <tr key={line.id} className="border-t">
                        <td className="px-4 py-3">
                          <span className="font-mono text-sm text-muted-foreground mr-2">
                            {line.accountCode}
                          </span>
                          {line.accountName}
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums">
                          {line.debit > 0 ? `$${line.debit.toLocaleString()}` : '-'}
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums">
                          {line.credit > 0 ? `$${line.credit.toLocaleString()}` : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-muted/50 font-medium">
                    <tr>
                      <td className="px-4 py-3">Total</td>
                      <td className="px-4 py-3 text-right tabular-nums">
                        ${selectedEntry.lines.reduce((sum, l) => sum + l.debit, 0).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums">
                        ${selectedEntry.lines.reduce((sum, l) => sum + l.credit, 0).toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {selectedEntry.status === 'pending' && (
                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline">Reject</Button>
                  <Button>Approve</Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
