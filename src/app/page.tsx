"use client";

// import FlightForm from "@/components/flights/FlightForm";
// import FlightList from "@/components/flights/FlightList";
// import { useState } from "react";

// const mockFlights = [
//   {
//     id: "1",
//     // airlineLogo: "/airlines/thai.png",
//     airlineName: "MAI Myanmar",
//     departureTime: "08:30",
//     arrivalTime: "10:15",
//     from: "RGN",
//     to: "MDL",
//     duration: "1h 45m",
//     price: "120,000 MMK",
//   },
//   {
//     id: "2",
//     airlineName: "MNA",
//     departureTime: "12:00",
//     arrivalTime: "13:40",
//     from: "RGN",
//     to: "MDL",
//     duration: "1h 40m",
//     price: "110,000 MMK",
//   },
//   {
//     id: "3",
//     airlineName: "MAI Myanmar",
//     departureTime: "11:00",
//     arrivalTime: "12:40",
//     from: "RGN",
//     to: "MDL",
//     duration: "1h 40m",
//     price: "110,000 MMK",
//   },
//   {
//     id: "4",
//     airlineName: "Air Asia",
//     departureTime: "11:00",
//     arrivalTime: "12:40",
//     from: "RGN",
//     to: "MDL",
//     duration: "1h 40m",
//     price: "110,000 MMK",
//   },
//   {
//     id: "5",
//     airlineName: "Air Asia",
//     departureTime: "15:00",
//     arrivalTime: "16:40",
//     from: "RGN",
//     to: "MDL",
//     duration: "1h 40m",
//     price: "110,000 MMK",
//   },
// ];

// export default function HomePage() {
//   const [showFlightList, setShowFlightList] = useState(false);
//   return (
//     <main className="min-h-screen bg-gray-50 px-4 py-2">
//       <FlightForm setShowFlightList={setShowFlightList} />
//       <div className="p-6 max-w-4xl mx-auto mt-8">
//         {showFlightList && <FlightList flights={mockFlights} />}
//       </div>
//     </main>
//   );
// }

import Link from 'next/link';

export default function Home() {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold text-blue-800 mb-6">
        Find Your Perfect Flight
      </h1>
      <p className="text-xl text-blue-600 mb-8 max-w-2xl mx-auto">
        Our smart recommendation system finds the best flights tailored to your budget and preferences
      </p>
      <div className="flex justify-center gap-4">
        <Link 
          href="/flights" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition"
        >
          Search Flights
        </Link>
        <Link 
          href="/about" 
          className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg text-lg font-semibold transition"
        >
          Learn More
        </Link>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-bold text-blue-800 mb-3">Smart Filters</h3>
          <p className="text-blue-600">Find flights based on price, duration, airlines, and more</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-bold text-blue-800 mb-3">Personalized</h3>
          <p className="text-blue-600">Recommendations based on your travel preferences</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-bold text-blue-800 mb-3">Real-time Data</h3>
          <p className="text-blue-600">Always showing the latest prices and availability</p>
        </div>
      </div>
    </div>
  );
}