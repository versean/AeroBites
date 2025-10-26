
import React, { useState, useEffect } from "react";
import { base44 } from "../api/base44Client";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "../utils";
import { ArrowLeft, MapPin, Plane } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { format } from "date-fns";
import DeliveryTracker from "../components/orders/DeliveryTracker";

export default function OrderDetailPage() {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get('order');

  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOrder = async () => {
      if (!orderId) return;
      
      try {
        const orders = await base44.entities.Order.list();
        const foundOrder = orders.find(o => o.id === orderId);
        setOrder(foundOrder);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading order:', error);
        setIsLoading(false);
      }
    };
    loadOrder();
  }, [orderId]);

  if (isLoading || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" />
      </div>
    );
  }

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    preparing: "bg-purple-100 text-purple-800",
    ready: "bg-green-100 text-green-800",
    in_transit: "bg-orange-100 text-orange-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div className="min-h-screen pb-8">
      <div className="px-4 py-6">
        <button
          onClick={() => navigate(createPageUrl("Orders"))}
          className="flex items-center gap-2 text-gray-600 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Orders</span>
        </button>

        {/* Order Header */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl shadow-xl p-6 mb-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">Order #{order.order_number}</h1>
              <p className="text-orange-100 text-sm">
                Placed {format(new Date(order.created_date), "MMM d, h:mm a")}
              </p>
            </div>
            <Badge className={`${statusColors[order.status]} border-0 px-4 py-2 text-sm font-semibold`}>
              {order.status.replace('_', ' ').toUpperCase()}
            </Badge>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              {order.delivery_method === "drone" ? (
                <>
                  <Plane className="w-5 h-5" />
                  <span>Drone Delivery</span>
                </>
              ) : (
                <>
                  <MapPin className="w-5 h-5" />
                  <span>Pickup</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Delivery Tracker */}
        <DeliveryTracker order={order} />
      </div>
    </div>
  );
}
 