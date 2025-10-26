import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Search, MapPin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const DORMS = [
  // Cowell College
  { name: "Adams House", college: "Cowell" },
  { name: "Prescott House", college: "Cowell" },
  { name: "Parkman House", college: "Cowell" },
  { name: "Beard House", college: "Cowell" },
  { name: "Parrington House", college: "Cowell" },
  { name: "Turner House", college: "Cowell" },
  { name: "Morison House", college: "Cowell" },
  
  // Stevenson College
  { name: "Casa Primera", college: "Stevenson" },
  { name: "Casa Segunda", college: "Stevenson" },
  { name: "Casa Tercera", college: "Stevenson" },
  { name: "Casa Cuarta", college: "Stevenson" },
  { name: "Casa Quinta", college: "Stevenson" },
  { name: "Casa Sexta", college: "Stevenson" },
  { name: "Casa Séptima", college: "Stevenson" },
  { name: "Casa Octava", college: "Stevenson" },
  
  // Crown College
  { name: "Leonardo House", college: "Crown" },
  { name: "Maxwell House", college: "Crown" },
  { name: "Harvey House", college: "Crown" },
  { name: "Galen House", college: "Crown" },
  { name: "Galileo House", college: "Crown" },
  
  // Merrill College
  { name: "Rutherford House", college: "Merrill" },
  { name: "Descartes House", college: "Merrill" },
  { name: "Gauss House", college: "Merrill" },
  
  // Porter College
  { name: "Porter House A", college: "Porter" },
  { name: "Porter House B", college: "Porter" },
  
  // Kresge College
  { name: "Lorde-Studds House", college: "Kresge" },
  { name: "Kochiyama House", college: "Kresge" },
  { name: "Bulosan House", college: "Kresge" },
  { name: "Gandhi-Kahlo House", college: "Kresge" },
  { name: "Chávez-Menchú House", college: "Kresge" },
  { name: "DuBois House", college: "Kresge" },
  
  // Oakes College
  { name: "Casa Frida Kahlo", college: "Oakes" },
  { name: "El Hajj Malik & Betty Shabazz", college: "Oakes" },
  { name: "Harvey Milk House", college: "Oakes" },
  { name: "Liliuokalani-Minami", college: "Oakes" },
  { name: "Stephen Biko House", college: "Oakes" },
  { name: "Hong-Lim House", college: "Oakes" },
  
  // Rachel Carson College
  { name: "A-L (Rachel Carson)", college: "Rachel Carson" },
  { name: "B-L (Rachel Carson)", college: "Rachel Carson" },
  { name: "C-L (Rachel Carson)", college: "Rachel Carson" },
  { name: "D-L (Rachel Carson)", college: "Rachel Carson" },
  { name: "Garden A (Rachel Carson)", college: "Rachel Carson" },
  { name: "Garden B (Rachel Carson)", college: "Rachel Carson" },
  { name: "Garden C (Rachel Carson)", college: "Rachel Carson" },
  { name: "Garden D (Rachel Carson)", college: "Rachel Carson" },
  
  // College Nine
  { name: "Bayit Elie Wiesel", college: "College Nine" },
  
  // College Ten
  { name: "Hague House", college: "College Ten" },
  { name: "Gandhi House", college: "College Ten" },
  { name: "Geneva House", college: "College Ten" },
  
  // John R. Lewis College
  { name: "Ohlone House", college: "John R. Lewis" },
  { name: "Amnesty House", college: "John R. Lewis" },
  { name: "Angela Davis House", college: "John R. Lewis" },
];

export default function DormSelector({ value, onChange }) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredDorms = DORMS.filter(dorm =>
    dorm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dorm.college.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedDorms = filteredDorms.reduce((acc, dorm) => {
    if (!acc[dorm.college]) {
      acc[dorm.college] = [];
    }
    acc[dorm.college].push(dorm);
    return acc;
  }, {});

  return (
    <div className="space-y-3">
      <Label htmlFor="dorm" className="text-sm font-medium text-gray-700">
        Select Your Dorm
      </Label>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search dorms..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 rounded-xl"
        />
      </div>

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="rounded-xl">
          <SelectValue placeholder="Choose your dorm..." />
        </SelectTrigger>
        <SelectContent className="max-h-80">
          {Object.entries(groupedDorms).map(([college, dorms]) => (
            <div key={college}>
              <div className="px-2 py-2 text-xs font-semibold text-gray-500 bg-gray-50">
                {college}
              </div>
              {dorms.map((dorm) => (
                <SelectItem key={dorm.name} value={dorm.name}>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    {dorm.name}
                  </div>
                </SelectItem>
              ))}
            </div>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}