import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { MapPin, Clock, ChevronRight } from "lucide-react";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";

export default function LocationCard({ location }) {
  return (
    <Link to={`${createPageUrl("Menu")}?location=${location.id}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300"
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={location.image_url || "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800"}
            alt={location.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3">
            <Badge className={`${location.is_open ? 'bg-green-500' : 'bg-red-500'} border-0 text-white`}>
              {location.is_open ? 'Open' : 'Closed'}
            </Badge>
          </div>
          {location.supports_drone && (
            <div className="absolute bottom-3 left-3">
              <Badge className="bg-orange-500 border-0 text-white">
                🚁 Drone Delivery
              </Badge>
            </div>
          )}
        </div>
        <div className="p-5">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{location.name}</h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{location.description}</p>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin className="w-4 h-4" />
                <span>{location.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{location.hours}</span>
              </div>
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
