"use client";

import { Dialog } from "@headlessui/react";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Input from "@/components/ui/Input";
import api from "@/config/api";
import { FlightData } from "@/types/flights";
import { toast } from "sonner";

export default function BookFlightModal({
  isOpen,
  onClose,
  flightData,
}: {
  isOpen: boolean;
  onClose: () => void;
  flightData: FlightData;
}) {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const handleClickBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ customerName, customerEmail, customerPhone });
    try {
      const res = await api.post("/book-flight", {
        customerName,
        customerEmail,
        customerPhone,
        selectedFlightData: flightData,
      });
      console.log("Booking response:", res.data);
      onClose();
      toast.success("Booked the flight successfully!");
      setCustomerName("");
      setCustomerEmail("");
      setCustomerPhone("");
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Failed to book the flight. Please try again.");
      // Optionally show error to user
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          as="div"
          static
          open={isOpen}
          onClose={onClose}
          className="fixed inset-0 z-50"
        >
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-black/50"
          />

          {/* Modal container */}
          <div
            className="fixed inset-0 flex items-center justify-center p-4"
            onClick={handleClickBackdrop}
          >
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.97, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full max-w-md"
            >
              <motion.div
                layout
                transition={{ layout: { duration: 0.4, ease: "easeInOut" } }}
                className="bg-white rounded-xl shadow-xl p-6 relative overflow-hidden"
              >
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>

                <h2 className="text-xl font-semibold mb-4 text-center">
                  Book The Flight
                </h2>

                <div className="relative min-h-[100px]">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      Flight: {flightData.Airline} - {flightData.DepartureCity} to{" "}
                      {flightData.ArrivalCity}
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      Price: {(flightData.Price * 4500).toLocaleString()} MMK
                    </p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-2">
                    <Input
                      label="Name"
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                      placeholder="Your Name"
                    />
                    <Input
                      label="Email"
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      required
                      placeholder="Your Email"
                    />
                    <Input
                      label="Phone"
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      required
                      placeholder="Your Phone"
                    />
                    <button
                      type="submit"
                      className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 rounded-md cursor-pointer transition"
                    >
                      Book Flight
                    </button>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
