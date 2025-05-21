"use client";

interface Props {
  selectedClass: string;
  onClassChange: (value: string) => void;
  travelClasses: string[];
}

export default function TravelClassSelector({
  selectedClass,
  onClassChange,
  travelClasses,
}: Props) {
  return (
    <div>
      <span className="block text-sm text-gray-600 mb-2">Travel Class</span>
      <div className="flex gap-3">
        {travelClasses.map((cls) => (
          <button
            key={cls}
            onClick={() => onClassChange(cls)}
            className={`px-4 py-2 w-full rounded-xl border transition cursor-pointer 
              ${
                selectedClass === cls
                  ? "bg-sky-600 text-white border-sky-600"
                  : "bg-white text-gray-700 border-gray-300 hover:border-sky-400"
              }`}
          >
            {cls}
          </button>
        ))}
      </div>
    </div>
  );
}
