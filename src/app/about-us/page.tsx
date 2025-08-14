"use client";

import { FunnelIcon, UserIcon, ClockIcon, SparklesIcon } from "@heroicons/react/24/outline";

export default function AboutUsPage() {
  return (
    <main className="py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex justify-center mb-8">
          <SparklesIcon className="h-12 w-12 text-sky-500" />
        </div>
        <h1 className="text-4xl font-bold text-sky-800 mb-6">About FlySmart</h1>
        <p className="text-lg text-sky-700 font-medium mb-12">
          FlySmart is an <span className="font-bold text-sky-600">AI-powered flight recommendation system</span> designed to help you find the best flights tailored to your budget and preferences. Our smart algorithms analyze thousands of options in real-time, ensuring you always get the most relevant and up-to-date results.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
          <FunnelIcon className="h-10 w-10 text-sky-500 mb-4" />
          <h3 className="text-xl font-bold text-sky-800 mb-2">Smart Filters</h3>
          <p className="text-sky-600">
            Find flights based on price, duration, airlines, and more.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
          <UserIcon className="h-10 w-10 text-sky-500 mb-4" />
          <h3 className="text-xl font-bold text-sky-800 mb-2">Personalized</h3>
          <p className="text-sky-600">
            Recommendations based on your travel preferences.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
          <ClockIcon className="h-10 w-10 text-sky-500 mb-4" />
          <h3 className="text-xl font-bold text-sky-800 mb-2">Real-time Data</h3>
          <p className="text-sky-600">
            Always showing the latest prices and availability.
          </p>
        </div>
      </div>
    </main>
  );
}