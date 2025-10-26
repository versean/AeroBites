import React, { useState, useEffect } from "react";
import { base44 } from "../api/base44Client";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Clock, CheckCircle2, Package } from "lucide-react";
import OrderCard from "../components/orders/OrderCard";

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("active");

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
  }, []);

  const activeOrders = orders.filter(order => 
    ["pending", "confirmed", "preparing", "ready", "in_transit"].includes(order.status)
  );

  const completedOrders = orders.filter(order => 
    ["delivered", "cancelled"].includes(order.status)
  );

  const displayOrders = activeTab === "active" ? activeOrders : completedOrders;

  return (
    <div className="min-h-screen">
      <div className="px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">My Orders</h1>

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