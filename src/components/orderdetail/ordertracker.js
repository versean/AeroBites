import React from "react";
import { CheckCircle2, Clock, Package, Truck, MapPin } from "lucide-react";
import { getOrderStatusColor, getOrderStatusText } from "../../utils";

const statusSteps = [
  { key: 'pending', icon: Clock, label: 'Order Placed' },
  { key: 'confirmed', icon: CheckCircle2, label: 'Confirmed' },
  { key: 'preparing', icon: Package, label: 'Preparing' },
  { key: 'ready', icon: CheckCircle2, label: 'Ready' },
  { key: 'in_transit', icon: Truck, label: 'In Transit' },
  { key: 'delivered', icon: MapPin, label: 'Delivered' }
];

export default function OrderTracker({ order }) {
  const currentStepIndex = statusSteps.findIndex(step => step.key === order.status);
  
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Order Status</h3>
      
      <div className="space-y-4">
        {statusSteps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const isUpcoming = index > currentStepIndex;
          
          const Icon = step.icon;
          
          return (
            <div key={step.key} className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isCompleted 
                  ? 'bg-green-500 text-white' 
                  : isCurrent 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-200 text-gray-400'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              
              <div className="flex-1">
                <p className={`font-medium ${
                  isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-400'
                }`}>
                  {step.label}
                </p>
                {isCurrent && (
                  <p className="text-sm text-orange-600 mt-1">
                    {order.status === 'preparing' && 'Your order is being prepared'}
                    {order.status === 'ready' && 'Your order is ready for pickup'}
                    {order.status === 'in_transit' && 'Your order is on the way'}
                  </p>
                )}
              </div>
              
              {index < statusSteps.length - 1 && (
                <div className={`w-px h-8 ml-5 ${
                  isCompleted ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 p-4 bg-orange-50 rounded-2xl">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-5 h-5 text-orange-600" />
          <span className="font-semibold text-orange-800">Estimated Time</span>
        </div>
        <p className="text-orange-700">{order.estimated_time}</p>
      </div>
    </div>
  );
}
