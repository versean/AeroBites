import React from "react";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";

export default function MenuItemCard({ item, onAddToCart, isAvailable, currentMealPeriod }) {
  const isGreyedOut = !isAvailable;

  return (
    <motion.div
      whileHover={isAvailable ? { scale: 1.01 } : {}}
      className={`bg-white rounded-3xl shadow-md overflow-hidden border border-gray-100 transition-all ${
        isGreyedOut ? 'opacity-50 grayscale' : 'hover:shadow-xl'
      }`}
    >
      <div className="flex gap-4 p-4">
        <img
          src={item.image_url || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400"}
          alt={item.name}
          className="w-24 h-24 rounded-2xl object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-gray-900">{item.name}</h3>
            {isGreyedOut && (
              <Badge variant="secondary" className="bg-gray-200 text-gray-600 text-xs">
                Not Available
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-600 line-clamp-2 mb-2">{item.description}</p>
          <div className="flex items-center gap-2 flex-wrap mb-2">
            {item.dietary_info?.map(diet => (
              <Badge key={diet} variant="secondary" className="text-xs bg-green-100 text-green-700">
                {diet.replace('_', ' ')}
              </Badge>
            ))}
            {item.calories && (
              <Badge variant="secondary" className="text-xs">
                {item.calories} cal
              </Badge>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-orange-600">${item.price.toFixed(2)}</span>
            <Button
              onClick={() => onAddToCart(item)}
              size="sm"
              disabled={isGreyedOut}
              className={`rounded-full px-4 ${
                isGreyedOut 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
              }`}
            >
              <Plus className="w-4 h-4 mr-1" />
              {isGreyedOut ? 'Unavailable' : 'Add'}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}