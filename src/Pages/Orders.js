import React, { useState, useEffect } from "react";
import { base44 } from "../api/base44Client";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Clock, CheckCircle2, Package, MapPin, Settings } from "lucide-react";
import OrderCard from "../components/orders/OrderCard";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Label } from "../components/ui/label";
import { useNavigate } from "react-router-dom";

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("active");
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentDeliveryAddress, setCurrentDeliveryAddress] = useState("");

  // UCSC Housing Options
  const dormOptions = [
    // Cowell College
    "Adams House", "Prescott House", "Parkman House", "Beard House", "Parrington House", "Turner House", "Morison House",
    
    // Crown College
    "Maxwell House", "Harvey House", "Galen House", "Galileo House", "Rutherford House", "Descartes House", "Gauss House",
    
    // Stevenson College
    "Lorde-Studds House", "Kochiyama House", "Bulosan House", "Gandhi-Kahlo House", "Chávez-Menchú House", "DuBois House",
    
    // Porter College
    "Casa Primera", "Casa Segunda", "Casa Tercera", "Casa Cuarta", "Casa Quinta", "Casa Sexta", "Casa Séptima", "Casa Octava", "Leonardo House",
    
    // Kresge College
    "Casa Frida Kahlo", "El Hajj Malik & Betty Shabazz", "Harvey Milk House", "Liliuokalani-Minami", "Stephen Biko House", "Hong-Lim House", "Bayit Elie Wiesel",
    
    // Rachel Carson College
    "A-L (Rachel Carson)", "B-L (Rachel Carson)", "C-L (Rachel Carson)", "D-L (Rachel Carson)", 
    "Garden A (Rachel Carson)", "Garden B (Rachel Carson)", "Garden C (Rachel Carson)", "Garden D (Rachel Carson)",
    
    // John R. Lewis College
    "Ohlone House", "Amnesty House", "Angela Davis House",
    
    // Other Housing
    "Hague House", "Gandhi House", "Geneva House", "Porter House A", "Porter House B",
    
    // College Names (for general reference)
    "Cowell College", "Stevenson College", "Crown College", "Merrill College",
    "Porter College", "Kresge College", "Oakes College", "Rachel Carson College",
    "College Nine", "College Ten", "John R. Lewis College", "Graduate Student Housing", "University Apartments"
  ];

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const user = await base44.auth.me();
        const orderData = await base44.entities.Order.filter({ user_email: user.email }, '-created_date');
        setOrders(orderData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading orders:', error);
        setIsLoading(false);
      }
    };
    loadOrders();

    // Load saved delivery address
    const savedUser = localStorage.getItem('ucsc_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      const savedAddress = localStorage.getItem(`delivery_address_${user.email}`);
      if (savedAddress) {
        const address = JSON.parse(savedAddress);
        setCurrentDeliveryAddress(address.dorm || '');
      }
    }
  }, []);

  const activeOrders = orders.filter(order => 
    ["pending", "confirmed", "preparing", "ready", "in_transit"].includes(order.status)
  );

  const completedOrders = orders.filter(order => 
    ["delivered", "cancelled"].includes(order.status)
  );

  const displayOrders = activeTab === "active" ? activeOrders : completedOrders;

  const handleDeliveryAddressChange = (value) => {
    setCurrentDeliveryAddress(value);
    // Save to localStorage
    const savedUser = localStorage.getItem('ucsc_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      const currentAddress = localStorage.getItem(`delivery_address_${user.email}`);
      const address = currentAddress ? JSON.parse(currentAddress) : {};
      address.dorm = value;
      localStorage.setItem(`delivery_address_${user.email}`, JSON.stringify(address));
    }
  };

  return (
    <div className="min-h-screen">
      <div className="px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">My Orders</h1>

        {/* Delivery Address Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Current Delivery Address</h2>
                <p className="text-sm text-gray-500">Update your delivery location for future orders</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/account-settings')}
              className="flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Manage
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="delivery-dorm">College/Dorm</Label>
              <Select 
                value={currentDeliveryAddress} 
                onValueChange={handleDeliveryAddressChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your college/dorm" />
                </SelectTrigger>
                <SelectContent>
                  {dormOptions.map(dorm => (
                    <SelectItem key={dorm} value={dorm}>{dorm}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <div className="text-sm text-gray-600">
                <p className="font-medium">Current Address:</p>
                <p className="text-gray-500">
                  {currentDeliveryAddress || "No address set"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="w-full bg-gray-100 p-1 rounded-2xl">
            <TabsTrigger 
              value="active" 
              className="flex-1 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <Clock className="w-4 h-4 mr-2" />
              Active ({activeOrders.length})
            </TabsTrigger>
            <TabsTrigger 
              value="history" 
              className="flex-1 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              History ({completedOrders.length})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Orders List */}
        <div className="space-y-4">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-3xl h-48 animate-pulse" />
            ))
          ) : displayOrders.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Package className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {activeTab === "active" ? "No active orders" : "No order history"}
              </h2>
              <p className="text-gray-500">
                {activeTab === "active" 
                  ? "Your active orders will appear here" 
                  : "Your past orders will appear here"}
              </p>
            </div>
          ) : (
            displayOrders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}