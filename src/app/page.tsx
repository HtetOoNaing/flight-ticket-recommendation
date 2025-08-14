"use client";

import Link from "next/link";
import {
  MagnifyingGlassIcon,
  InformationCircleIcon,
  FunnelIcon,
  UserIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";


export default function Home() {
  return (
    <div className="relative text-center overflow-hidden bg-red-600 min-h-[85vh]">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/bg-flight.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-sky-50/80 backdrop-blur-sm z-10"></div>

      {/* Content */}
      <div className="relative z-20 py-16 px-6">
        <h1 className="text-4xl font-bold text-sky-800">
          Find Your Perfect Flight
        </h1>
        <p className="text-xl text-sky-700 font-semibold mb-8 max-w-2xl mx-auto mt-12">
          Our smart recommendation system finds the best flights tailored to your
          budget and preferences
        </p>

        <div className="flex justify-center gap-4 mt-12">
          <Link
            href="/flights"
            className="flex items-center gap-4 bg-sky-600 hover:bg-sky-700 text-white px-10 py-4 rounded-xl text-xl font-semibold shadow transition duration-150"
          >
            <MagnifyingGlassIcon className="h-6 w-6" />
            Search Flights
          </Link>
          <Link
            href="/about-us"
            className="flex items-center gap-4 border-2 border-sky-600 text-sky-600 hover:bg-sky-600/50 px-10 py-4 rounded-xl text-xl font-semibold shadow transition duration-150"
          >
            <InformationCircleIcon className="h-6 w-6" />
            Learn More
          </Link>
        </div>

        <div className="mt-18 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="bg-white/50 p-6 rounded-xl shadow-md flex flex-col items-center text-center">
            <FunnelIcon className="h-10 w-10 text-sky-500 mb-4" />
            <h3 className="text-xl font-bold text-sky-800 mb-2">Smart Filters</h3>
            <p className="text-sky-600">
              Find flights based on price, duration, airlines, and more
            </p>
          </div>
          <div className="bg-white/50 p-6 rounded-xl shadow-md flex flex-col items-center text-center">
            <UserIcon className="h-10 w-10 text-sky-500 mb-4" />
            <h3 className="text-xl font-bold text-sky-800 mb-2">Personalized</h3>
            <p className="text-sky-600">
              Recommendations based on your travel preferences
            </p>
          </div>
          <div className="bg-white/50 p-6 rounded-xl shadow-md flex flex-col items-center text-center">
            <ClockIcon className="h-10 w-10 text-sky-500 mb-4" />
            <h3 className="text-xl font-bold text-sky-800 mb-2">
              Real-time Data
            </h3>
            <p className="text-sky-600">
              Always showing the latest prices and availability real time
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}