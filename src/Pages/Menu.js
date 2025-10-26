
import React, { useState, useEffect } from "react";
import { base44 } from "../api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Search, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "../utils";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import MenuItemCard from "../components/menu/MenuItemCard";
import CartButton from "../components/menu/CartButton";

export default function MenuPage() {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const locationId = urlParams.get('location');
  
  console.log('Location ID from URL:', locationId);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [cart, setCart] = useState([]);
  const [currentMealPeriod, setCurrentMealPeriod] = useState("all_day");

  // Get current meal period based on PST time
  useEffect(() => {
    const updateMealPeriod = () => {
      const now = new Date();
      const pstTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
      const hour = pstTime.getHours();
      
      if (hour >= 5 && hour < 11) { // Assuming breakfast is 5 AM to 10:59 AM
        setCurrentMealPeriod("breakfast");
      } else if (hour >= 11 && hour < 17) { // Assuming lunch is 11 AM to 4:59 PM
        setCurrentMealPeriod("lunch");
      } else if (hour >= 17 || hour < 5) { // Assuming dinner is 5 PM onwards or before 5 AM
        setCurrentMealPeriod("dinner");
      } else {
        setCurrentMealPeriod("all_day"); // Default or fall-back
      }
    };
    
    updateMealPeriod();
    const interval = setInterval(updateMealPeriod, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);

  const { data: location } = useQuery({
    queryKey: ['location', locationId],
    queryFn: async () => {
      const locations = await base44.entities.DiningLocation.list();
      return locations.find(loc => loc.id === locationId);
    },
    enabled: !!locationId,
  });

  const { data: menuItems, isLoading, error } = useQuery({
    queryKey: ['menu-items', locationId],
    queryFn: () => base44.entities.MenuItem.filter({ dining_location_id: locationId }),
    initialData: [],
    enabled: !!locationId,
  });

  console.log('Menu items data:', menuItems);
  console.log('Loading:', isLoading);
  console.log('Error:', error);
  console.log('Location ID:', locationId);
  console.log('Location data:', location);

  useEffect(() => {
    const savedCart = localStorage.getItem('ucsc_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const addToCart = (item) => {
    const newCart = [...cart];
    const existingItem = newCart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      newCart.push({
        ...item,
        quantity: 1,
        dining_location_name: location?.name,
        dining_location_id: locationId,
      });
    }
    
    setCart(newCart);
    localStorage.setItem('ucsc_cart', JSON.stringify(newCart));
  };

  const isItemAvailable = (item) => {
    // If meal_period is not defined, assume it's available all day
    if (!item.meal_period || item.meal_period.length === 0) return true; 

    // Check if "all_day" is specified or if the current meal period matches
    return item.meal_period.includes("all_day") || item.meal_period.includes(currentMealPeriod);
  };

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    return matchesSearch && matchesCategory && item.is_available && isItemAvailable(item);
  });

  const categories = ["all", "breakfast", "lunch", "dinner", "beverage", "snack", "dessert"];

  const getMealPeriodLabel = () => {
    const labels = {
      breakfast: "Breakfast",
      lunch: "Lunch",
      dinner: "Dinner",
      all_day: "All Day Menu"
    };
    return labels[currentMealPeriod] || "All Day Menu";
  };

  if (!location) return null;

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 py-4">
          <button
            onClick={() => navigate(createPageUrl("Home"))}
            className="flex items-center gap-2 text-gray-600 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>

          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{location.name}</h1>
              <p className="text-sm text-gray-500 mt-1">{location.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  {location.is_open ? 'Open Now' : 'Closed'}
                </Badge>
                <span className="text-sm text-gray-500">{location.hours}</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Clock className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium text-orange-600">
                  Now Serving: {getMealPeriodLabel()}
                </span>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-xl"
            />
          </div>

          {/* Category Tabs */}
          <div className="overflow-x-auto -mx-4 px-4">
            <Tabs value={categoryFilter} onValueChange={setCategoryFilter}>
              <TabsList className="w-full justify-start bg-transparent gap-2">
                {categories.map(category => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="rounded-full px-6 py-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-1 gap-4">
          {isLoading ? (
            Array(6).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-32 animate-pulse" />
            ))
          ) : (
            filteredItems.length === 0 ? (
                <p className="text-center text-gray-500 mt-8">No menu items available for this selection.</p>
            ) : (
                filteredItems.map((item) => (
                    <MenuItemCard
                        key={item.id}
                        item={item}
                        onAddToCart={addToCart}
                        isAvailable={isItemAvailable(item)}
                        currentMealPeriod={currentMealPeriod}
                    />
                ))
            )
          )}
        </div>
      </div>

      {/* Floating Cart Button */}
      {cart.length > 0 && <CartButton cart={cart} />}
    </div>
  );
}
