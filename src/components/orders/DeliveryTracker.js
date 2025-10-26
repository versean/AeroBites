import React from "react";
import { MapPin, CheckCircle, Truck } from "lucide-react";

export default function DeliveryTracker({ order }) {
  const getStatusText = (status) => {
    switch (status) {
      case "confirmed":
        return "Order Confirmed";
      case "preparing":
        return "Preparing Your Order";
      case "ready":
        return "Ready for Pickup";
      case "in_transit":
        return "Out for Delivery";
      case "delivered":
        return "Delivered";
      default:
        return "Processing";
    }
  };

  const getProgressPercentage = (status) => {
    switch (status) {
      case "confirmed":
        return 20;
      case "preparing":
        return 40;
      case "ready":
        return 60;
      case "in_transit":
        return 80;
      case "delivered":
        return 100;
      default:
        return 0;
    }
  };

  const progress = getProgressPercentage(order.status);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <MapPin className="w-6 h-6 text-orange-500" />
        <h3 className="text-lg font-semibold text-gray-900">Delivery Tracking</h3>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Order Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Status Steps */}
      <div className="space-y-4">
        {[
          { status: "confirmed", label: "Order Confirmed" },
          { status: "preparing", label: "Preparing" },
          { status: "ready", label: "Ready" },
          { status: "in_transit", label: "In Transit" },
          { status: "delivered", label: "Delivered" }
        ].map((step, index) => {
          const isActive = step.status === order.status;
          const isCompleted = ["confirmed", "preparing", "ready", "in_transit", "delivered"].indexOf(step.status) <= 
                             ["confirmed", "preparing", "ready", "in_transit", "delivered"].indexOf(order.status);
          
          return (
            <div key={step.status} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isCompleted ? 'bg-orange-500' : 'bg-gray-200'
              }`}>
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5 text-white" />
                ) : (
                  <div className={`w-3 h-3 rounded-full ${
                    isActive ? 'bg-orange-500' : 'bg-gray-400'
                  }`}></div>
                )}
              </div>
              <div className="flex-1">
                <p className={`font-medium ${
                  isActive ? 'text-orange-600' : isCompleted ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {step.label}
                </p>
                {isActive && (
                  <p className="text-sm text-gray-500">
                    {getStatusText(order.status)}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Delivery Address */}
      <div className="mt-6 p-4 bg-gray-50 rounded-xl">
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
          <div>
            <p className="font-medium text-gray-900">Delivery Address</p>
            <p className="text-sm text-gray-600">
              {order.delivery_address || "Cowell College, Room 101"}
            </p>
          </div>
        </div>
      </div>

      {/* Estimated Delivery */}
      {order.status === "in_transit" && (
        <div className="mt-4 p-4 bg-blue-50 rounded-xl">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-blue-500" />
            <p className="text-sm font-medium text-blue-900">
              Estimated delivery: 15-20 minutes
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
