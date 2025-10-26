import React, { useState, useEffect } from "react";
import { MapPin, Clock, CheckCircle, Truck, Home, Package } from "lucide-react";

export default function SimpleOrderTracker({ order }) {
  const [currentStatus, setCurrentStatus] = useState(order.status);
  const [progress, setProgress] = useState(0);

  // Simulate order progression
  useEffect(() => {
    const statuses = ["confirmed", "preparing", "ready", "in_transit", "delivered"];
    const currentIndex = statuses.indexOf(currentStatus);
    
    if (currentIndex < statuses.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStatus(statuses[currentIndex + 1]);
        setProgress(((currentIndex + 1) / (statuses.length - 1)) * 100);
      }, 3000); // Update every 3 seconds for demo
      
      return () => clearTimeout(timer);
    }
  }, [currentStatus]);

  const getStatusInfo = (status) => {
    switch (status) {
      case "confirmed":
        return { icon: CheckCircle, text: "Order Confirmed", color: "text-green-500", bg: "bg-green-100" };
      case "preparing":
        return { icon: Package, text: "Preparing Your Order", color: "text-orange-500", bg: "bg-orange-100" };
      case "ready":
        return { icon: Clock, text: "Ready for Pickup", color: "text-blue-500", bg: "bg-blue-100" };
      case "in_transit":
        return { icon: Truck, text: "Out for Delivery", color: "text-purple-500", bg: "bg-purple-100" };
      case "delivered":
        return { icon: Home, text: "Delivered", color: "text-green-600", bg: "bg-green-100" };
      default:
        return { icon: Clock, text: "Processing", color: "text-gray-500", bg: "bg-gray-100" };
    }
  };

  const statusInfo = getStatusInfo(currentStatus);
  const Icon = statusInfo.icon;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-full ${statusInfo.bg} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${statusInfo.color}`} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Order Tracking</h3>
          <p className="text-sm text-gray-500">Order #{order.order_number}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full transition-all duration-1000"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Current Status */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-4 mb-4">
        <div className="flex items-center gap-3">
          <Icon className={`w-6 h-6 ${statusInfo.color}`} />
          <div>
            <p className="font-semibold text-gray-900">{statusInfo.text}</p>
            <p className="text-sm text-gray-600">
              {currentStatus === "in_transit" && "Your order is on the way!"}
              {currentStatus === "delivered" && "Order has been delivered successfully!"}
              {currentStatus === "preparing" && "Our kitchen is preparing your delicious meal..."}
              {currentStatus === "ready" && "Your order is ready for pickup!"}
              {currentStatus === "confirmed" && "We've received your order and confirmed payment."}
            </p>
          </div>
        </div>
      </div>

      {/* Delivery Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <MapPin className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-sm font-medium text-gray-900">Delivery Address</p>
            <p className="text-sm text-gray-600">{order.delivery_address || "Cowell College, Room 101"}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <Clock className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-sm font-medium text-gray-900">Estimated Time</p>
            <p className="text-sm text-gray-600">
              {currentStatus === "delivered" ? "Delivered" : "15-20 minutes"}
            </p>
          </div>
        </div>
      </div>

      {/* Status Timeline */}
      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Order Timeline</h4>
        <div className="space-y-2">
          {["confirmed", "preparing", "ready", "in_transit", "delivered"].map((status, index) => {
            const isCompleted = ["confirmed", "preparing", "ready", "in_transit", "delivered"].indexOf(status) <= 
                               ["confirmed", "preparing", "ready", "in_transit", "delivered"].indexOf(currentStatus);
            const isCurrent = status === currentStatus;
            
            return (
              <div key={status} className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  isCompleted ? 'bg-orange-500' : 'bg-gray-200'
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="w-4 h-4 text-white" />
                  ) : (
                    <div className={`w-2 h-2 rounded-full ${
                      isCurrent ? 'bg-orange-500' : 'bg-gray-400'
                    }`}></div>
                  )}
                </div>
                <span className={`text-sm ${
                  isCurrent ? 'text-orange-600 font-medium' : 
                  isCompleted ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {getStatusInfo(status).text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
