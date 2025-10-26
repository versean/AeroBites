import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Save, LogOut, User } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

export default function AccountSettings() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "UCSC Student",
    email: "student@ucsc.edu",
    phone: "",
    deliveryAddress: {
      dorm: "",
      room: "",
      building: "",
      notes: ""
    }
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Load user data from localStorage
    const savedUser = localStorage.getItem('ucsc_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('ucsc_user', JSON.stringify(user));
    setIsEditing(false);
  };

  const handleSignOut = () => {
    localStorage.removeItem('ucsc_user');
    localStorage.removeItem('ucsc_cart');
    navigate('/');
  };

  const dormOptions = [
    // Cowell College
    "Adams House", "Prescott House", "Parkman House", "Beard House", "Parrington House", "Turner House", "Morison House",
    
    // Crown College
    "Maxwell House", "Harvey House", "Galen House", "Galileo House", "Rutherford House", "Descartes House", "Gauss House",
    
    // Stevenson College
    "Lorde-Studds House", "Kochiyama House", "Bulosan House", "Gandhi-Kahlo House", "Chávez-Menchú House", "DuBois House",
    
    // Porter College
    "Casa Primera", "Casa Segunda", "Casa Tercera", "Casa Cuarta", "Casa Quinta", "Casa Sexta", "Casa Séptima", "Casa Octava", "Leonardo House",
    
    // Kresge College
    "Casa Frida Kahlo", "El Hajj Malik & Betty Shabazz", "Harvey Milk House", "Liliuokalani-Minami", "Stephen Biko House", "Hong-Lim House", "Bayit Elie Wiesel",
    
    // Rachel Carson College
    "A-L (Rachel Carson)", "B-L (Rachel Carson)", "C-L (Rachel Carson)", "D-L (Rachel Carson)", 
    "Garden A (Rachel Carson)", "Garden B (Rachel Carson)", "Garden C (Rachel Carson)", "Garden D (Rachel Carson)",
    
    // John R. Lewis College
    "Ohlone House", "Amnesty House", "Angela Davis House",
    
    // Other Housing
    "Hague House", "Gandhi House", "Geneva House", "Porter House A", "Porter House B",
    
    // College Names (for general reference)
    "Cowell College", "Stevenson College", "Crown College", "Merrill College",
    "Porter College", "Kresge College", "Oakes College", "Rachel Carson College",
    "College Nine", "College Ten", "John R. Lewis College", "Graduate Student Housing", "University Apartments"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={user.name}
                  onChange={(e) => setUser({...user, name: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={user.email}
                  onChange={(e) => setUser({...user, email: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={user.phone}
                  onChange={(e) => setUser({...user, phone: e.target.value})}
                  disabled={!isEditing}
                  placeholder="(555) 123-4567"
                />
              </div>
            </CardContent>
          </Card>

          {/* Delivery Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Delivery Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="dorm">College/Dorm</Label>
                <Select 
                  value={user.deliveryAddress.dorm} 
                  onValueChange={(value) => setUser({
                    ...user, 
                    deliveryAddress: {...user.deliveryAddress, dorm: value}
                  })}
                  disabled={!isEditing}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your college/dorm" />
                  </SelectTrigger>
                  <SelectContent>
                    {dormOptions.map(dorm => (
                      <SelectItem key={dorm} value={dorm}>{dorm}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="building">Building Name</Label>
                <Input
                  id="building"
                  value={user.deliveryAddress.building}
                  onChange={(e) => setUser({
                    ...user, 
                    deliveryAddress: {...user.deliveryAddress, building: e.target.value}
                  })}
                  disabled={!isEditing}
                  placeholder="e.g., Building A, Main Hall"
                />
              </div>
              <div>
                <Label htmlFor="room">Room Number</Label>
                <Input
                  id="room"
                  value={user.deliveryAddress.room}
                  onChange={(e) => setUser({
                    ...user, 
                    deliveryAddress: {...user.deliveryAddress, room: e.target.value}
                  })}
                  disabled={!isEditing}
                  placeholder="e.g., 101, 2A"
                />
              </div>
              <div>
                <Label htmlFor="notes">Delivery Notes</Label>
                <Textarea
                  id="notes"
                  value={user.deliveryAddress.notes}
                  onChange={(e) => setUser({
                    ...user, 
                    deliveryAddress: {...user.deliveryAddress, notes: e.target.value}
                  })}
                  disabled={!isEditing}
                  placeholder="Any special delivery instructions..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} className="flex-1">
              Edit Information
            </Button>
          ) : (
            <div className="flex gap-4 flex-1">
              <Button onClick={handleSave} className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsEditing(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          )}
          
          <Button 
            variant="destructive" 
            onClick={handleSignOut}
            className="flex-1 sm:flex-none"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}
