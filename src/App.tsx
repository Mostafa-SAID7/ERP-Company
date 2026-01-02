import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import Login from "@/pages/auth/Login";
import Dashboard from "@/pages/Dashboard";
import ChartOfAccounts from "@/pages/finance/ChartOfAccounts";
import JournalEntries from "@/pages/finance/JournalEntries";
import InventoryItems from "@/pages/inventory/InventoryItems";
import Warehouses from "@/pages/inventory/Warehouses";
import Employees from "@/pages/hr/Employees";
import LeaveManagement from "@/pages/hr/LeaveManagement";
import Customers from "@/pages/sales/Customers";
import SalesOrders from "@/pages/sales/SalesOrders";
import UsersAndRoles from "@/pages/admin/UsersAndRoles";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<AppShell />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/finance/accounts" element={<ChartOfAccounts />} />
            <Route path="/finance/journal-entries" element={<JournalEntries />} />
            <Route path="/inventory/items" element={<InventoryItems />} />
            <Route path="/inventory/warehouses" element={<Warehouses />} />
            <Route path="/hr/employees" element={<Employees />} />
            <Route path="/hr/leave" element={<LeaveManagement />} />
            <Route path="/sales/customers" element={<Customers />} />
            <Route path="/sales/orders" element={<SalesOrders />} />
            <Route path="/admin/users" element={<UsersAndRoles />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
