"use client";

import React, { FC, useState } from "react";
import { Disclosure, DisclosureButton } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { FlightData } from "@/types/flights";
import BookFlightModal from "./BookFlightModal";

type FlightCardProps = FlightData & {
  extraInfo?: React.ReactNode;
}
const FlightCard: FC<FlightCardProps> = (flightData) => {

const {
  Airline: airlineName,
  DepartureTime: departureTime,
  ArrivalTime: arrivalTime,
  DepartureCity: from,
  ArrivalCity: to,
  Duration: duration,
  Price: price,
  Stops: stops,
  Stopover: stopover,
  CabinClass: cabinClass,
  FlightType: flightType,
  extraInfo = (
    <div>
      <p>
        <strong>Baggage:</strong> 20kg checked, 7kg carry-on
      </p>
      <p className="mt-1">
        <strong>Meal:</strong> Not Included
      </p>
      <p className="mt-1">
        <strong>Stops:</strong> {stops} {stops > 1 ? "stops" : "stop"} {stopover ? `(${stopover})` : ""}
      </p>
      <p className="mt-1">
        <strong>Cabin Class:</strong> {cabinClass}
      </p>
      <p className="mt-1">
        <strong>Flight Type:</strong> {flightType}
      </p>
      <p className="mt-1"> - hange fees may apply</p>
      <p className="mt-1"> - Cancel / Refund fees apply</p>
    </div>
  ),
} = flightData;

  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleSelect = () => {
    console.log("Flight selected:", airlineName, from, to, departureTime, arrivalTime, price);
    setShowBookingModal(true)
  };

  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-md p-4 md:p-6 space-y-4"
    >
      {/* Flight Info */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex flex-1 items-center gap-3 min-w-[120px]">
          <div className="rounded-full bg-sky-300 w-10 h-10"></div>
          <div className="text-sm font-medium">{airlineName}</div>
        </div>

        <div className="flex flex-1 flex-col md:flex-row gap-3 justify-center items-center text-center md:text-left">
          <div>
            <div className="text-lg font-semibold text-gray-700">
              {departureTime}
            </div>
            <div className="text-sm text-gray-500">{from}</div>
          </div>
          <div className="px-4">
            <ArrowLongRightIcon className="h-5 w-12 text-gray-400 hidden md:block" />
            <div className="text-sm text-gray-500 text-center md:text-left">
              {duration} mins
            </div>
          </div>

          <div>
            <div className="text-lg font-semibold text-gray-700">
              {arrivalTime}
            </div>
            <div className="text-sm text-gray-500">{to}</div>
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center md:items-end">
          <div className="text-xl font-bold text-sky-600">{(price * 4500).toLocaleString()} MMK</div>
          <button onClick={handleSelect} className="mt-2 px-5 py-2 bg-sky-600 text-sky-100 rounded-xl hover:bg-sky-400 hover:text-sky-800 transition cursor-pointer">
            Book Flight
          </button>
        </div>
      </div>

      {/* Disclosure section */}
      <Disclosure>
        {({ open }) => (
          <div className="border-t pt-3">
            <DisclosureButton className="group flex w-full items-center justify-between px-2 py-2 text-sm font-medium text-sky-600 hover:text-sky-700 cursor-pointer">
              <span>Flight details</span>
              <ChevronDownIcon className="size-5 fill-sky-500 group-data-open:rotate-180 transition-transform duration-300" />
            </DisclosureButton>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  key="flight-details"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden px-2"
                >
                  <div className="py-2 text-sm text-gray-600">{extraInfo}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </Disclosure>
    </motion.div>
    <BookFlightModal isOpen={showBookingModal} onClose={() => setShowBookingModal(false)} flightData={flightData}/>
    </>
  );
};

export default FlightCard;
