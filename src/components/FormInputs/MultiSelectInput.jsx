import React, { useCallback } from "react";
import Select from "react-tailwindcss-select";
import AddNewButton from "@/components/FormInputs/AddNewButton";
import { Label } from "@/components/ui/label";

const MultiSelectInput = ({
  options,
  label,
  value,
  onChange,
  href,
  toolTipText,
  labelShown = true,
  name,
  register,
  errors,
  isSearchable = true,
  required = true,
}) => {
  const handleChange = useCallback(
    (selectedOptions) => {
      onChange(selectedOptions || []);
      const event = {
        target: {
          name: name,
          value: selectedOptions ? selectedOptions.map((opt) => opt.value) : [],
        },
      };
      register(name).onChange(event);
    },
    [onChange, register, name]
  );

  register(name, {
    required: required ? `${label} is required` : false,
    validate: (value) =>
      !required ||
      (Array.isArray(value) && value.length > 0) ||
      `${label} is required`,
  });

  return (
    <div className="space-y-2 w-full">
      <div className="flex space-x-2 items-center">
        {labelShown && <Label className="text-sm font-medium">{label}</Label>}
      </div>

      <div className="flex items-center space-x-2">
        <div className="w-full">
          <Select
            isMultiple
            isSearchable={isSearchable}
            primaryColor="blue"
            value={value}
            onChange={handleChange}
            options={options}
            placeholder={`Select ${label}`}
            name={name}
            containerClassName="relative"
            valueContainerClassName="flex flex-wrap gap-1"
            classNames={{
              menuButton: ({ isDisabled }) =>
                `flex text-sm text-foreground border ${
                  errors[name] ? "border-destructive" : "border-input"
                } bg-background hover:bg-accent hover:text-accent-foreground h-10 w-full items-center justify-between rounded-md px-3 py-2 ${
                  isDisabled && "opacity-50"
                } overflow-hidden`,
              menu: "absolute z-10 w-full bg-popover text-popover-foreground shadow-md rounded-md py-1 mt-1",
              listItem: ({ isSelected }) =>
                `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                  isSelected
                    ? `bg-primary text-primary-foreground`
                    : `text-foreground hover:bg-accent hover:text-accent-foreground`
                }`,
              tagItem: ({ isDisabled }) =>
                `inline-flex items-center bg-primary/10 text-primary border border-primary/20 rounded px-1 gap-1 m-0.5 ${
                  isDisabled && "opacity-50"
                }`,
              tagItemText: "text-sm",
              tagItemIconContainer:
                "flex items-center px-1 cursor-pointer hover:bg-primary/20 rounded",
              searchContainer: "px-2 pb-2",
              searchBox:
                "w-full px-3 py-2 border rounded focus:outline-none focus:border-primary",
            }}
          />
        </div>
        {href && toolTipText && (
          <AddNewButton toolTipText={toolTipText} href={href} />
        )}
      </div>

      {errors[name] && (
        <p className="mt-2 text-sm text-destructive">{errors[name]?.message}</p>
      )}

      {toolTipText && !href && (
        <p className="text-sm text-muted-foreground">{toolTipText}</p>
      )}
    </div>
  );
};

export default MultiSelectInput;
