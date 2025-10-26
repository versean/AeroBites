import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "./utils";
import { Home, ShoppingCart, Clock, User } from "lucide-react";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  
  const navItems = [
    { name: "Browse", path: createPageUrl("Home"), icon: Home },
    { name: "Cart", path: createPageUrl("Cart"), icon: ShoppingCart },
    { name: "Orders", path: createPageUrl("Orders"), icon: Clock },
    { name: "Profile", path: createPageUrl("Profile"), icon: User },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-green-50 pb-20">
      <style>
        {`
          :root {
            --primary: #F97316;
            --primary-dark: #EA580C;
            --secondary: #10B981;
            --accent: #FDE047;
            --bg-light: #FFF7ED;
          }
        `}
      </style>
      
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-orange-100 shadow-sm">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-bold">🍽️</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">UCSC Eats</h1>
                <p className="text-xs text-orange-600">Campus Food Delivery</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-around py-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className="flex flex-col items-center gap-1 min-w-[60px]"
                >
                  <div className={`p-2 rounded-2xl transition-all duration-300 ${
                    active 
                      ? 'bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg scale-110' 
                      : 'bg-transparent'
                  }`}>
                    <Icon className={`w-6 h-6 ${active ? 'text-white' : 'text-gray-400'}`} />
                  </div>
                  <span className={`text-xs font-medium ${
                    active ? 'text-orange-600' : 'text-gray-500'
                  }`}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}