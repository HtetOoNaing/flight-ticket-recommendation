"use client";

import { FC } from "react";
import { Disclosure, DisclosureButton } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

interface FlightCardProps {
  airlineLogo?: string;
  airlineName: string;
  departureTime: string;
  arrivalTime: string;
  from: string;
  to: string;
  duration: string;
  stops: string;
  price: string;
  extraInfo?: string;
}

const FlightCard: FC<FlightCardProps> = ({
  airlineLogo,
  airlineName,
  departureTime,
  arrivalTime,
  from,
  to,
  duration,
  price,
  extraInfo = "Baggage: 20kg checked, 7kg carry-on. Meal included. Aircraft: Airbus A320.",
}) => {
  const fallbackLogo = "/fallback-airline.png";

  return (
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
          {airlineLogo ? (
            <Image
              src={airlineLogo || fallbackLogo}
              alt={airlineName}
              width={40}
              height={40}
              className="object-contain"
            />
          ) : (
            <div className="rounded-full bg-red-500 w-10 h-10"></div>
          )}

          <div className="text-sm font-medium">{airlineName}</div>
        </div>

        <div className="flex flex-1 flex-col md:flex-row gap-3 justify-center items-center text-center md:text-left">
          <div>
            <div className="text-lg font-semibold text-gray-700">{departureTime}</div>
            <div className="text-sm text-gray-500">{from}</div>
          </div>
          <div className="px-4">
            <ArrowLongRightIcon className="h-5 w-12 text-gray-400 hidden md:block" />
            <div className="text-sm text-gray-500 text-center md:text-left">
              {duration}
            </div>
          </div>

          <div>
            <div className="text-lg font-semibold text-gray-700">{arrivalTime}</div>
            <div className="text-sm text-gray-500">{to}</div>
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center md:items-end">
          <div className="text-xl font-bold text-sky-600">{price}</div>
          <button className="mt-2 px-4 py-2 bg-sky-300 text-sky-600 rounded-xl hover:bg-sky-400 hover:text-sky-800 transition cursor-pointer">
            Select
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
  );
};

export default FlightCard;
