import React, { useState } from 'react';
import { cn } from '../../lib/utils';

const Tabs = ({ children, value, onValueChange, className, ...props }) => {
  const [activeTab, setActiveTab] = useState(value);

  const handleTabChange = (newValue) => {
    setActiveTab(newValue);
    onValueChange && onValueChange(newValue);
  };

  return (
    <div className={cn("w-full", className)} {...props}>
      {React.Children.map(children, child =>
        React.cloneElement(child, { 
          activeTab, 
          onTabChange: handleTabChange 
        })
      )}
    </div>
  );
};

const TabsList = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef(({ className, children, value, activeTab, onTabChange, ...props }, ref) => {
  const isActive = activeTab === value;

  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isActive && "bg-background text-foreground shadow-sm",
        className
      )}
      onClick={() => onTabChange && onTabChange(value)}
      {...props}
    >
      {children}
    </button>
  );
});
TabsTrigger.displayName = "TabsTrigger";

export { Tabs, TabsList, TabsTrigger };
