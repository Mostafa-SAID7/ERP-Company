// Core ERP Types

export type UserRole = 'admin' | 'manager' | 'accountant' | 'hr_manager' | 'inventory_manager' | 'sales_rep' | 'viewer';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  department: string;
  tenantId: string;
}

export interface Tenant {
  id: string;
  name: string;
  logo?: string;
  settings: TenantSettings;
}

export interface TenantSettings {
  currency: string;
  dateFormat: string;
  fiscalYearStart: string;
  timezone: string;
}

// Finance Types
export interface Account {
  id: string;
  code: string;
  name: string;
  type: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
  parentId?: string;
  balance: number;
  isActive: boolean;
}

export interface JournalEntry {
  id: string;
  date: string;
  reference: string;
  description: string;
  lines: JournalLine[];
  status: 'draft' | 'pending' | 'approved' | 'posted' | 'rejected';
  createdBy: string;
  approvedBy?: string;
}

export interface JournalLine {
  id: string;
  accountId: string;
  accountCode: string;
  accountName: string;
  debit: number;
  credit: number;
  description?: string;
}

// Inventory Types
export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  description: string;
  category: string;
  unitOfMeasure: string;
  costPrice: number;
  sellingPrice: number;
  quantityOnHand: number;
  reorderLevel: number;
  warehouseId: string;
  isActive: boolean;
}

export interface Warehouse {
  id: string;
  code: string;
  name: string;
  address: string;
  isActive: boolean;
}

export interface StockMovement {
  id: string;
  type: 'in' | 'out' | 'transfer';
  itemId: string;
  quantity: number;
  fromWarehouse?: string;
  toWarehouse?: string;
  reference: string;
  date: string;
  notes?: string;
}

// HR Types
export interface Employee {
  id: string;
  employeeNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  departmentId: string;
  position: string;
  hireDate: string;
  status: 'active' | 'inactive' | 'terminated';
  managerId?: string;
  salary?: number;
}

export interface Department {
  id: string;
  code: string;
  name: string;
  managerId?: string;
  parentId?: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  type: 'annual' | 'sick' | 'unpaid' | 'maternity' | 'paternity';
  startDate: string;
  endDate: string;
  days: number;
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
  approvedBy?: string;
}

// Sales Types
export interface Customer {
  id: string;
  code: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  creditLimit: number;
  balance: number;
  isActive: boolean;
}

export interface SalesOrder {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  date: string;
  dueDate: string;
  lines: OrderLine[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'draft' | 'confirmed' | 'shipped' | 'invoiced' | 'cancelled';
}

export interface OrderLine {
  id: string;
  itemId: string;
  itemSku: string;
  itemName: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  total: number;
}

// Common Types
export interface AuditLog {
  id: string;
  entityType: string;
  entityId: string;
  action: 'create' | 'update' | 'delete' | 'approve' | 'reject';
  userId: string;
  userName: string;
  timestamp: string;
  changes?: Record<string, { old: unknown; new: unknown }>;
}

export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
  link?: string;
}

export interface KPIData {
  label: string;
  value: number | string;
  change?: number;
  changeType?: 'increase' | 'decrease';
  icon?: string;
}
