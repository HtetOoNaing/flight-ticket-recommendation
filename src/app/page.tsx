"use client"

import FlightForm from "@/components/flights/FlightForm";
import FlightList from "@/components/flights/FlightList";
import { useState } from "react";

const mockFlights = [
  {
    id: "1",
    // airlineLogo: "/airlines/thai.png",
    airlineName: "Thai Airways",
    departureTime: "08:30",
    arrivalTime: "10:15",
    from: "CNX",
    to: "BKK",
    duration: "1h 45m",
    stops: "Non-stop",
    price: "$120",
  },
  {
    id: "2",
    airlineName: "Bangkok Airways",
    departureTime: "12:00",
    arrivalTime: "13:40",
    from: "CNX",
    to: "BKK",
    duration: "1h 40m",
    stops: "Non-stop",
    price: "$110",
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
