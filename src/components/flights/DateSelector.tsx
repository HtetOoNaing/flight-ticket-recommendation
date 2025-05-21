"use client";

import { useState, useRef, useMemo } from "react";
import { DayPicker } from "react-day-picker";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { Popover } from "@headlessui/react";
import "react-day-picker/dist/style.css";

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disableBefore?: Date | string;
}

export default function DateSelector({
  label,
  value,
  onChange,
  disableBefore,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  const handleDateSelect = (date?: Date) => {
    if (date) {
      onChange(date.toLocaleDateString("en-CA"));
      setIsOpen(false);
    }
  };

  const disableDate = useMemo(() => {
    if (!disableBefore) return new Date();
    return typeof disableBefore === "string"
      ? new Date(disableBefore)
      : disableBefore;
  }, [disableBefore]);

  const isValidDisableDate = !isNaN(disableDate.getTime());

  return (
    <Popover className="relative" as="div">
      {({ open }) => (
        <>
          <label className="text-sm text-gray-600 mb-1 block">{label}</label>

          <div ref={inputRef} className="relative">
            {/* Calendar icon */}
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <CalendarIcon className="h-5 w-5" />
            </div>

            <Popover.Button
              as="div"
              className="w-full cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <input
                readOnly
                value={value}
                placeholder="Select date"
                className="w-full pl-10 pr-4 py-2 ring-1 ring-gray-400 rounded-md bg-white text-left cursor-pointer focus:outline-none focus:ring-sky-500"
              />
            </Popover.Button>

            <AnimatePresence>
              {open && (
                <Popover.Panel
                  static
                  className="absolute z-10 mt-1 w-full"
                  style={{ minWidth: "320px" }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 rdp-custom"
                  >
                    <DayPicker
                      animate
                      mode="single"
                      captionLayout="dropdown-months"
                      showOutsideDays
                      selected={value ? new Date(value) : undefined}
                      onSelect={handleDateSelect}
                      disabled={{
                        before: isValidDisableDate ? disableDate : new Date(),
                      }}
                      modifiersClassNames={{
                        selected: "bg-sky-500 text-white",
                        today:
                          "font-semibold text-sky-500 border border-sky-500",
                      }}
                    />
                  </motion.div>
                </Popover.Panel>
              )}
            </AnimatePresence>
          </div>
        </>
      )}
    </Popover>
  );
}
