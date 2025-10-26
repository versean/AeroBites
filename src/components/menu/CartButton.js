import React from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";

export default function CartButton({ cart }) {
  const navigate = useNavigate();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-20 left-4 right-4 z-40"
    >
      <Button
        onClick={() => navigate(createPageUrl("Cart"))}
        className="w-full py-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-2xl shadow-2xl"
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <div className="relative">
              <ShoppingCart className="w-6 h-6" />
              <Badge className="absolute -top-2 -right-2 bg-white text-orange-600 w-5 h-5 flex items-center justify-center p-0 text-xs">
                {itemCount}
              </Badge>
            </div>
            <span className="font-semibold">View Cart</span>
          </div>
          <span className="text-lg font-bold">${total.toFixed(2)}</span>
        </div>
      </Button>
    </motion.div>
  );
}