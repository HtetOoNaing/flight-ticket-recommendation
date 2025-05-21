"use client";

import { useState } from "react";
import FlightTabs from "./FlightTabs";
import LocationInput from "./LocationInput";
import DateSelector from "./DateSelector";
import TravelClassSelector from "./TravelClassSelector";
import { TripType, FlightSearchData } from "@/types/flights";
import Passengers from "./Passengers";

type FlightFormProps = {
  setShowFlightList: (param: boolean) => void;
};

export default function FlightForm({ setShowFlightList }: FlightFormProps) {
  const [tripType, setTripType] = useState<TripType>("one-way");

  const [form, setForm] = useState<FlightSearchData>({
    from: "",
    to: "",
    departureDate: "",
    returnDate: "",
    passengers: {
      adults: 1,
      children: 0,
      infants: 0,
    },
    travelClass: "Economy",
  });

  const travelClasses = ["Economy", "Business", "First"];
  const passengerTypes = [
    {
      label: "Adults (12yrs and above)",
      value: "adults",
    },
    {
      label: "Children (2-11yrs)",
      value: "children",
    },
    {
      label: "Infants (below 2yrs)",
      value: "infants",
    },
  ] as const;

  const handleChange = (
    key: keyof FlightSearchData,
    value: string | number
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handlePassengerChange = (
    type: keyof typeof form.passengers,
    value: number
  ) => {
    setForm((prev) => ({
      ...prev,
      passengers: { ...prev.passengers, [type]: Math.max(0, value) },
    }));
  };

  const handleClassChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      travelClass: value as FlightSearchData["travelClass"],
    }));
  };

  const handleSubmit = () => {
    console.log("Form Submitted:", form);
    // Submit to API or route here
    setShowFlightList(true);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-3xl mx-auto mt-10">
      <FlightTabs selected={tripType} onChange={setTripType} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <LocationInput
          label="Flying From"
          value={form.from}
          onChange={(v) => handleChange("from", v)}
        />
        <LocationInput
          label="Flying To"
          value={form.to}
          onChange={(v) => handleChange("to", v)}
        />

        <DateSelector
          label="Departure Date"
          value={form.departureDate}
          onChange={(v) => handleChange("departureDate", v)}
        />

        {tripType === "round-trip" && (
          <DateSelector
            label="Return Date"
            value={form.returnDate ?? ""}
            onChange={(v) => handleChange("returnDate", v)}
            disableBefore={form.departureDate}
          />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <Passengers
          passengers={form.passengers}
          passengerTypes={passengerTypes}
          onChange={handlePassengerChange}
        />
        <TravelClassSelector
          selectedClass={form.travelClass}
          onClassChange={handleClassChange}
          travelClasses={travelClasses}
        />
      </div>

      <div className="mt-8 -mb-12 flex justify-center">
        <button
          className="mx-auto w-full max-w-md bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3.5 rounded-md transition cursor-pointer"
          onClick={handleSubmit}
        >
          SEARCH FLIGHTS
        </button>
      </div>
    </div>
  );
}
