import { SelectOptionsType } from "@/lib/types";
import React from "react";

export const Select = ({
  options,
  defaultValue,
  onChange,
  isDisabled = false,
}: {
  options: SelectOptionsType[];
  defaultValue: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  isDisabled?: boolean;
}) => {
  return (
    <div className="inline-block relative w-36 sm:w-48">
      <select
        disabled={isDisabled}
        onChange={onChange}
        defaultValue={defaultValue}
        className="block appearance-none h-9 w-full glass-effect text-gray-200 px-3 py-1 pr-8 rounded-lg shadow-md leading-tight focus:outline-none focus:ring-2 focus:ring-system-purple50 transition-all duration-300 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-system-purple10 text-gray-200">
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
        <svg
          className="fill-system-purple50 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
};
