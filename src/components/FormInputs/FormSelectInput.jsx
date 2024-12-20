import React from "react";
import Select from "react-tailwindcss-select";
import AddNewButton from "@/components/FormInputs/AddNewButton";

export default function FormSelectInput({
  options,
  label,
  option,
  setOption,
  href,
  toolTipText,
  labelShown = true,
}) {
  return (
    <div className="">
      {labelShown && (
        <h2 className="pb-2 block text-sm font-medium leading-6 text-gray-900">
          Select {label}
        </h2>
      )}
      <div className="flex items-center space-x-2">
        <Select
          isSearchable
          primaryColor="blue"
          value={option}
          onChange={(item) => setOption(item)}
          options={options}
          placeholder={label}
        />
        {href && toolTipText && (
          <AddNewButton toolTipText={toolTipText} href={href} />
        )}
      </div>
    </div>
  );
}
