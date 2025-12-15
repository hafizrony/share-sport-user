"use client";

import React from "react";
import { CalendarDays } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface DateSelectorProps {
  activeDate: string;
  onDateChange: (date: string) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  activeDate,
  onDateChange,
}) => {
  const [open, setOpen] = React.useState(false);

  const generateDates = () => {
    const dates = [];
    for (let i = -3; i <= 3; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push(d);
    }
    return dates;
  };

  const dates = generateDates();

  const apiToDate = (api: string) =>
    new Date(`${api.slice(0, 4)}-${api.slice(4, 6)}-${api.slice(6, 8)}`);

  const dateToApi = (d: Date) =>
    `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(
      d.getDate()
    ).padStart(2, "0")}`;

  const getApiDate = (d: Date) => dateToApi(d);

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm relative">
      <div className="flex items-center justify-between overflow-x-auto no-scrollbar gap-2">

        {/* Schedule Button */}
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 text-[#4c3b71] font-bold mr-4 shrink-0 hover:opacity-80 transition"
        >
          <CalendarDays size={20} />
          <span className="hidden sm:block">Schedule</span>
        </button>

        {/* Inline Dates (UNCHANGED) */}
        <div className="flex gap-2 flex-1 justify-start sm:justify-center">
          {dates.map((date, i) => {
            const apiDate = getApiDate(date);
            const isActive = apiDate === activeDate;
            const dayNum = new Intl.DateTimeFormat("en-US", {
              day: "2-digit",
              month: "short",
            }).format(date);

            return (
              <button
                key={i}
                onClick={() => onDateChange(apiDate)}
                className={`min-w-[100px] px-3 py-2 rounded-lg transition-all text-sm font-bold ${
                  isActive
                    ? "bg-[#4c3b71] text-white shadow-md scale-105"
                    : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                }`}
              >
                {dayNum}
              </button>
            );
          })}
        </div>
      </div>

      {open && (
        <div className="absolute top-full w-full md:w-81 left-0 mt-3 z-50 backdrop-blur bg-white/80 border border-white/40 rounded-2xl shadow-2xl p-4">
          <DayPicker
            mode="single"
            navLayout="around"
            selected={apiToDate(activeDate)}
            onSelect={(date) => {
              if (!date) return;
              onDateChange(dateToApi(date));
              setOpen(false);
            }}
            modifiersClassNames={{
              selected: "bg-[#4c3b71] text-white rounded-lg",
              today: "text-[#4c3b71] font-black",
            }}
            className="text-sm justify-center flex"
          />
        </div>
      )}
    </div>
  );
};

export default DateSelector;
