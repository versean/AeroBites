import React from "react";
import { Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

export default function CartItemCard({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className="flex items-center gap-4">
      <img
        src={item.image_url || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200"}
        alt={item.name}
        className="w-20 h-20 rounded-2xl object-cover"
      />
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-900">{item.name}</h4>
        <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
        <p className="text-sm font-semibold text-orange-600 mt-1">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onUpdateQuantity(item.id, -1)}
          className="w-8 h-8 rounded-full"
        >
          <Minus className="w-4 h-4" />
        </Button>
        <span className="font-semibold text-lg w-8 text-center">{item.quantity}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onUpdateQuantity(item.id, 1)}
          className="w-8 h-8 rounded-full"
        >
          <Plus className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(item.id)}
          className="w-8 h-8 rounded-full text-red-500 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}