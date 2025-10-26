import React, { useState } from "react";
import { base44 } from "../api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Search, MapPin, Clock, Zap, Filter } from "lucide-react";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import LocationCard from "../components/home/LocationCard";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  const { data: locations, isLoading, error } = useQuery({
    queryKey: ['dining-locations'],
    queryFn: () => base44.entities.DiningLocation.list(),
    initialData: [],
  });

  console.log('Locations data:', locations);
  console.log('Is loading:', isLoading);
  console.log('Error:', error);

  const filteredLocations = locations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || location.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 px-4 py-8 mb-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-2">
            Hungry, Slugs? 🐌
          </h2>
          <p className="text-orange-100 mb-6">
            Order from any dining hall • Drone delivery or pickup
          </p>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for dining halls or food..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 text-lg rounded-2xl border-none shadow-xl bg-white"
            />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-3 gap-3 max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl p-4 shadow-md border border-orange-100">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-orange-500" />
              <span className="text-xs text-gray-500 font-medium">Fast</span>
            </div>
            <p className="text-lg font-bold text-gray-900">15-25 min</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-md border border-green-100">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-4 h-4 text-green-500" />
              <span className="text-xs text-gray-500 font-medium">Locations</span>
            </div>
            <p className="text-lg font-bold text-gray-900">{locations.length}+</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-md border border-blue-100">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-blue-500" />
              <span className="text-xs text-gray-500 font-medium">Open</span>
            </div>
            <p className="text-lg font-bold text-gray-900">Now</p>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="px-4 mb-6">
        <div className="flex items-center gap-3 max-w-7xl mx-auto">
          <Filter className="w-5 h-5 text-gray-400" />
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-40 rounded-xl border-gray-200">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="dining_hall">Dining Halls</SelectItem>
              <SelectItem value="cafe">Cafés</SelectItem>
              <SelectItem value="restaurant">Restaurants</SelectItem>
              <SelectItem value="market">Markets</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Locations Grid */}
      <div className="px-4 pb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 max-w-7xl mx-auto">
          All Dining Locations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
          {isLoading ? (
            Array(6).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-3xl h-64 animate-pulse" />
            ))
          ) : filteredLocations.length > 0 ? (
            filteredLocations.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No dining locations found. Check console for errors.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}