"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface Option {
  label: string;
  value: string;
}

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  icon?: React.ReactNode; // Pass custom icon for each selector
  placeholder?: string;
}

export default function Selector({
  label,
  value,
  onChange,
  options,
  icon,
  placeholder = "Select an option",
}: Props) {
  const [query, setQuery] = useState(value);
  const [filtered, setFiltered] = useState<Option[]>([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const results =
        query.length > 0
          ? options.filter((opt) =>
              opt.label.toLowerCase().includes(query.toLowerCase())
            )
          : options;
      setFiltered(results);
    }, 200);
    return () => clearTimeout(timeout);
  }, [query, options]);

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
        {/* Custom icon */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
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
          placeholder={placeholder}
          aria-haspopup="listbox"
        />
        {isDropdownOpen && filtered.length > 0 && (
          <ul
            role="listbox"
            className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto"
          >
            {filtered.map((opt, index) => (
              <li
                key={opt.value}
                role="option"
                aria-selected={index === highlightIndex}
                className={`p-3 cursor-pointer transition-colors ${
                  index === highlightIndex ? "bg-blue-50" : "hover:bg-gray-50"
                }`}
                onMouseDown={() => handleSelect(opt.label)}
              >
                <div className="flex items-center">
                  {icon && (
                    <span className="w-5 h-5 text-gray-400 mr-3">{icon}</span>
                  )}
                  {highlightMatch(opt.label)}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}