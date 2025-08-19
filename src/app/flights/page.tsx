"use client";

import FlightForm from "@/components/flights/FlightForm";
import FlightList from "@/components/flights/FlightList";
import { FlightData } from "@/types/flights";
import { useState } from "react";

export default function FlightPage() {
  const [flightList, setFlightList] = useState<FlightData[]>([{'Airline': 'Myanmar Airways International(MAI)', 'DepartureCity': 'Yangon', 'ArrivalCity': 'Bangkok', 'DepartureTime': '10:40:00', 'ArrivalTime': '11:35:00', 'Duration': 85, 'Stops': 0, 'Stopover': 'None', 'CabinClass': 'Economy', 'Price': 131.0, 'FlightType': 'Direct', 'Date': 'mon,tue,wed,thu,fri,sat,sun', 'StopoverInfo': 'Direct'}]);
  return (
    <main className="px-4 py-2">
      <FlightForm setFlightList={setFlightList} />
      <div className="p-6 max-w-4xl mx-auto mt-8">
        {flightList.length && <FlightList flights={flightList} />}
      </div>
    </main>
  );
}