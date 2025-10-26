import React from "react";
import { User, Mail, MapPin, Clock, Settings, LogOut } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

export default function ProfilePage() {
  const user = {
    name: "UCSC Student",
    email: "student@ucsc.edu",
    dorm: "Adams House",
    memberSince: "2023"
  };

  const stats = [
    { label: "Total Orders", value: "47" },
    { label: "Favorite Location", value: "Cowell/Stevenson" },
    { label: "Member Since", value: "Fall 2023" }
  ];

  return (
    <div className="min-h-screen pb-24">
      <div className="px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
          <p className="text-gray-500">{user.email}</p>
          <Badge className="bg-orange-100 text-orange-700 mt-2">
            UCSC Student
          </Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-4 shadow-md border border-gray-100 text-center">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Profile Info */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Profile Information</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Dorm</p>
                <p className="font-medium text-gray-900">{user.dorm}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="font-medium text-gray-900">{user.memberSince}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <Button className="w-full justify-start bg-white border border-gray-200 text-gray-900 hover:bg-gray-50">
            <Settings className="w-5 h-5 mr-3" />
            Account Settings
          </Button>
          <Button className="w-full justify-start bg-white border border-gray-200 text-gray-900 hover:bg-gray-50">
            <MapPin className="w-5 h-5 mr-3" />
            Delivery Addresses
          </Button>
          <Button className="w-full justify-start bg-white border border-gray-200 text-gray-900 hover:bg-gray-50">
            <Clock className="w-5 h-5 mr-3" />
            Order History
          </Button>
          <Button className="w-full justify-start bg-red-50 border border-red-200 text-red-600 hover:bg-red-100">
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}
