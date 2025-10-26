import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl, formatCurrency, formatDate, formatTime, getOrderStatusColor, getOrderStatusText } from "../../utils";
import { Clock, MapPin, Package, ChevronRight } from "lucide-react";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";

export default function OrderCard({ order }) {
  const isActive = ["pending", "confirmed", "preparing", "ready", "in_transit"].includes(order.status);
  
  return (
    <Link to={`${createPageUrl("OrderDetail")}?id=${order.id}`}>
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
      >
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Order #{order.order_number}</h3>
              <p className="text-sm text-gray-500">{formatDate(order.placed_at)} at {formatTime(order.placed_at)}</p>
            </div>
            <Badge className={getOrderStatusColor(order.status)}>
              {getOrderStatusText(order.status)}
            </Badge>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Package className="w-4 h-4" />
              <span>{order.items.length} item{order.items.length !== 1 ? 's' : ''}</span>
            </div>
            
            {order.delivery_method === "drone" && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>Drone delivery to {order.delivery_address}</span>
              </div>
            )}
            
            {order.delivery_method === "pickup" && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>Pickup from {order.pickup_location}</span>
              </div>
            )}

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Est. {order.estimated_time}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-right">
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-xl font-bold text-orange-600">{formatCurrency(order.total_amount)}</p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <ChevronRight className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
