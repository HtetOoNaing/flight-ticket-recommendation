"use client";

import { useState } from "react";
import FlightTabs from "./FlightTabs";
import LocationInput from "./LocationInput";
import DateSelector from "./DateSelector";
import TravelClassSelector from "./TravelClassSelector";
import { TripType, FlightSearchData, FlightData } from "@/types/flights";
import Passengers from "./Passengers";
import Selector from "./Selector";
import api from "@/config/api";
import { toast } from "sonner";

type FlightFormProps = {
  setFlightList: (param: FlightData[]) => void;
};

export default function FlightForm({ setFlightList }: FlightFormProps) {
  const [tripType, setTripType] = useState<TripType>("one-way");
  const [arrivalCities, setArrivalCities] = useState<string[]>([]);

  const [form, setForm] = useState<FlightSearchData>({
    departure_city: "",
    arrival_city: "",
    flight_type: "",
    price_range: "",
    departure_date: "",
    return_date: "",
    passengers: {
      adults: 1,
      children: 0,
      infants: 0,
    },
    cabin_class: "Economy",
  });

  const travelClasses = ["Economy", "Business"];
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
      cabin_class: value as FlightSearchData["cabin_class"],
    }));
  };

  const handleSubmit = async () => {
    console.log("Form Submitted:", form);
    try {
      const res = await api.post("/search-flights", form);
      // Submit to API or route here
      const recommendations = res.data.recommendations || [];
      const returnRecommendations = res.data.return_recommendations || [];
      console.log("Flight recommendations:", recommendations);
      console.log("Flight returnRecommendations:", returnRecommendations);
      const allFlights = [...recommendations, ...returnRecommendations];
      setFlightList(allFlights);
    } catch (error) {
      console.error("Error submitting flight search:", error);
      toast.error("Failed to search flights. Please try again.");
    }
  };

  const handleDepartureCityChange = async (value: string) => {
    console.log("Departure city changed:", value);
    handleChange("departure_city", value)
    try {
      const res = await api.get(`/get_arrival_cities/${value}`);
      const locations = res.data || [];
      console.log("Fetched locations:", locations);
      setArrivalCities(locations);
      // Optionally update state or handle locations
    } catch (error) {
      console.error("Error fetching locations:", error);
      toast.error("Failed to fetch locations. Please try again.");
    }
  };

  return (
    <div className="bg-white/50 rounded-2xl shadow-lg p-6 w-full max-w-3xl mx-auto mt-10">
      <FlightTabs selected={tripType} onChange={setTripType} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <LocationInput
          label="Departure City"
          value={form.departure_city}
          onChange={(v) => handleDepartureCityChange(v)}
        />
        <LocationInput
          label="Arrival City"
          value={form.arrival_city}
          onChange={(v) => handleChange("arrival_city", v)}
          locations={arrivalCities.map((city) => ({ label: city, value: city }))}
        />

        <Selector
          label="Flight Type"
          value={form.flight_type}
          onChange={(v) => handleChange("flight_type", v)}
          options={[
            { label: "Direct", value: "direct" },
            { label: "Transit", value: "transit" },
          ]}
          icon={<svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.18 2.09a1 1 0 00-1.36 0l-1.8 1.6a1 1 0 00-.32.74v4.12L2.3 11.3a1 1 0 00.7 1.7h3.5l1.2 3.6a1 1 0 001.9 0l1.2-3.6h3.5a1 1 0 00.7-1.7l-4.4-2.75V4.43a1 1 0 00-.32-.74l-1.8-1.6z" />
            </svg>}
          placeholder="Select flight type"
        />

        <Selector
          label="Price Range"
          value={form.price_range}
          onChange={(v) => handleChange("price_range", v)}
          options={[
            { label: "Budget ($0-150)", value: "Budget ($0-150)" },
            { label: "Standard ($150-300)", value: "Standard ($150-300)" },
            { label: "Premium ($300+)", value: "Premium ($300+)" }
          ]}
          icon={<svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M17.707 9.293l-7-7A1 1 0 009 2H3a1 1 0 00-1 1v6a1 1 0 00.293.707l7 7a1 1 0 001.414 0l6-6a1 1 0 000-1.414zM6 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>}
          placeholder="Select Price Range"
        />

        <DateSelector
          label="Departure Date"
          value={form.departure_date}
          onChange={(v) => handleChange("departure_date", v)}
        />

        {tripType === "round-trip" && (
          <DateSelector
            label="Return Date"
            value={form.return_date ?? ""}
            onChange={(v) => handleChange("return_date", v)}
            disableBefore={form.departure_date}
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
          selectedClass={form.cabin_class}
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
