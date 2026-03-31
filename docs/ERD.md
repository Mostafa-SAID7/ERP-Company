# Entity Relationship Diagram (ERD)

This document describes the database schema and relationships for the ERP Company System.

## Core Entities

### Users
```
Users
├── id (PK)
├── email (UNIQUE)
├── password_hash
├── first_name
├── last_name
├── role_id (FK)
├── tenant_id (FK)
├── is_active
├── last_login
├── created_at
└── updated_at
```

### Tenants
```
Tenants
├── id (PK)
├── name
├── logo_url
├── industry
├── country
├── timezone
├── currency
├── is_active
├── created_at
└── updated_at
```

### Roles
```
Roles
├── id (PK)
├── name
├── description
├── tenant_id (FK)
├── permissions (JSON)
├── created_at
└── updated_at
```

## Finance Module

### Chart of Accounts
```
Accounts
├── id (PK)
├── account_number (UNIQUE)
├── name
├── type (Asset, Liability, Equity, Revenue, Expense)
├── parent_id (FK - self-referencing)
├── tenant_id (FK)
├── is_active
├── created_at
└── updated_at
```

### Journal Entries
```
JournalEntries
├── id (PK)
├── entry_number (UNIQUE)
├── journal_id (FK)
├── entry_date
├── description
├── tenant_id (FK)
├── created_by (FK - Users)
├── posted_date
├── is_posted
├── created_at
└── updated_at

JournalEntryLines
├── id (PK)
├── entry_id (FK)
├── account_id (FK)
├── debit_amount
├── credit_amount
├── description
└── line_number
```

### General Ledger
```
GeneralLedger
├── id (PK)
├── account_id (FK)
├── entry_line_id (FK)
├── transaction_date
├── debit_amount
├── credit_amount
├── balance
├── tenant_id (FK)
└── created_at
```

## Inventory Module

### Items
```
Items
├── id (PK)
├── sku (UNIQUE)
├── name
├── description
├── category_id (FK)
├── unit_of_measure
├── cost_price
├── selling_price
├── reorder_point
├── reorder_quantity
├── tenant_id (FK)
├── is_active
├── created_at
└── updated_at
```

### Warehouses
```
Warehouses
├── id (PK)
├── name
├── location
├── capacity
├── tenant_id (FK)
├── is_active
├── created_at
└── updated_at
```

### Stock
```
Stock
├── id (PK)
├── item_id (FK)
├── warehouse_id (FK)
├── quantity_on_hand
├── quantity_reserved
├── quantity_available
├── last_counted_date
├── tenant_id (FK)
└── updated_at

StockMovements
├── id (PK)
├── item_id (FK)
├── warehouse_id (FK)
├── movement_type (In, Out, Transfer, Adjustment)
├── quantity
├── reference_id
├── reference_type
├── notes
├── tenant_id (FK)
├── created_by (FK - Users)
├── created_at
└── updated_at
```

## Human Resources Module

### Employees
```
Employees
├── id (PK)
├── employee_number (UNIQUE)
├── first_name
├── last_name
├── email
├── phone
├── date_of_birth
├── gender
├── department_id (FK)
├── position_id (FK)
├── hire_date
├── employment_type
├── salary
├── tenant_id (FK)
├── is_active
├── created_at
└── updated_at
```

### Departments
```
Departments
├── id (PK)
├── name
├── description
├── parent_id (FK - self-referencing)
├── manager_id (FK - Employees)
├── tenant_id (FK)
├── is_active
├── created_at
└── updated_at
```

### Leave
```
LeaveTypes
├── id (PK)
├── name
├── description
├── days_per_year
├── tenant_id (FK)
└── created_at

LeaveRequests
├── id (PK)
├── employee_id (FK)
├── leave_type_id (FK)
├── start_date
├── end_date
├── days_requested
├── reason
├── status (Pending, Approved, Rejected)
├── approved_by (FK - Users)
├── tenant_id (FK)
├── created_at
└── updated_at
```

### Payroll
```
PayrollRuns
├── id (PK)
├── payroll_period_start
├── payroll_period_end
├── status (Draft, Processed, Paid)
├── tenant_id (FK)
├── created_at
└── updated_at

PayrollDetails
├── id (PK)
├── payroll_run_id (FK)
├── employee_id (FK)
├── gross_salary
├── deductions
├── net_salary
├── payment_date
└── created_at
```

## Sales & Purchasing Module

### Customers
```
Customers
├── id (PK)
├── customer_number (UNIQUE)
├── name
├── email
├── phone
├── address
├── city
├── country
├── credit_limit
├── payment_terms
├── tenant_id (FK)
├── is_active
├── created_at
└── updated_at
```

### Sales Orders
```
SalesOrders
├── id (PK)
├── order_number (UNIQUE)
├── customer_id (FK)
├── order_date
├── delivery_date
├── status (Draft, Confirmed, Shipped, Delivered, Cancelled)
├── total_amount
├── tenant_id (FK)
├── created_by (FK - Users)
├── created_at
└── updated_at

SalesOrderLines
├── id (PK)
├── order_id (FK)
├── item_id (FK)
├── quantity
├── unit_price
├── line_total
└── line_number
```

### Invoices
```
Invoices
├── id (PK)
├── invoice_number (UNIQUE)
├── customer_id (FK)
├── order_id (FK)
├── invoice_date
├── due_date
├── status (Draft, Sent, Paid, Overdue, Cancelled)
├── subtotal
├── tax_amount
├── total_amount
├── tenant_id (FK)
├── created_at
└── updated_at

InvoiceLines
├── id (PK)
├── invoice_id (FK)
├── item_id (FK)
├── quantity
├── unit_price
├── line_total
└── line_number
```

### Vendors
```
Vendors
├── id (PK)
├── vendor_number (UNIQUE)
├── name
├── email
├── phone
├── address
├── city
├── country
├── payment_terms
├── tenant_id (FK)
├── is_active
├── created_at
└── updated_at
```

## Relationships Summary

### One-to-Many
- Tenants → Users
- Tenants → Accounts
- Tenants → Items
- Tenants → Warehouses
- Tenants → Employees
- Tenants → Customers
- Tenants → Vendors
- Departments → Employees
- Warehouses → Stock
- Items → StockMovements
- Customers → SalesOrders
- SalesOrders → SalesOrderLines
- Customers → Invoices
- Invoices → InvoiceLines

### Many-to-Many
- Users ↔ Roles (through UserRoles)
- Employees ↔ LeaveTypes (through LeaveRequests)

### Self-Referencing
- Accounts → Accounts (parent_id)
- Departments → Departments (parent_id)

## Indexes

Key indexes for performance:

```sql
-- Users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_tenant_id ON users(tenant_id);

-- Accounts
CREATE INDEX idx_accounts_tenant_id ON accounts(tenant_id);
CREATE INDEX idx_accounts_number ON accounts(account_number);

-- Items
CREATE INDEX idx_items_tenant_id ON items(tenant_id);
CREATE INDEX idx_items_sku ON items(sku);

-- Stock
CREATE INDEX idx_stock_item_warehouse ON stock(item_id, warehouse_id);

-- Employees
CREATE INDEX idx_employees_tenant_id ON employees(tenant_id);
CREATE INDEX idx_employees_number ON employees(employee_number);

-- Customers
CREATE INDEX idx_customers_tenant_id ON customers(tenant_id);
CREATE INDEX idx_customers_number ON customers(customer_number);

-- Orders
CREATE INDEX idx_orders_customer_id ON sales_orders(customer_id);
CREATE INDEX idx_orders_status ON sales_orders(status);
```

## Data Integrity

### Constraints
- Foreign key constraints for referential integrity
- Unique constraints on business keys
- Check constraints for valid values
- Not null constraints on required fields

### Triggers
- Automatic timestamp updates
- Balance calculations
- Stock level updates
- Audit trail maintenance

## Related Documentation

- [STRUCTURE](./STRUCTURE.md) - Project structure
- [TECHNOLOGIES](./TECHNOLOGIES.md) - Technology stack
- [DEPLOYMENT](./DEPLOYMENT.md) - Deployment guide
