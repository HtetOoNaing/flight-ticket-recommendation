"use client";

import { motion } from "framer-motion";
import { TripType } from "@/types/flights";

interface Props {
  selected: TripType;
  onChange: (value: TripType) => void;
}

export default function FlightTabs({ selected, onChange }: Props) {
  const tabs: TripType[] = ["one-way", "round-trip"];

  return (
    <div className="flex bg-gray-100 p-1 rounded-full w-fit mx-auto">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`relative px-4 py-2 text-sm font-medium rounded-full z-10 cursor-pointer ${
            selected === tab ? "text-white" : "text-gray-600"
          }`}
        >
          {selected === tab && (
            <motion.div
              layoutId="pill"
              className="absolute inset-0 bg-sky-600 rounded-full z-0"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10 capitalize">
            {tab.replace("-", " ")}
          </span>
        </button>
      ))}
    </div>
  );
}
