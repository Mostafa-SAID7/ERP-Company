import type { 
  User, Account, JournalEntry, InventoryItem, Warehouse, 
  Employee, Department, Customer, SalesOrder, Notification, LeaveRequest 
} from '@/types/erp';

export const currentUser: User = {
  id: '1',
  email: 'john.smith@acmecorp.com',
  name: 'John Smith',
  role: 'admin',
  department: 'Finance',
  tenantId: 'tenant-1',
};

export const accounts: Account[] = [
  { id: '1', code: '1000', name: 'Cash', type: 'asset', balance: 125000, isActive: true },
  { id: '2', code: '1100', name: 'Accounts Receivable', type: 'asset', balance: 89500, isActive: true },
  { id: '3', code: '1200', name: 'Inventory', type: 'asset', balance: 234000, isActive: true },
  { id: '4', code: '1500', name: 'Fixed Assets', type: 'asset', balance: 450000, isActive: true },
  { id: '5', code: '2000', name: 'Accounts Payable', type: 'liability', balance: 67800, isActive: true },
  { id: '6', code: '2100', name: 'Accrued Expenses', type: 'liability', balance: 23400, isActive: true },
  { id: '7', code: '3000', name: 'Common Stock', type: 'equity', balance: 500000, isActive: true },
  { id: '8', code: '3100', name: 'Retained Earnings', type: 'equity', balance: 156300, isActive: true },
  { id: '9', code: '4000', name: 'Sales Revenue', type: 'revenue', balance: 892000, isActive: true },
  { id: '10', code: '4100', name: 'Service Revenue', type: 'revenue', balance: 145000, isActive: true },
  { id: '11', code: '5000', name: 'Cost of Goods Sold', type: 'expense', balance: 534000, isActive: true },
  { id: '12', code: '6000', name: 'Operating Expenses', type: 'expense', balance: 187000, isActive: true },
];

export const journalEntries: JournalEntry[] = [
  {
    id: '1',
    date: '2024-01-15',
    reference: 'JE-2024-0001',
    description: 'Record monthly rent expense',
    status: 'posted',
    createdBy: 'John Smith',
    approvedBy: 'Sarah Johnson',
    lines: [
      { id: '1', accountId: '12', accountCode: '6000', accountName: 'Operating Expenses', debit: 5000, credit: 0 },
      { id: '2', accountId: '1', accountCode: '1000', accountName: 'Cash', debit: 0, credit: 5000 },
    ],
  },
  {
    id: '2',
    date: '2024-01-16',
    reference: 'JE-2024-0002',
    description: 'Record customer payment',
    status: 'pending',
    createdBy: 'Mike Wilson',
    lines: [
      { id: '3', accountId: '1', accountCode: '1000', accountName: 'Cash', debit: 15000, credit: 0 },
      { id: '4', accountId: '2', accountCode: '1100', accountName: 'Accounts Receivable', debit: 0, credit: 15000 },
    ],
  },
  {
    id: '3',
    date: '2024-01-17',
    reference: 'JE-2024-0003',
    description: 'Inventory purchase',
    status: 'draft',
    createdBy: 'Emily Brown',
    lines: [
      { id: '5', accountId: '3', accountCode: '1200', accountName: 'Inventory', debit: 25000, credit: 0 },
      { id: '6', accountId: '5', accountCode: '2000', accountName: 'Accounts Payable', debit: 0, credit: 25000 },
    ],
  },
];

export const warehouses: Warehouse[] = [
  { id: '1', code: 'WH-MAIN', name: 'Main Warehouse', address: '123 Industrial Ave, City', isActive: true },
  { id: '2', code: 'WH-NORTH', name: 'North Distribution Center', address: '456 Commerce Blvd, North City', isActive: true },
  { id: '3', code: 'WH-SOUTH', name: 'South Depot', address: '789 Logistics Way, South Town', isActive: true },
];

export const inventoryItems: InventoryItem[] = [
  { id: '1', sku: 'SKU-001', name: 'Industrial Motor A100', description: 'High-efficiency industrial motor', category: 'Motors', unitOfMeasure: 'Unit', costPrice: 450, sellingPrice: 675, quantityOnHand: 45, reorderLevel: 20, warehouseId: '1', isActive: true },
  { id: '2', sku: 'SKU-002', name: 'Steel Pipe 2"', description: 'Galvanized steel pipe, 2 inch diameter', category: 'Pipes', unitOfMeasure: 'Meter', costPrice: 12, sellingPrice: 18, quantityOnHand: 1200, reorderLevel: 500, warehouseId: '1', isActive: true },
  { id: '3', sku: 'SKU-003', name: 'Control Panel CP-500', description: 'Industrial control panel with PLC', category: 'Electronics', unitOfMeasure: 'Unit', costPrice: 2800, sellingPrice: 4200, quantityOnHand: 12, reorderLevel: 5, warehouseId: '2', isActive: true },
  { id: '4', sku: 'SKU-004', name: 'Hydraulic Pump HP-200', description: 'Heavy-duty hydraulic pump', category: 'Pumps', unitOfMeasure: 'Unit', costPrice: 890, sellingPrice: 1335, quantityOnHand: 8, reorderLevel: 10, warehouseId: '1', isActive: true },
  { id: '5', sku: 'SKU-005', name: 'Safety Valve SV-100', description: 'Pressure relief safety valve', category: 'Valves', unitOfMeasure: 'Unit', costPrice: 125, sellingPrice: 188, quantityOnHand: 156, reorderLevel: 50, warehouseId: '3', isActive: true },
  { id: '6', sku: 'SKU-006', name: 'Bearing Set BS-50', description: 'Industrial bearing set, 50mm', category: 'Bearings', unitOfMeasure: 'Set', costPrice: 45, sellingPrice: 68, quantityOnHand: 340, reorderLevel: 100, warehouseId: '1', isActive: true },
];

export const departments: Department[] = [
  { id: '1', code: 'FIN', name: 'Finance' },
  { id: '2', code: 'HR', name: 'Human Resources' },
  { id: '3', code: 'OPS', name: 'Operations' },
  { id: '4', code: 'SALES', name: 'Sales' },
  { id: '5', code: 'IT', name: 'Information Technology' },
  { id: '6', code: 'MFG', name: 'Manufacturing' },
];

export const employees: Employee[] = [
  { id: '1', employeeNumber: 'EMP-001', firstName: 'John', lastName: 'Smith', email: 'john.smith@company.com', phone: '+1-555-0101', departmentId: '1', position: 'Finance Director', hireDate: '2019-03-15', status: 'active', salary: 95000 },
  { id: '2', employeeNumber: 'EMP-002', firstName: 'Sarah', lastName: 'Johnson', email: 'sarah.johnson@company.com', phone: '+1-555-0102', departmentId: '2', position: 'HR Manager', hireDate: '2020-01-10', status: 'active', managerId: '1', salary: 78000 },
  { id: '3', employeeNumber: 'EMP-003', firstName: 'Michael', lastName: 'Chen', email: 'michael.chen@company.com', phone: '+1-555-0103', departmentId: '5', position: 'IT Lead', hireDate: '2021-06-01', status: 'active', salary: 82000 },
  { id: '4', employeeNumber: 'EMP-004', firstName: 'Emily', lastName: 'Davis', email: 'emily.davis@company.com', phone: '+1-555-0104', departmentId: '4', position: 'Sales Representative', hireDate: '2022-02-20', status: 'active', managerId: '1', salary: 55000 },
  { id: '5', employeeNumber: 'EMP-005', firstName: 'Robert', lastName: 'Wilson', email: 'robert.wilson@company.com', phone: '+1-555-0105', departmentId: '3', position: 'Operations Manager', hireDate: '2018-09-01', status: 'active', salary: 72000 },
  { id: '6', employeeNumber: 'EMP-006', firstName: 'Jennifer', lastName: 'Martinez', email: 'jennifer.martinez@company.com', phone: '+1-555-0106', departmentId: '6', position: 'Production Supervisor', hireDate: '2020-11-15', status: 'active', managerId: '5', salary: 58000 },
];

export const leaveRequests: LeaveRequest[] = [
  { id: '1', employeeId: '2', type: 'annual', startDate: '2024-02-15', endDate: '2024-02-20', days: 4, status: 'pending', reason: 'Family vacation' },
  { id: '2', employeeId: '4', type: 'sick', startDate: '2024-01-25', endDate: '2024-01-26', days: 2, status: 'approved', reason: 'Medical appointment', approvedBy: '2' },
  { id: '3', employeeId: '3', type: 'annual', startDate: '2024-03-01', endDate: '2024-03-05', days: 5, status: 'approved', reason: 'Personal time off', approvedBy: '1' },
];

export const customers: Customer[] = [
  { id: '1', code: 'CUST-001', name: 'Acme Industries', email: 'orders@acme.com', phone: '+1-555-1000', address: '100 Business Park, Metro City', creditLimit: 100000, balance: 45000, isActive: true },
  { id: '2', code: 'CUST-002', name: 'TechCorp Solutions', email: 'purchasing@techcorp.com', phone: '+1-555-2000', address: '200 Tech Boulevard, Innovation City', creditLimit: 75000, balance: 23500, isActive: true },
  { id: '3', code: 'CUST-003', name: 'Global Manufacturing', email: 'supply@globalmanuf.com', phone: '+1-555-3000', address: '300 Industrial Way, Factory Town', creditLimit: 150000, balance: 89000, isActive: true },
  { id: '4', code: 'CUST-004', name: 'Premier Services LLC', email: 'info@premierllc.com', phone: '+1-555-4000', address: '400 Commerce Street, Business District', creditLimit: 50000, balance: 12000, isActive: true },
];

export const salesOrders: SalesOrder[] = [
  {
    id: '1',
    orderNumber: 'SO-2024-0001',
    customerId: '1',
    customerName: 'Acme Industries',
    date: '2024-01-15',
    dueDate: '2024-02-15',
    status: 'confirmed',
    subtotal: 15750,
    tax: 1260,
    total: 17010,
    lines: [
      { id: '1', itemId: '1', itemSku: 'SKU-001', itemName: 'Industrial Motor A100', quantity: 10, unitPrice: 675, discount: 0, total: 6750 },
      { id: '2', itemId: '3', itemSku: 'SKU-003', itemName: 'Control Panel CP-500', quantity: 2, unitPrice: 4200, discount: 5, total: 7980 },
    ],
  },
  {
    id: '2',
    orderNumber: 'SO-2024-0002',
    customerId: '2',
    customerName: 'TechCorp Solutions',
    date: '2024-01-18',
    dueDate: '2024-02-18',
    status: 'draft',
    subtotal: 8640,
    tax: 691,
    total: 9331,
    lines: [
      { id: '3', itemId: '2', itemSku: 'SKU-002', itemName: 'Steel Pipe 2"', quantity: 200, unitPrice: 18, discount: 0, total: 3600 },
      { id: '4', itemId: '6', itemSku: 'SKU-006', itemName: 'Bearing Set BS-50', quantity: 50, unitPrice: 68, discount: 10, total: 3060 },
    ],
  },
];

export const notifications: Notification[] = [
  { id: '1', type: 'warning', title: 'Low Stock Alert', message: 'Hydraulic Pump HP-200 is below reorder level', read: false, timestamp: '2024-01-20T10:30:00Z', link: '/inventory/items' },
  { id: '2', type: 'info', title: 'Approval Required', message: 'Journal entry JE-2024-0002 requires your approval', read: false, timestamp: '2024-01-20T09:15:00Z', link: '/finance/journal-entries' },
  { id: '3', type: 'success', title: 'Order Shipped', message: 'Sales order SO-2024-0001 has been shipped', read: true, timestamp: '2024-01-19T16:45:00Z', link: '/sales/orders' },
  { id: '4', type: 'info', title: 'Leave Request', message: 'Sarah Johnson submitted a leave request', read: false, timestamp: '2024-01-20T08:00:00Z', link: '/hr/leave' },
];
