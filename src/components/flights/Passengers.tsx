"use client";
import TravelerSelector from "./TravelerSelector";

interface Props {
  passengers: { adults: number; children: number; infants: number };
  passengerTypes: readonly { label: string; value: keyof Props["passengers"] }[];
  onChange: (type: keyof Props["passengers"], value: number) => void;
}

export default function Passengers({
  passengers,
  passengerTypes,
  onChange,
}: Props) {
  return (
    <div>
      <span className="block text-sm text-gray-600 mb-2">Passengers</span>
      <div className="pl-2 pr-6 space-y-1.5">
        {passengerTypes.map((passenger) => (
          <TravelerSelector
            key={passenger.label}
            label={passenger.label}
            count={passengers[passenger.value]}
            onChange={(count) => onChange(passenger.value, count)}
          />
        ))}
      </div>
    </div>
  );
}
