"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import FlightCard from "./FlightCard";

interface FlightData {
  id: string;
  airlineLogo?: string;
  airlineName: string;
  departureTime: string;
  arrivalTime: string;
  from: string;
  to: string;
  duration: string;
  price: string;
}

interface FlightListProps {
  flights: FlightData[];
}

const FlightList: FC<FlightListProps> = ({ flights }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      className="space-y-6"
    >
      {flights.map((flight) => (
        <FlightCard key={flight.id} {...flight} />
      ))}
    </motion.div>
  );
};

export default FlightList;
