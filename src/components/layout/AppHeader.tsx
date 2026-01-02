import { useState } from 'react';
import { Bell, Search, Settings, LogOut, User, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { notifications } from '@/store/mockData';
import { cn } from '@/lib/utils';

interface AppHeaderProps {
  sidebarCollapsed: boolean;
}

export function AppHeader({ sidebarCollapsed }: AppHeaderProps) {
  const [searchFocused, setSearchFocused] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header 
      className={cn(
        'fixed top-0 right-0 z-30 flex h-16 items-center justify-between border-b bg-card px-6 transition-all duration-300',
        sidebarCollapsed ? 'left-[72px]' : 'left-[260px]'
      )}
    >
      {/* Search */}
      <div className="relative w-full max-w-md">
        <Search 
          className={cn(
            'absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors',
            searchFocused ? 'text-primary' : 'text-muted-foreground'
          )} 
        />
        <Input
          placeholder="Search modules, records, or actions..."
          className="h-10 pl-9 pr-4 bg-background border-border focus:ring-2 focus:ring-primary/20"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          ⌘K
        </kbd>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Help */}
        <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
          <HelpCircle className="h-5 w-5" />
        </Button>

        {/* Notifications */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 relative text-muted-foreground hover:text-foreground">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                  {unreadCount}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="border-b p-4">
              <h4 className="font-semibold">Notifications</h4>
              <p className="text-sm text-muted-foreground">{unreadCount} unread</p>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.slice(0, 5).map((notification) => (
                <div 
                  key={notification.id}
                  className={cn(
                    'flex gap-3 border-b p-4 hover:bg-muted/50 cursor-pointer transition-colors',
                    !notification.read && 'bg-primary/5'
                  )}
                >
                  <div 
                    className={cn(
                      'mt-1 h-2 w-2 rounded-full shrink-0',
                      notification.type === 'warning' && 'bg-warning',
                      notification.type === 'error' && 'bg-destructive',
                      notification.type === 'success' && 'bg-success',
                      notification.type === 'info' && 'bg-info'
                    )} 
                  />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{notification.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(notification.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t p-2">
              <Button variant="ghost" className="w-full text-sm">
                View all notifications
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-9 gap-2 px-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                JS
              </div>
              <span className="hidden sm:inline text-sm font-medium">John Smith</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span>John Smith</span>
                <span className="text-xs font-normal text-muted-foreground">
                  john.smith@acmecorp.com
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
