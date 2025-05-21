"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { LOCATIONS } from "@/data/locations";

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export default function LocationInput({ label, value, onChange }: Props) {
  const [query, setQuery] = useState(value);
  const [filtered, setFiltered] = useState<typeof LOCATIONS>([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync local state with external value changes
  useEffect(() => {
    setQuery(value);
  }, [value]);

  // Debounce and filter locations
  useEffect(() => {
    const timeout = setTimeout(() => {
      const results =
        query.length > 0
          ? LOCATIONS.filter((loc) =>
              loc.label.toLowerCase().includes(query.toLowerCase())
            )
          : [];
      setFiltered(results);
    }, 200);
    return () => clearTimeout(timeout);
  }, [query]);

  const handleSelect = useCallback(
    (label: string) => {
      setQuery(label);
      onChange(label);
      setDropdownOpen(false);
      setHighlightIndex(-1);
    },
    [onChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isDropdownOpen || filtered.length === 0) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightIndex((prev) => (prev + 1) % filtered.length);
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightIndex(
            (prev) => (prev - 1 + filtered.length) % filtered.length
          );
          break;
        case "Enter":
          e.preventDefault();
          if (highlightIndex >= 0) handleSelect(filtered[highlightIndex].label);
          break;
        case "Escape":
          setDropdownOpen(false);
          break;
      }
    },
    [isDropdownOpen, filtered, highlightIndex, handleSelect]
  );

  const highlightMatch = useCallback(
    (text: string) => {
      const index = text.toLowerCase().indexOf(query.toLowerCase());
      return index === -1 ? (
        text
      ) : (
        <>
          {text.substring(0, index)}
          <span className="font-semibold bg-yellow-100">
            {text.substring(index, index + query.length)}
          </span>
          {text.substring(index + query.length)}
        </>
      );
    },
    [query]
  );

  return (
    <div className="relative">
      <label className="text-sm text-gray-600 mb-1 block">{label}</label>

      <div className="relative">
        {/* Location icon */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setDropdownOpen(true);
          }}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
          onKeyDown={handleKeyDown}
          className="w-full pl-10 pr-4 py-2 ring-1 ring-gray-400 rounded-md focus:outline-none focus:ring-sky-500"
          placeholder="City or airport"
          aria-haspopup="listbox"
        />

        {/* Dropdown suggestions */}
        {isDropdownOpen && filtered.length > 0 && (
          <ul
            role="listbox"
            className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto"
          >
            {filtered.map((loc, index) => (
              <li
                key={loc.value}
                role="option"
                aria-selected={index === highlightIndex}
                className={`p-3 cursor-pointer transition-colors ${
                  index === highlightIndex ? "bg-blue-50" : "hover:bg-gray-50"
                }`}
                onMouseDown={() => handleSelect(loc.label)}
              >
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-gray-400 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {highlightMatch(loc.label)}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
