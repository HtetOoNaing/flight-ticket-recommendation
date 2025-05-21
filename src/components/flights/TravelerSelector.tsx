"use client";

import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

interface Props {
  label: string;
  count: number;
  onChange: (value: number) => void;
  className?: string;
}

export default function TravelerSelector({ label, count, onChange, className }: Props) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <span className="text-sm text-gray-600">{label}</span>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => onChange(count - 1)}
          disabled={count <= 0}
          className="p-1 bg-gray-200 rounded-full disabled:opacity-50 cursor-pointer"
        >
          <MinusIcon className="w-4 h-4 text-gray-600" />
        </button>
        <span className="text-sm text-sky-500 font-semibold">{count}</span>
        <button
          onClick={() => onChange(count + 1)}
          className="p-1 bg-gray-200 rounded-full cursor-pointer"
        >
          <PlusIcon className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
