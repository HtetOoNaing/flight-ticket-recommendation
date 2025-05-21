"use client";

import FlightForm from "@/components/flights/FlightForm";
import FlightList from "@/components/flights/FlightList";
import { useState } from "react";

const mockFlights = [
  {
    id: "1",
    // airlineLogo: "/airlines/thai.png",
    airlineName: "MAI Myanmar",
    departureTime: "08:30",
    arrivalTime: "10:15",
    from: "RGN",
    to: "MDL",
    duration: "1h 45m",
    price: "120,000 MMK",
  },
  {
    id: "2",
    airlineName: "MNA",
    departureTime: "12:00",
    arrivalTime: "13:40",
    from: "RGN",
    to: "MDL",
    duration: "1h 40m",
    price: "110,000 MMK",
  },
  {
    id: "3",
    airlineName: "MAI Myanmar",
    departureTime: "11:00",
    arrivalTime: "12:40",
    from: "RGN",
    to: "MDL",
    duration: "1h 40m",
    price: "110,000 MMK",
  },
  {
    id: "4",
    airlineName: "Air Asia",
    departureTime: "11:00",
    arrivalTime: "12:40",
    from: "RGN",
    to: "MDL",
    duration: "1h 40m",
    price: "110,000 MMK",
  },
  {
    id: "5",
    airlineName: "Air Asia",
    departureTime: "15:00",
    arrivalTime: "16:40",
    from: "RGN",
    to: "MDL",
    duration: "1h 40m",
    price: "110,000 MMK",
  },
];

export default function HomePage() {
  const [showFlightList, setShowFlightList] = useState(false);
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-2">
      <FlightForm setShowFlightList={setShowFlightList} />
      <div className="p-6 max-w-4xl mx-auto mt-8">
        {showFlightList && <FlightList flights={mockFlights} />}
      </div>
    </main>
  );
}
