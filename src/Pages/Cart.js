
import React, { useState, useEffect } from "react";
import { base44 } from "../api/base44Client";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "../utils";
import { ArrowLeft, Plane, MapPin } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Textarea } from "../components/ui/textarea";
import CartItemCard from "../components/cart/CartItemCard";
import DormSelector from "../components/cart/DormSelector";

export default function CartPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [deliveryMethod, setDeliveryMethod] = useState("drone");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('ucsc_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const updateQuantity = (itemId, delta) => {
    const newCart = cart.map(item => {
      if (item.id === itemId) {
        const newQuantity = Math.max(0, item.quantity + delta);
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
      }
      return item;
    }).filter(Boolean);
    
    setCart(newCart);
    localStorage.setItem('ucsc_cart', JSON.stringify(newCart));
  };

  const removeItem = (itemId) => {
    const newCart = cart.filter(item => item.id !== itemId);
    setCart(newCart);
    localStorage.setItem('ucsc_cart', JSON.stringify(newCart));
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const placeOrder = async () => {
    setIsPlacingOrder(true);
    try {
      const user = await base44.auth.me();
      const orderNumber = `UCSC${Date.now().toString().slice(-8)}`;
      
      const orderData = {
        order_number: orderNumber,
        user_email: user.email,
        delivery_method: deliveryMethod,
        delivery_address: deliveryMethod === "drone" ? deliveryAddress : null,
        pickup_location: deliveryMethod === "pickup" ? pickupLocation : null,
        status: "pending",
        items: cart.map(item => ({
          menu_item_id: item.id,
          menu_item_name: item.name,
          dining_location_name: item.dining_location_name,
          quantity: item.quantity,
          price: item.price,
        })),
        total_amount: calculateTotal(),
        estimated_time: deliveryMethod === "drone" ? "15-20 minutes" : "10-15 minutes",
        placed_at: new Date().toISOString(),
        notes: notes,
      };

      await base44.entities.Order.create(orderData);
      
      localStorage.removeItem('ucsc_cart');
      setCart([]);
      
      navigate(createPageUrl("Orders"));
    } catch (error) {
      console.error("Error placing order:", error);
    }
    setIsPlacingOrder(false);
  };

  const groupedByLocation = cart.reduce((acc, item) => {
    const location = item.dining_location_name || 'Unknown';
    if (!acc[location]) {
      acc[location] = [];
    }
    acc[location].push(item);
    return acc;
  }, {});

  return (
    <div className="min-h-screen pb-32">
      <div className="px-4 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-5xl">🛒</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Start adding some delicious food!</p>
            <Button
              onClick={() => navigate(createPageUrl("Home"))}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Browse Dining Halls
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items by Location */}
            <div className="space-y-6 mb-8">
              {Object.entries(groupedByLocation).map(([location, items]) => (
                <div key={location} className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3">
                    <h3 className="font-semibold text-white">{location}</h3>
                  </div>
                  <div className="p-4 space-y-4">
                    {items.map(item => (
                      <CartItemCard
                        key={item.id}
                        item={item}
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeItem}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery Method */}
            <div className="bg-white rounded-3xl shadow-lg p-6 mb-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Delivery Method</h3>
              <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod}>
                <div className="space-y-3">
                  <div className={`flex items-center space-x-3 p-4 rounded-2xl border-2 transition-all ${
                    deliveryMethod === "drone" 
                      ? "border-orange-500 bg-orange-50" 
                      : "border-gray-200"
                  }`}>
                    <RadioGroupItem value="drone" id="drone" />
                    <Label htmlFor="drone" className="flex items-center gap-3 cursor-pointer flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center">
                        <Plane className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">Drone Delivery</p>
                        <p className="text-sm text-gray-500">5 minutes • $2.99 fee</p>
                      </div>
                    </Label>
                  </div>

                  <div className={`flex items-center space-x-3 p-4 rounded-2xl border-2 transition-all ${
                    deliveryMethod === "pickup" 
                      ? "border-green-500 bg-green-50" 
                      : "border-gray-200"
                  }`}>
                    <RadioGroupItem value="pickup" id="pickup" />
                    <Label htmlFor="pickup" className="flex items-center gap-3 cursor-pointer flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">Pickup</p>
                        <p className="text-sm text-gray-500">10-15 minutes • Free</p>
                      </div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>

              {deliveryMethod === "drone" && (
                <div className="mt-4">
                  <DormSelector
                    value={deliveryAddress}
                    onChange={setDeliveryAddress}
                  />
                </div>
              )}

              {deliveryMethod === "pickup" && (
                <div className="mt-4">
                  <Label htmlFor="pickup" className="text-sm font-medium text-gray-700 mb-2 block">
                    Pickup Location
                  </Label>
                  <Input
                    id="pickup"
                    type="text"
                    placeholder="Will be set to the dining location..."
                    value={pickupLocation || groupedByLocation[Object.keys(groupedByLocation)[0]]?.[0]?.dining_location_name || ''}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="rounded-xl"
                  />
                </div>
              )}

              <div className="mt-4">
                <Label htmlFor="notes" className="text-sm font-medium text-gray-700 mb-2 block">
                  Special Instructions (Optional)
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Any special requests or dietary restrictions..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="rounded-xl"
                  rows={3}
                />
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl shadow-xl p-6 mb-6 text-white">
              <h3 className="text-xl font-bold mb-4">Order Summary</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-semibold">
                    {deliveryMethod === "drone" ? "$2.99" : "Free"}
                  </span>
                </div>
                <div className="border-t border-orange-400 pt-2 mt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>
                      ${(calculateTotal() + (deliveryMethod === "drone" ? 2.99 : 0)).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Place Order Button */}
            <Button
              onClick={placeOrder}
              disabled={isPlacingOrder || (deliveryMethod === "drone" && !deliveryAddress) || (deliveryMethod === "pickup" && !pickupLocation)}
              className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-2xl shadow-xl"
            >
              {isPlacingOrder ? "Placing Order..." : "Place Order"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
