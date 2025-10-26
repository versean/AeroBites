
import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ChevronRight, Clock, Plane, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function OrderCard({ order }) {
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    confirmed: "bg-blue-100 text-blue-800 border-blue-200",
    preparing: "bg-purple-100 text-purple-800 border-purple-200",
    ready: "bg-green-100 text-green-800 border-green-200",
    in_transit: "bg-orange-100 text-orange-800 border-orange-200",
    delivered: "bg-green-100 text-green-800 border-green-200",
    cancelled: "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <Link to={`${createPageUrl("OrderDetail")}?order=${order.id}`}>
      <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Order #{order.order_number}</h3>
            <p className="text-sm text-gray-500">
              {format(new Date(order.created_date), "MMM d, h:mm a")}
            </p>
          </div>
          <Badge className={`${statusColors[order.status]} border`}>
            {order.status.replace('_', ' ').toUpperCase()}
          </Badge>
        </div>

        <div className="space-y-2 mb-4">
          {order.items?.slice(0, 2).map((item, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span className="text-gray-600">
                {item.quantity}x {item.menu_item_name}
              </span>
              <span className="text-gray-900 font-medium">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
          {order.items?.length > 2 && (
            <p className="text-sm text-gray-500">
              +{order.items.length - 2} more items
            </p>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              {order.delivery_method === "drone" ? (
                <>
                  <Plane className="w-4 h-4" />
                  <span>Drone</span>
                </>
              ) : (
                <>
                  <MapPin className="w-4 h-4" />
                  <span>Pickup</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{order.estimated_time}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              ${order.total_amount?.toFixed(2)}
            </span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>
    </Link>
  );
}
