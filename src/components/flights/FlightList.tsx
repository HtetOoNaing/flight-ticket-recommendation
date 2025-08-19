"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import FlightCard from "./FlightCard";
import { FlightData } from "@/types/flights";

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
      {flights.map((flight, index) => (
        <FlightCard key={index} {...flight} />
      ))}
    </motion.div>
  );
};

export default FlightList;
