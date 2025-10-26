import React, { useState, useEffect } from "react";
import { MapPin, Navigation, Clock, Truck } from "lucide-react";

export default function DeliveryMap({ order, currentStatus }) {
  const [dronePosition, setDronePosition] = useState({ lat: 36.9914, lng: -122.0581 }); // UCSC coordinates
  // const [deliveryPosition] = useState({ lat: 36.9914, lng: -122.0581 }); // Same for demo
  const [distance, setDistance] = useState(0);
  const [eta, setEta] = useState(5);

  // Simulate drone movement
  useEffect(() => {
    if (currentStatus === "in_transit") {
      const interval = setInterval(() => {
        setDronePosition(prev => ({
          lat: prev.lat + (Math.random() - 0.5) * 0.001,
          lng: prev.lng + (Math.random() - 0.5) * 0.001
        }));
        
        // Calculate distance (simplified)
        const newDistance = Math.max(0, distance - Math.random() * 0.5);
        setDistance(newDistance);
        setEta(Math.max(1, Math.ceil(newDistance * 2)));
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [currentStatus, distance]);

  // Initialize distance based on status
  useEffect(() => {
    switch (currentStatus) {
      case "confirmed":
        setDistance(2.5);
        setEta(5);
        break;
      case "preparing":
        setDistance(2.0);
        setEta(4);
        break;
      case "ready":
        setDistance(1.5);
        setEta(3);
        break;
      case "in_transit":
        setDistance(1.0);
        setEta(2);
        break;
      case "delivered":
        setDistance(0);
        setEta(0);
        break;
      default:
        setDistance(2.5);
        setEta(5);
    }
  }, [currentStatus]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <Navigation className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Delivery Map</h3>
          <p className="text-sm text-gray-500">Real-time drone tracking</p>
        </div>
      </div>

      {/* Map Visualization */}
      <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-xl h-64 mb-4 overflow-hidden">
        {/* Campus Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-blue-200 opacity-30"></div>
        
        {/* UCSC Campus Points */}
        <div className="absolute top-4 left-4 w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
        <div className="absolute top-4 left-4 text-xs font-medium text-orange-700">UCSC Campus</div>
        
        {/* Delivery Location */}
        <div className="absolute bottom-4 right-4 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
          <MapPin className="w-3 h-3 text-white" />
        </div>
        <div className="absolute bottom-4 right-8 text-xs font-medium text-red-700">Delivery Point</div>
        
        {/* Drone Position */}
        {currentStatus === "in_transit" && (
          <div 
            className="absolute w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center animate-bounce"
            style={{
              top: `${20 + (dronePosition.lat - 36.9914) * 1000}px`,
              left: `${20 + (dronePosition.lng + 122.0581) * 1000}px`
            }}
          >
            <Truck className="w-4 h-4 text-white" />
          </div>
        )}
        
        {/* Route Line */}
        {currentStatus === "in_transit" && (
          <svg className="absolute inset-0 w-full h-full">
            <line
              x1="20"
              y1="20"
              x2={`${20 + (dronePosition.lng + 122.0581) * 1000}`}
              y2={`${20 + (dronePosition.lat - 36.9914) * 1000}`}
              stroke="#3B82F6"
              strokeWidth="2"
              strokeDasharray="5,5"
              className="animate-pulse"
            />
          </svg>
        )}
      </div>

      {/* Delivery Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Navigation className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-900">Distance</span>
          </div>
          <p className="text-lg font-bold text-gray-900">
            {distance.toFixed(1)} km
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-900">ETA</span>
          </div>
          <p className="text-lg font-bold text-gray-900">
            {eta} min
          </p>
        </div>
      </div>

      {/* Status Message */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          {currentStatus === "in_transit" && "🚁 Drone is en route to your location"}
          {currentStatus === "delivered" && "✅ Order has been delivered successfully!"}
          {currentStatus === "ready" && "📦 Your order is ready for pickup"}
          {currentStatus === "preparing" && "👨‍🍳 Your order is being prepared"}
          {currentStatus === "confirmed" && "📋 Order confirmed, preparing to dispatch drone"}
        </p>
      </div>

      {/* Delivery Address */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-gray-900">Delivery Address</p>
            <p className="text-sm text-gray-600">{order.delivery_address || "Cowell College, Room 101"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
