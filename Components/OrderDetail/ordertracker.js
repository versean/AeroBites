
import React from "react";
import { CheckCircle2, Clock, Package, Plane, MapPin } from "lucide-react";

export default function OrderTracker({ status, deliveryMethod }) {
  const steps = deliveryMethod === "drone" 
    ? [
        { key: "pending", label: "Order Placed", icon: Clock },
        { key: "confirmed", label: "Confirmed", icon: CheckCircle2 },
        { key: "preparing", label: "Preparing", icon: Package },
        { key: "in_transit", label: "On the Way", icon: Plane }, // Changed from Truck to Plane
        { key: "delivered", label: "Delivered", icon: MapPin },
      ]
    : [
        { key: "pending", label: "Order Placed", icon: Clock },
        { key: "confirmed", label: "Confirmed", icon: CheckCircle2 },
        { key: "preparing", label: "Preparing", icon: Package },
        { key: "ready", label: "Ready", icon: CheckCircle2 },
      ];

  const statusIndex = steps.findIndex(step => step.key === status);

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 mb-6 border border-gray-100">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Order Status</h2>
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-gray-200">
          <div
            className="bg-gradient-to-b from-orange-500 to-orange-600 transition-all duration-500"
            style={{
              height: `${(statusIndex / (steps.length - 1)) * 100}%`
            }}
          />
        </div>

        {/* Steps */}
        <div className="space-y-6 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index <= statusIndex;
            const isCurrent = index === statusIndex;

            return (
              <div key={step.key} className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 transition-all duration-300 ${
                  isCompleted
                    ? 'bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg scale-110'
                    : 'bg-gray-200'
                }`}>
                  <Icon className={`w-5 h-5 ${isCompleted ? 'text-white' : 'text-gray-400'}`} />
                </div>
                <div className="flex-1">
                  <p className={`font-semibold ${isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                    {step.label}
                  </p>
                  {isCurrent && (
                    <p className="text-sm text-orange-600 font-medium">In Progress...</p>
                  )}
                  {isCompleted && !isCurrent && (
                    <p className="text-sm text-green-600">Completed</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
