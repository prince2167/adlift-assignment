import React from "react";

interface FilterDropdownProps {
  label: string;
  options: string[] | any[];
  selectedValue: string | number | undefined;
  onChange: (value: string) => void;
}

const FilterDropdown = ({
  label,
  options,
  selectedValue,
  onChange,
}: FilterDropdownProps) => {
  return (
    <div>
      <label className="block text-gray-700">{label}:</label>
      <select
        className="border border-gray-300 rounded-lg p-2"
        value={selectedValue}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All {label.split(" ")[2]}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;
