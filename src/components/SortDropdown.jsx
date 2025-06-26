import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function SortDropdown({ options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef();
  const listRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (
        btnRef.current &&
        !btnRef.current.contains(e.target) &&
        listRef.current &&
        !listRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  const selected = options.find((opt) => opt.value === value);

  return (
    <div className="relative inline-block text-left min-w-[180px]">
      <button
        ref={btnRef}
        type="button"
        className="flex items-center justify-between w-full border border-gray-300 rounded px-2 py-1 text-sm bg-white focus:ring-2 focus:ring-[#FF3E6C] focus:border-[#FF3E6C]"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{selected ? selected.label : "Sort"}</span>
        <ChevronDown className="ml-2 w-4 h-4 text-gray-500" />
      </button>
      {open && (
        <ul
          ref={listRef}
          className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded shadow-lg max-h-56 overflow-auto outline-none"
          tabIndex={-1}
          role="listbox"
        >
          {options.map((opt) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={value === opt.value}
              className={`px-4 py-2 cursor-pointer select-none text-sm transition-colors duration-75 ${
                value === opt.value
                  ? "hover:bg-[#FF3E6C] hover:text-white text-gray-800"
                  : "hover:bg-[#FF3E6C] hover:text-white text-gray-800"
              }`}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  onChange(opt.value);
                  setOpen(false);
                }
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
